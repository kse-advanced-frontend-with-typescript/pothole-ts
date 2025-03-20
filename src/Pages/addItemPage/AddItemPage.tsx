import {Button} from '../../Components/Button/Button';
import styles from './style.css';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';

export const AddItemPage: React.FC = () => {
    const onLoginSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        alert('on login click');
    };

    return <form onSubmit={onLoginSubmit} className={styles.form}>
        <div className={styles.row}>
            <input className={styles.input} type="text" placeholder='Title'/>
        </div>

        <div className={styles.row}>
            <div className={styles.subrow}>
                <input className={styles.input} type="text" placeholder='Lat'/>
            </div>
            <div className={styles.subrow}>
                <input className={styles.input} type="text" placeholder='long'/>
            </div>

        </div>

        <div className={styles.row}>
            <textarea name="" className={styles.textarea} ></textarea>
        </div>

        <div className={styles.row}>
            <Button layout='fillAll'>Add Item</Button>
        </div>

        <NotificationElement message='Something went wrong' level='error' />

    </form>;
};
