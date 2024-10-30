import { useEffect, useState } from 'react';
import logo from '../assets/Logo-tarte-sain.png';
import { Routes } from '../routes/CONSTANTS';
import './ComponentStyles.css';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [menuToggled, setMenuToggled] = useState(false)

    const logout = () => {
        AuthService.logout().then(() => {
            sessionStorage.clear();
            setName('');
            navigate(Routes.LOGIN);
        }).catch(() => {
            alert('Error al cerrar sesión');
        });
    }

    const getUserId = () => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            return parseInt(userId)
        }
        else return 0;
    }

    const navigateToEditProfile = () => {
        sessionStorage.setItem('editProfile', "1");
        navigate(Routes.ADMIN.EDIT_PARAM(getUserId()));
    }

    useEffect(() => {
        if (window.location.pathname === Routes.LOGIN) return;
        AuthService.me().then(response => {
            sessionStorage.setItem('userId', response.id!.toString());
            sessionStorage.setItem('role', response.role!);
            setName(response.name!);
        }).catch(() => {
            sessionStorage.clear();
            navigate(Routes.LOGIN);
        });
    }, []);

    return (<header className='menu__header padding__x p-3'>
        <nav className='flex justify-between items-center'>
            <a href={Routes.HOME}>
                <img src={logo} alt="Logo" className='menu__logo' />
            </a>
            {window.location.pathname !== Routes.LOGIN && <div className="relative">
                <label htmlFor='menu-toggle' className='text-white'>
                    {name}
                    <span className='font-bold'> ⌵</span>
                </label>
                <input type='checkbox' id='menu-toggle' className='hidden'
                    onChange={(e) => setMenuToggled(e.target.checked)} />
                {menuToggled &&
                    <ul className='primary__button p-3 flex flex-col absolute end-0 border-2 border-primary'>
                        <li className='text-left border-b border-white'>
                            <button onClick={() => navigateToEditProfile()} className='text-nowrap'>Editar Perfil</button>
                        </li>
                        <li className='text-left'>
                            <button onClick={logout} className='text-nowrap'>Cerrar Sesión</button>
                        </li>
                    </ul>}
            </div>}
        </nav>
    </header>);
}

export default HeaderComponent;