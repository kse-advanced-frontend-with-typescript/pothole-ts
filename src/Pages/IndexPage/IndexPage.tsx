import {Tabs} from '../../Components/Tabs/Tabs';
import React, {useContext} from 'react';
import {Button} from '../../Components/Button/Button';
import styles from './styles.css';
import {useNavigate, useParams} from 'react-router';
import {ListOfMapItems} from './ListOfMapItems';
import { Map } from '../../Components/Map/Map';
import {MapOfMapItems} from './MapOfMapItems';
import {AppContext} from '../../context';

export const IndexPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const params = useParams<{page: string}>();
    const goToAddNewItemPage = () => {
        navigate('/add');
    };
    return <>
        {context.user?._id ? <div className={styles.buttonSlot}>
            <Button className={styles.button} onClick={goToAddNewItemPage} layout='fitContent'>Add new Item</Button>
        </div> : null }

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
