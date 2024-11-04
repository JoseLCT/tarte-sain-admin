import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { ChangeEvent, useEffect, useState } from "react";
import { CategoryService } from "../../services/CategoryService";
import { Routes } from "../../routes/CONSTANTS";

const CategoryFormPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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
        CategoryService.update({ id: parseInt(id), name, description })
            .then(() => {
                if (!imageFile) {
                    navigate(Routes.CATEGORY.LIST);
                    return;
                }
                CategoryService.uploadImage(parseInt(id), imageFile).then(() => {
                    navigate(Routes.CATEGORY.LIST);
                });
            }).catch((response) => { setError(response.detail) });
    }

    const createCategory = () => {
        CategoryService.create({ name, description })
            .then((category) => {
                CategoryService.uploadImage(category.id!, imageFile!).then(() => {
                    navigate(Routes.CATEGORY.LIST);
                });
            }).catch((error) => {
                if (error.response.status === 400) {
                    setError(error.response.data.detail);
                } else {
                    setError('Ocurrió un error inesperado');
                }
            });
    }

    const fetchCategory = () => {
        if (!id) return;
        CategoryService.get(parseInt(id)).then(category => {
            setName(category.name);
            setDescription(category.description);
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
                    <label htmlFor="imagen" className="block text-md font-medium text-gray-900 mb-1">
                        Imagen
                    </label>
                    {image && <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md p-1 mb-3">
                        <img src={image} alt="Imagen" className="w-full rounded-md" />
                    </div>}
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="file" name="imagen" id="imagen" className="block flex-1 border-0 
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
                <button
                    className="primary__button w-full p-2"
                    type="submit"
                    id="btn-save"
                >
                    Guardar
                </button>
            </form>
        </main>
    </>);
}

export default CategoryFormPage;