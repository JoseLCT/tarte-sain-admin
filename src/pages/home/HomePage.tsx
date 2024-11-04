import HeaderComponent from "../../components/HeaderComponent";
import { Routes } from "../../routes/CONSTANTS";
import "./HomePage.css";

const HomePage = () => {
    return (<>
        <HeaderComponent />
        <main className="main__container padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">Administrar</h1>
            <a
                id="link-categories"
                href={Routes.CATEGORY.LIST}
                className="primary__button p-1"
            >
                Categorias
            </a>
            <a
                id="link-products"
                href={Routes.PRODUCT.LIST}
                className="primary__button p-1"
            >
                Productos
            </a>
            {sessionStorage.getItem("role") === "super_admin" &&
                <a
                    id="link-admins"
                    href={Routes.ADMIN.LIST}
                    className="primary__button p-1"
                >
                    Administradores
                </a>
            }
            <a
                id="link-orders"
                href={Routes.ORDER.LIST}
                className="primary__button p-1"
            >
                Ordenes
            </a>
        </main>
    </>);
}

export default HomePage;