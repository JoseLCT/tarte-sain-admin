import { useEffect, useState } from "react";
import { Product } from "../../models/objects/Product";
import { ProductService } from "../../services/ProductService";
import HeaderComponent from "../../components/HeaderComponent";
import { Routes } from "../../routes/CONSTANTS";

const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const deleteProduct = (productId: number) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
        ProductService.delete(productId).then(() => fetchProducts());
    }

    const fetchProducts = () => {
        ProductService.list().then(response => setProducts(response));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-secondary font-bold my-3">Productos</h1>
                <input type="text" placeholder="Buscar" className=" border border-secondary p-2 
                    rounded-xl focus:outline-secondary" onChange={(e) => setSearchTerm(e.target.value)}/>
                <a href={Routes.PRODUCT.CREATE} className="primary__button p-2 h-fit">Agregar</a>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-secondary">
                        <th className="text-lg ps-3 text-left">Nombre</th>
                        <th className="text-lg ps-3 text-left">Descripción</th>
                        <th className="text-lg ps-3 text-left">Precio</th>
                        <th className="text-lg ps-3 text-left">Imagen</th>
                        <th className="text-lg ps-3 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => product.name.includes(searchTerm) && <tr key={"cat-" + product.id}>
                        <td className="ps-3">{product.name}</td>
                        <td className="ps-3">{product.description}</td>
                        <td className="ps-3">{product.price}</td>
                        <td className="ps-3">
                            <img src={product.img_url} alt={product.name} className="w-20 h-20" />
                        </td>
                        <td className="ps-3">
                            <a href={Routes.PRODUCT.EDIT_PARAM(product.id)}
                                className="primary__button p-2">Editar</a>
                            <button onClick={() => deleteProduct(product.id!)}
                                className="text-white font-medium rounded-xl bg-red-600 p-2 ms-2">
                                Eliminar</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </main>
    </>);
}

export default ProductListPage;