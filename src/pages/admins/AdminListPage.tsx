import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Admin } from "../../models/objects/Admin";
import { AdminService } from "../../services/AdminService";
import { Routes } from "../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";

const AdminListPage = () => {
    const [admins, setAdmins] = useState<Admin[]>([])
    const navigate = useNavigate();

    const deleteAdmin = (adminId: number) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
        AdminService.delete(adminId).then(() => fetchAdmins());
    }

    const fetchAdmins = () => {
        AdminService.list().then(response => setAdmins(response));
    }

    const navigateToEdit = (adminId: number) => {
        sessionStorage.setItem('editProfile', '0');
        navigate(Routes.ADMIN.EDIT_PARAM(adminId));
    }

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-secondary font-bold my-3">Usuarios</h1>
                <a href={Routes.ADMIN.CREATE} className="primary__button p-2 h-fit">Agregar</a>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-secondary">
                        <th className="text-lg ps-3 pb-2 text-left">Nombre</th>
                        <th className="text-lg ps-3 pb-2 text-left">Apellido</th>
                        <th className="text-lg ps-3 pb-2 text-left">Correo</th>
                        <th className="text-lg ps-3 pb-2 text-left">Teléfono</th>
                        <th className="text-lg ps-3 pb-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) =>
                        <tr key={"admin-" + admin.id}>
                            <td className="ps-3 admin-name">
                                {admin.name}
                            </td>
                            <td className="ps-3 admin-lastname">
                                {admin.last_name}
                            </td>
                            <td className="ps-3 admin-email">
                                {admin.email}
                            </td>
                            <td className="ps-3 admin-phone">
                                {admin.phone_number}
                            </td>
                            <td className="ps-3 admin-actions">
                                <button
                                    onClick={() => navigateToEdit(admin.id!)}
                                    className="primary__button p-2"
                                    id="btn-edit"
                                >Editar
                                </button>
                                <button
                                    id="btn-delete"
                                    onClick={() => deleteAdmin(admin.id!)}
                                    className="text-white font-medium rounded-xl bg-red-600 p-2 ms-2"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    </>);
}

export default AdminListPage;