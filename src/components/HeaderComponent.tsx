import { useEffect } from 'react';
import logo from '../assets/Logo-tarte-sain.png';
import { Routes } from '../routes/CONSTANTS';
import './ComponentStyles.css';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('access_token') && window.location.pathname != Routes.LOGIN) {
            navigate(Routes.LOGIN);
        }
    }, []);

    return ( <header className='menu__header padding__x p-3'>
        <a href={Routes.HOME}>
            <img src={logo} alt="Logo" className='menu__logo'/>
        </a>
    </header> );
}

export default HeaderComponent;