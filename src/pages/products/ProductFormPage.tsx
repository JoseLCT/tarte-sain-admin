import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import { Routes } from "../../routes/CONSTANTS";
import HeaderComponent from "../../components/HeaderComponent";
import { Category } from "../../models/objects/Category";
import { CategoryService } from "../../services/CategoryService";
import { ProductImage } from "../../models/objects/ProductImage";
import { Product } from "../../models/objects/Product";

const ProductFormPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File>();
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [productCategories, setProductCategories] = useState<number[]>([]);
    const [galleryImages, setGalleryImages] = useState<ProductImage[]>([]);
    const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[]>([]);
    const [uploadedImagesAmount, setUploadedImagesAmount] = useState(0);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false)
    const navigate = useNavigate();

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsSaveButtonDisabled(true);
        if (productCategories.length === 0) {
            setError('Selecciona al menos una categoría');
            return;
        }
        if (!id) {
            createProduct();
        } else {
            updateProduct();
        }
    }

    const updateProduct = () => {
        if (!id) return;
        const product = {
            id: parseInt(id),
            name,
            description,
            price: parseFloat(price),
            categories: productCategories
        };
        ProductService.update(product)
            .then((product) => {
                uploadImages(product.id!);
            }).catch(() => {
                setError('Ocurrió un error al actualizar el producto');
                setIsSaveButtonDisabled(false);
            });
    }

    const createProduct = () => {
        const product = {
            name,
            description,
            price: parseFloat(price),
            categories: productCategories
        };
        ProductService.create(product)
            .then((product) => {
                uploadImages(product.id!);
            }).catch(() => {
                setError('Ocurrió un error al crear el producto');
                setIsSaveButtonDisabled(false);
            });
    }

    const uploadImages = (productId: number) => {
        const promises: Promise<Product>[] = [];
        if (imageFile) {
            const uploadImagePromise = ProductService.uploadImage(productId, imageFile);
            promises.push(uploadImagePromise);
        }
        galleryImagesFiles.forEach((image) => {
            promises.push(ProductService.uploadGalleryImage(productId, image));
        });
        Promise.all(promises).then(() => {
            navigate(Routes.PRODUCT.LIST);
        }).catch(() => {
            setError('Ocurrió un error al subir las imágenes');
            setIsSaveButtonDisabled(false);
        });
    }

    const fetchProduct = () => {
        if (!id) return;
        ProductService.get(parseInt(id)).then(product => {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price + "");
            setImage(product.img_url!);
            setUploadedImagesAmount(product.images!.length);
            setGalleryImages(product.images!);
            setProductCategories(product.categories!);
        });
    }

    const fetchCategories = () => {
        CategoryService.list().then(response => setCategories(response));
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const image = event.target.files[0];
        setImageFile(image);
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        }
        reader.readAsDataURL(image);
    };

    const handleGalleryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const images = event.target.files;
        const newImages: ProductImage[] = [];
        for (const image of images) {
            newImages.push({ img_url: URL.createObjectURL(image), img_public_id: '' });
        }
        setGalleryImagesFiles([...galleryImagesFiles, ...images]);
        setGalleryImages([...galleryImages, ...newImages]);
    }

    const handleSwitchChange = (categoryId: number) => {
        if (productCategories.includes(categoryId)) {
            productCategories.splice(productCategories.indexOf(categoryId), 1);
        } else {
            productCategories.push(categoryId);
        }
        setProductCategories([...productCategories]);
    }

    const deleteGalleryImage = (id: number) => {
        ProductService.deleteGalleryImage(id).then(() => {
            setGalleryImages(galleryImages.filter((image) => image.id !== id));
        });
    }

    const removeGalleryImage = (index: number) => {
        setGalleryImages(galleryImages.filter((_image, i) => i !== index));
        setGalleryImagesFiles(galleryImagesFiles.filter((_image, i) => i !== index - uploadedImagesAmount));
    }

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
        fetchCategories();
    }, [id]);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">
                {id ? 'Editar' : 'Crear'} Producto
            </h1>
            <form className="grid grid-cols-2 gap-4 mb-3" onSubmit={(e) => onFormSubmit(e)}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-md font-medium text-gray-900 mb-1">
                            Nombre
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                            focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input type="text" name="name" id="name" className="block flex-1 border-0
                                bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                                focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                                placeholder="Ingresa el nombre" value={name} required
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="block text-md font-medium text-gray-900 mb-1">
                            Descripción
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                            focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <textarea name="description" id="description" className="block flex-1 border-0
                                bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                                focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                                placeholder="Ingresa la descripcion" value={description} required
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="block text-md font-medium text-gray-900 mb-1">
                            Precio
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                            focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                            <input type="number" name="price" id="price" className="block flex-1 border-0
                                bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                                focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                                placeholder="Ingresa el precio" value={price} required
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="icon" className="block text-md font-medium text-gray-900 mb-1">
                            Ícono
                        </label>
                        {image && <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                            focus-within:ring-2 focus-within:ring-inset sm:max-w-md p-1 mb-3">
                            <img src={image} alt="Imagen" className="rounded-md h-[200px]" />
                        </div>}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                            focus-within:ring-2 focus-within:ring-inset sm:max-w-md w-96">
                            <input type="file" name="icon" id="icon" className="block flex-1 border-0
                                bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                                focus:ring-0 sm:text-sm sm:leading-6 rounded-md" {...id ? {} : { required: true }}
                                onChange={(e) => handleImageChange(e)} />
                        </div>
                    </div>
                </div>

                <div className="h-fit scroll-container h-[38vh]">
                    <p className="block text-md font-medium text-gray-900 mb-1">Categorías</p>
                    <div className="grid grid-cols-3">
                        {categories.map((category) => <div key={"switch-" + category.id}>
                            <input
                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                type="checkbox" role="switch" id={"flexSwitchCheck" + category.id}
                                checked={productCategories.includes(category.id!)}
                                onChange={() => handleSwitchChange(category.id!)} />
                            <label
                                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor={"flexSwitchCheck" + category.id}
                            >{category.name}</label>
                        </div>)}
                    </div>
                </div>

                <div className="mb-3 col-span-2">
                    <p className="block text-md font-medium text-gray-900 mb-1">Galería de Imágenes</p>
                    <div className="flex scroll-container overflow-auto mb-1">
                        {galleryImages.map((image, index) => (
                            <div className="relative me-1 shrink-0" key={"screenshot-" + index}>
                                <img src={image.img_url}
                                    className="h-[200px] rounded-md" />
                                <button
                                    className="bg-red-600 px-2 py-1 text-white rounded-full absolute top-0 end-0 btn-delete-image"
                                    type="button"
                                    onClick={() => {
                                        if (image.id) {
                                            deleteGalleryImage(image.id);
                                            return;
                                        }
                                        removeGalleryImage(index);
                                    }}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        id="input-gallery"
                        onChange={handleGalleryImageChange}
                        multiple
                    />
                </div>

                <div className="mb-3 col-span-2">
                    <p className="block text-md font-medium text-red-600 mb-1">
                        {error}
                    </p>
                </div>
                <button className="primary__button w-96 p-2" type="submit" disabled={isSaveButtonDisabled} id="btn-save">
                    {isSaveButtonDisabled ? 'Guardando...' : 'Guardar'}
                </button>
            </form>
        </main>
    </>);
}

export default ProductFormPage;