import React, {useContext, useEffect, useState} from 'react';
import {MapItem, MapItemResult} from '../../modules/clients/map';
import {NotificationElement} from '../../Components/NotificationElement/NotificationElement';
import {AppContext} from '../../context';
import {PageItem, Pagination} from '../../Components/Pagination/Pagination';
import {Link} from 'react-router';
import {Map} from '../../Components/Map/Map';

export const MapOfMapItems: React.FC = () => {

    const [total, setTotal] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<MapItem[]>([]);
    const context = useContext(AppContext);



    useEffect(() => {
        setIsLoading(true);
        context.mapAPI.get().then(res => {
            setTotal(res.totals.total);
            setItems(res.data);
            setIsLoading(false);
        }).catch(console.error);
    }, [  ]);


    return <>
        {items.length < 1 && <NotificationElement message="No elements" level="info" />}
        <br />
        {isLoading && 'Loading...'}
        <br />
        <Map points={items} />
    </>;
};
