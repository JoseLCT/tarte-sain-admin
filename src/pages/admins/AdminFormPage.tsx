import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import { AdminService } from "../../services/AdminService";
import { Routes } from "../../routes/CONSTANTS";

const AdminFormPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('');
    let initialRole = '';
    const navigate = useNavigate();
    const currentUserRole = sessionStorage.getItem('role');
    const [isEdittingProfile, setIsEdittingProfile] = useState(false);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (!id) {
            createAdmin();
        } else {
            if (isEdittingProfile) {
                updateProfile();
                return;
            }
            updateAdmin();
        }
    }

    const updateAdmin = () => {
        if (!id) return;
        AdminService.update({ id: parseInt(id), name, last_name: lastName, email, phone_number: phone })
            .then(() => {
                if (role !== initialRole) {
                    AdminService.updateRole(parseInt(id), role).then(() => navigate(Routes.ADMIN.LIST));
                    return;
                }
                navigate(Routes.ADMIN.LIST)
            });
    }

    const updateProfile = () => {
        if (!id) return;
        const admin = { id: parseInt(id), name, last_name: lastName, email, phone_number: phone };
        AdminService.updateOwn(admin)
            .then(() => { 
                sessionStorage.removeItem('editProfile');
                navigate(Routes.ADMIN.LIST) 
            });
    }

    const createAdmin = () => {
        const admin = { name, last_name: lastName, email, phone_number: phone, password, role };
        AdminService.create(admin)
            .then(() => navigate(Routes.ADMIN.LIST));
    }

    const fetchAdmin = () => {
        if (!id) return;
        AdminService.get(parseInt(id)).then(admin => {
            setName(admin.name);
            setLastName(admin.last_name);
            setEmail(admin.email);
            setPhone(admin.phone_number!);
            setRole(admin.role!);
            initialRole = admin.role!;
        });
    }

    useEffect(() => {
        if (id) {
            fetchAdmin();
        }
        const editProfile = sessionStorage.getItem('editProfile');
        if(editProfile){
            if(editProfile === '1'){
                setIsEdittingProfile(true);
            } 
        }
    }, [id]);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">
                {id ? 'Editar' : 'Crear'} {isEdittingProfile?"Perfil": "Administrador"}
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
                    <label htmlFor="lastName" className="block text-md font-medium text-gray-900 mb-1">
                        Apellidos
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="text" name="lastName" id="lastName" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa los apellidos" value={lastName} required
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-md font-medium text-gray-900 mb-1">
                        Email
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="text" name="email" id="email" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el correo electrónico" value={email} required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                {!id && <div className="mb-3">
                    <label htmlFor="password" className="block text-md font-medium text-gray-900 mb-1">
                        Contraseña
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="password" name="password" id="password" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el nombre" value={password} required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>}
                {!id && <div className="mb-3">
                    <label htmlFor="passwordConfirmation" className="block text-md font-medium text-gray-900 mb-1">
                        Confirmar Contraseña
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="password" name="passwordConfirmation" id="passwordConfirmation"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                            placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el nombre" value={passwordConfirmation} required
                            onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </div>
                </div>}
                <div className="mb-3">
                    <label htmlFor="phone" className="block text-md font-medium text-gray-900 mb-1">
                        Teléfono
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="number" name="phone" id="phone" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el teléfono" value={phone} required
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
                {((currentUserRole === 'super_admin' || !id) && !isEdittingProfile) && <div className="mb-3">
                    <label htmlFor="role" className="block text-md font-medium text-gray-900 mb-1">
                        Rol
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <select name="role" id="role" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            value={role} required
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="">Seleccionar Rol</option>
                            <option value="admin">Administrador</option>
                            <option value="super_admin">Super Administrador</option>
                        </select>
                    </div>
                </div>}
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

export default AdminFormPage;