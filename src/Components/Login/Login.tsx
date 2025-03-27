import React from 'react';
import styles from './styles.css';

type LoginProps = {
    isLogged: boolean
    onClick?: () => void
}

export const Login: React.FC<LoginProps> = ({ isLogged, onClick }) => {
    return <div onClick={() => onClick?.()} className={styles.login}>{isLogged ? 'Log out' : 'Log In'}</div>;
};
