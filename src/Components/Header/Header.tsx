import React from 'react';
import styles from './styles.css';

type HeaderProps = {
    children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return <header className={styles.header}>
        {children}
    </header>;
};

export const HeaderRight: React.FC<HeaderProps> = ({ children }) => {
    return <div className={styles.slots}>{children}</div>;
};

export const HeaderLeft: React.FC<HeaderProps> = ({ children }) => {
    return <div className={styles.slots}>{children}</div>;
};
