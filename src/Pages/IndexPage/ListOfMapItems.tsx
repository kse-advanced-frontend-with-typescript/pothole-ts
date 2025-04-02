import React, {useContext, useEffect, useState} from 'react';
import {MapItem, MapItemResult} from '../../modules/clients/map';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {AppContext} from '../../context';
import {PageItem, Pagination} from '../../Components/Pagination/Pagination';
import {Link} from 'react-router';
import styles from './ListOfMapItems.css';

export const ListOfMapItems: React.FC<{currentPage: number}> = ({ currentPage }) => {
    const PER_PAGE = 5;
    const startWith = (currentPage - 1) * PER_PAGE;
    const [total, setTotal] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<MapItem[]>([]);
    const context = useContext(AppContext);



    useEffect(() => {
        setIsLoading(true);
        context.mapAPI.get(startWith, PER_PAGE).then(res => {
            setTotal(res.totals.total);
            setItems(res.data);
            setIsLoading(false);
        });
    }, [ startWith ]);

    const numberOfPages = Math.ceil(total / PER_PAGE);
    const pages = Array(numberOfPages).fill('').map((_, index) => index + 1);

    return <>
        {items.length < 1 && <NotificationElement message="No elements" level="info" />}
        <br />
        {isLoading && <p className={styles.loading}>Loading...</p>}
        <br />
        <ul  className={styles.items}>
            {items.map(item => {
                return <Link key={item._id} to={`/issue/${item._id}`}><li>{item.title}</li></Link>;
            })}
        </ul>

        <Pagination>
            <>
                {pages.map(page => {
                    return <Link key={page} to={`/page/${page}`}><PageItem isActive={page === currentPage}>{page}</PageItem></Link>;
                })}
            </>
        </Pagination>
    </>;
};
