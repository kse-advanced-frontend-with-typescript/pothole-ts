import React, {useContext, useEffect, useState} from 'react';
import {MapItem, MapItemResult} from '../../modules/clients/map';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {AppContext} from '../../context';
import {PageItem, Pagination} from '../../Components/Pagination/Pagination';

export const ListOfMapItems: React.FC = () => {
    const PER_PAGE = 5;
    const [startWith, setStartWith] = useState<number>(0);
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
        {isLoading && 'Loading...'}
        <br />
        <ul>
            {items.map(item => {
                return <div key={item._id}>{item.title}</div>;
            })}
        </ul>

        <Pagination>
            <>
                {pages.map(page => {
                   return <PageItem key={page} isActive={false}>{page}</PageItem>;
                })}
            </>
        </Pagination>
    </>;
};
