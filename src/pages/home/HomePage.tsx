import HeaderComponent from "../../components/HeaderComponent";
import { Routes } from "../../routes/CONSTANTS";
import "./HomePage.css";

const HomePage = () => {
    return (<>
        <HeaderComponent />
        <main className="main__container padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">Administrar</h1>
            <a href={Routes.CATEGORY.LIST} className="primary__button p-1">Categorias</a>
            <a href={Routes.PRODUCT.LIST} className="primary__button p-1">Productos</a>
            {sessionStorage.getItem("role") === "super_admin" &&
                <a href={Routes.USER.LIST} className="primary__button p-1">Administradores</a>}
            <a href={Routes.CATEGORY.LIST} className="primary__button p-1">Ordenes</a>
        </main>
    </>);
}

export default HomePage;