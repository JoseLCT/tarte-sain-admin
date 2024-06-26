import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { ChangeEvent, useEffect, useState } from "react";
import { CategoryService } from "../../services/CategoryService";
import { Routes } from "../../routes/CONSTANTS";

const CategoryFormPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File>();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!id) {
            createCategory();
        } else {
            updateCategory();
        }
    }

    const updateCategory = () => {
        if (!id) return;
        CategoryService.update({ id: parseInt(id), name, description, slug })
            .then(() => {
                if (!imageFile) {
                    navigate(Routes.CATEGORY.LIST);
                    return;
                }
                CategoryService.uploadImage(parseInt(id), imageFile).then(() => {
                    navigate(Routes.CATEGORY.LIST);
                });
            });
    }

    const createCategory = () => {
        CategoryService.create({ name, description, slug })
            .then((category) => {
                CategoryService.uploadImage(category.id!, imageFile!).then(() => {
                    navigate(Routes.CATEGORY.LIST);
                });
            });
    }

    const fetchCategory = () => {
        if (!id) return;
        CategoryService.get(parseInt(id)).then(category => {
            setName(category.name);
            setDescription(category.description);
            setSlug(category.slug);
            setImage(category.img_url!);
        });
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

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">
                {id ? 'Editar' : 'Crear'} Categoría
            </h1>
            <form className="w-96 mb-3" onSubmit={(e) => onFormSubmit(e)}>
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
                    <label htmlFor="slug" className="block text-md font-medium text-gray-900 mb-1">
                        Slug
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="text" name="slug" id="slug" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el slug" value={slug} required
                            onChange={(e) => setSlug(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="slug" className="block text-md font-medium text-gray-900 mb-1">
                        Imagen
                    </label>
                    {image && <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md p-1 mb-3">
                        <img src={image} alt="Imagen" className="w-full rounded-md" />
                    </div>}
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="file" name="slug" id="slug" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md" {...id ? {} : { required: true }}
                            onChange={(e) => handleImageChange(e)} />
                    </div>
                </div>
                <div className="mb-3">
                    <p className="block text-md font-medium text-red-600 mb-1">
                        {error}
                    </p>
                </div>
                <button className="primary__button w-full p-2" type="submit">Guardar</button>
            </form>
        </main>
    </>);
}

export default CategoryFormPage;