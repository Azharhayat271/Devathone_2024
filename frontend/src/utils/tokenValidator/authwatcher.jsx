import { useNavigate } from 'react-router-dom';
import useLocalStorageWatcher from './tokenchecker';

const AuthWatcher = () => {
    const navigate = useNavigate();

    useLocalStorageWatcher('token', () => {
        navigate('/');
    });

    return null; // This component doesn't render anything
};

export default AuthWatcher;
