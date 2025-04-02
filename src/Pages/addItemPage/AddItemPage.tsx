import {Button} from '../../Components/Button/Button';
import styles from './style.css';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {useContext, useRef, useState} from 'react';
import {AppContext} from '../../context';
import {useNavigate} from 'react-router';

export const AddItemPage: React.FC = () => {
    const context = useContext(AppContext);

    const title = useRef<HTMLInputElement>(null);
    const lat = useRef<HTMLInputElement>(null);
    const lng = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        if(!title.current || !lat.current || !lng.current || !description.current) return;

        setIsLoading(true);
        context.mapAPI.create(title.current.value, parseInt(lat.current.value), parseInt(lng.current.value)).then(data => {
            setIsLoading(false);
            navigate('/');
        }).catch(e => {
            setError(String(e));
        });
    };

    return <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.row}>
            <input ref={title} className={styles.input} type="text" placeholder='Title'/>
        </div>

        <div className={styles.row}>
            <div className={styles.subrow}>
                <input ref={lat} className={styles.input} type="text" placeholder='Lat'/>
            </div>
            <div className={styles.subrow}>
                <input ref={lng} className={styles.input} type="text" placeholder='long'/>
            </div>

        </div>

        <div className={styles.row}>
            <textarea ref={description} name="" className={styles.textarea} ></textarea>
        </div>

        <div className={styles.row}>
            <Button disabled={isLoading} layout='fillAll'>Add Item</Button>
        </div>

        {error && <NotificationElement message={error} level='error' />}


    </form>;
};
