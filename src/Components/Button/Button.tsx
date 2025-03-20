import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type ButtonType = {
    layout: 'fitContent' | 'fillAll'
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

export const Button: React.FC<ButtonType> = ({children, layout, onClick, className}) => {
    return <button className={classNames(styles.button, className, {
        [styles.buttonFit]: layout === 'fitContent',
        [styles.buttonFillAll]: layout === 'fillAll'
    })} onClick={onClick}>{children}</button>;
};
