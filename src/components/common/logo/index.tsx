import { Link } from 'react-router-dom';
import logo from '@/assets/holidaze-logo.png';

export default function Logo() {
    return (
        <Link to='/'>
            <img src={logo} alt='Go to front page' />
        </Link>
    );
}
