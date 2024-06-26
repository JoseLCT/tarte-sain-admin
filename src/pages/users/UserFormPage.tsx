import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { Routes } from "../../routes/CONSTANTS";

const UserFormPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!id) {
            createUser();
        } else {
            updateUser();
        }
    }

    const updateUser = () => {
        if (!id) return;
        UserService.update({ id: parseInt(id), name, last_name: lastName, email, phone_number: phone })
            .then(() => navigate(Routes.USER.LIST));
    }

    const createUser = () => {
        UserService.create({ name, last_name: lastName, email, phone_number: phone })
        .then(() => navigate(Routes.USER.LIST));
    }

    const fetchUser = () => {
        if (!id) return;
        UserService.get(parseInt(id)).then(user => {
            setName(user.name);
            setLastName(user.last_name);
            setEmail(user.email);
            setPhone(user.phone_number!);
        });
    }

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <h1 className="text-3xl text-secondary font-bold my-3">
                {id ? 'Editar' : 'Crear'} Usuario
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
                        <textarea name="lastName" id="lastName" className="block flex-1 border-0 
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
                <div className="mb-3">
                    <label htmlFor="phone" className="block text-md font-medium text-gray-900 mb-1">
                        Teléfono
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="text" name="phone" id="phone" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa el teléfono" value={phone} required
                            onChange={(e) => setPhone(e.target.value)} />
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

export default UserFormPage;