import { useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { Routes } from "../../routes/CONSTANTS";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        AuthService.login(email, password)
            .then(() => {
                fetchUserInfo();
            }).catch(() => {
                setError("Credenciales incorrectas");
            });
    }

    const fetchUserInfo = () => {
        AuthService.me().then(response => {
            sessionStorage.setItem('userName', response.name);
            sessionStorage.setItem('userId', response.id!.toString());
            sessionStorage.setItem('role', response.role!);
            navigate(Routes.HOME);
        });
    }

    return (<>
        <HeaderComponent />
        <main className="padding__x flex flex-col items-center">
            <h1 className="text-3xl text-secondary font-bold my-3">Iniciar Sesión</h1>
            <form className="w-96" onSubmit={(e) => onFormSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-md font-medium text-gray-900 mb-1">
                        Correo Electrónico
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="email" name="email" id="email" className="block flex-1 border-0 
                            bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa tu correo electrónico" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="block text-md font-medium text-gray-900 mb-1">
                        Contraseña
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <input type="password" name="Password" id="Password" className="block flex-1 
                            border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                            focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                            placeholder="Ingresa tu contraseña" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <p className="block text-md font-medium text-red-600 mb-1">
                        {error}
                    </p>
                </div>
                <button
                    id="btn-login"
                    className="primary__button w-full p-2"
                    type="submit"
                >
                    Iniciar Sesión</button>
            </form>
        </main>
    </>);
}

export default LoginPage;