import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type ButtonType = {
    layout: 'fitContent' | 'fillAll'
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    className?: string
}

export const Button: React.FC<ButtonType> = ({children, layout, onClick, className, disabled}) => {
    return <button disabled={disabled} className={classNames(styles.button, className, {
        [styles.buttonFit]: layout === 'fitContent',
        [styles.buttonFillAll]: layout === 'fillAll'
    })} onClick={onClick}>{children}</button>;
};
