import {Button} from '../../Components/Button/Button';
import styles from './style.css';

export const LoginPage: React.FC = () => {
    const onLoginSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        alert('on login click');
    };

    return <form onSubmit={onLoginSubmit} className={styles.form}>
            <div className={styles.row}>
                <input  className={styles.input} type="text" placeholder='login' />
            </div>

            <div  className={styles.row}>
                <input  className={styles.input} type="pasword"  placeholder='password'/>
            </div>

            <div className={styles.row}>
                <Button layout='fillAll'>Log In</Button>
            </div>

        </form>;
};
