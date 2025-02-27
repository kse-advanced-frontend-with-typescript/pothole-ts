import React from 'react';
import styles from './styles.css';

type LoginProps = {
    isLogged: boolean
}

export const Login: React.FC<LoginProps> = ({ isLogged }) => {
    return <div className={styles.login}>{isLogged ? 'Log out' : 'Log In'}</div>;
};
