import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { User } from "../../models/objects/User";
import { UserService } from "../../services/UserService";
import { Routes } from "../../routes/CONSTANTS";

const UserListPage = () => {
    const [users, setUsers] = useState<User[]>([])

    const deleteUser = (userId: number) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
        UserService.delete(userId).then(() => fetchUsers());
    }

    const fetchUsers = () => {
        UserService.list().then(response => setUsers(response));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-secondary font-bold my-3">Usuarios</h1>
                <a href={Routes.USER.CREATE} className="primary__button p-2 h-fit">Agregar</a>
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
                    {users.map((user) => <tr key={"cat-" + user.id}>
                        <td className="ps-3">{user.name}</td>
                        <td className="ps-3">{user.last_name}</td>
                        <td className="ps-3">{user.email}</td>
                        <td className="ps-3">{user.phone_number}</td>
                        <td className="ps-3">
                            <a href={Routes.USER.EDIT_PARAM(user.id)}
                                className="primary__button p-2">Editar</a>
                            <button onClick={() => deleteUser(user.id!)}
                                className="text-white font-medium rounded-xl bg-red-600 p-2 ms-2">
                                Eliminar</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </main>
    </>);
}

export default UserListPage;