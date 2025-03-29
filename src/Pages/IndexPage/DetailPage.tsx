import React, {useContext, useEffect, useState} from 'react';

import {useParams} from 'react-router';

import {AppContext} from '../../context';
import {MapItem} from '../../modules/clients/map';
import styles from './DetailPage.css';

export const DetailPage: React.FC = () => {
    const params = useParams<{id: string}>();
    const [item, setItem] = useState<MapItem>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const context = useContext(AppContext);
    useEffect(() => {
        if (!params.id) return;

        setIsLoading(true);
        context.mapAPI.getDetails(params.id).then(setItem).finally(() => setIsLoading(false));
    }, [params.id]);
    return <>
        {isLoading ? <p>Loading...</p> : <div className={styles.wrapper}>
            <h2>{item?.title}</h2>
            <ul>
                <li>Lat: {item?.lat}</li>
                <li>Lng: {item?.lng}</li>
            </ul>
        </div>}
    </>;
};
