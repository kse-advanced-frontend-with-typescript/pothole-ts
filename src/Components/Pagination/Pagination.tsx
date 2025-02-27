import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type PaginationProps = {
    children: React.ReactNode
}

type PageProps = {
    children: React.ReactNode
    isActive: boolean
}

export const Pagination: React.FC<PaginationProps> = ({ children }) => {

    return <ul className={styles.pageList}>
        {children}
    </ul>;
};


export const PageItem: React.FC<PageProps> = ( {children, isActive} ) => {
    return <li className={classNames(styles.pageItem, {
        [styles.pageItemActive]: isActive
    })}>{children}</li>;
};
