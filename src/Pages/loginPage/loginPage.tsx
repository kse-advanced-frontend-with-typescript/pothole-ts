import {Button} from '../../Components/Button/Button';
import styles from './style.css';
import {useContext, useRef, useState} from 'react';
import {AppContext} from '../../context';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {useNavigate} from 'react-router';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const login = useRef<HTMLInputElement>(null);
    const pass = useRef<HTMLInputElement>(null);
    const context = useContext(AppContext);
    const [error, setError] = useState<string>();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    if (context.user?._id) {
        navigate('/');
    }

    const onLoginSubmit: React.FormEventHandler = async (e) => {
        setError('');
        setIsProcessing(true);
        e.preventDefault();
        try {
            const user = await context.userAPI.getUserByToken(login.current?.value ?? '', pass.current?.value ?? '');
            context.setUser(user);
        } catch (e) {
            console.error(e);
            setError(String(e));
        }
        setIsProcessing(false);
    };

    return <form onSubmit={onLoginSubmit} className={styles.form}>
            <div className={styles.row}>
                <input ref={login} className={styles.input} type="text" placeholder='login' />
            </div>

            <div  className={styles.row}>
                <input ref={pass} className={styles.input} type="pasword"  placeholder='password'/>
            </div>

            <div className={styles.row}>
                <Button disabled={isProcessing} layout='fillAll'>Log In</Button>
            </div>

            {error && <NotificationElement message={error} level='error' />}
        </form>;
};
