import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type ButtonType = {
    layout: 'fitContent' | 'fillAll'
    content: React.ReactNode
    onClick: () => void
}

export const Button: React.FC<ButtonType> = ({content, layout, onClick}) => {
    return <button className={classNames(styles.button, {
        [styles.buttonFit]: layout === 'fitContent',
        [styles.buttonFillAll]: layout === 'fillAll'
    })} onClick={() => onClick()}>{content}</button>;
};
