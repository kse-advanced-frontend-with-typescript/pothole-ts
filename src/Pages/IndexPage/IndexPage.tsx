import {Tabs} from '../../Components/Tabs/Tabs';
import React from 'react';
import {Button} from '../../Components/Button/Button';
import styles from './styles.css';
import {useNavigate, useParams} from 'react-router';
import {ListOfMapItems} from './ListOfMapItems';
import { Map } from '../../Components/Map/Map';
import {MapOfMapItems} from './MapOfMapItems';

export const IndexPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams<{page: string}>();
    const goToAddNewItemPage = () => {
        navigate('/add');
    };
    return <>
        <div className={styles.buttonSlot}>
            <Button className={styles.button} onClick={goToAddNewItemPage} layout='fitContent'>Add new Item</Button>
        </div>

        <Tabs activeTabIndex={0} tabs={[
            {
                title: 'Map',
                content: <MapOfMapItems />
            },
            {
                title: 'List',
                content: <ListOfMapItems currentPage={parseInt(params.page ?? '1')} />
            }
        ]}></Tabs>
    </>;
};
