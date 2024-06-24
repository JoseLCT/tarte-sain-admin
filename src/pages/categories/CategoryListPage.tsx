import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Category } from "../../models/objects/Category";
import { CategoryService } from "../../services/CategoryService";
import { Routes } from "../../routes/CONSTANTS";

const CategoryListPage = () => {
    const [categories, setCategories] = useState<Category[]>([])

    const deleteCategory = (categoryId: number) => {
        if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
        CategoryService.delete(categoryId).then(() => fetchCategories());
    }

    const fetchCategories = () => {
        CategoryService.list().then(response => setCategories(response));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-secondary font-bold my-3">Categorias</h1>
                <a href={Routes.CATEGORY.CREATE} className="primary__button p-2 h-fit">Agregar</a>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="1/6 text-lg ps-3 text-left">Nombre</th>
                        <th className="3/6 text-lg ps-3 text-left">Descripción</th>
                        <th className="1/6 text-lg ps-3 text-left">Slug</th>
                        <th className="1/6 text-lg ps-3 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => <tr key={"cat-" + category.id}>
                        <td className="1/6 ps-3">{category.name}</td>
                        <td className="3/6 ps-3">{category.description}</td>
                        <td className="1/6 ps-3">{category.slug}</td>
                        <td className="1/6 ps-3">
                            <a href={Routes.CATEGORY.EDIT_PARAM(category.id)}
                                className="primary__button p-2">Editar</a>
                            <button onClick={() => deleteCategory(category.id!)}
                                className="text-white font-medium rounded-xl bg-red-600 p-2 ms-2">
                                Eliminar</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </main>
    </>);
}

export default CategoryListPage;