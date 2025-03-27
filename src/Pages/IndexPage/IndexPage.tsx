import {Tabs} from '../../Components/Tabs/Tabs';
import React from 'react';
import {Button} from '../../Components/Button/Button';
import styles from './styles.css';
import {useNavigate} from 'react-router';
import {ListOfMapItems} from './ListOfMapItems';

export const IndexPage: React.FC = () => {
    const navigate = useNavigate();
    const goToAddNewItemPage = () => {
        navigate('/add');
    };
    return <>
        <Button className={styles.button} onClick={goToAddNewItemPage} layout='fitContent'>Add new Item</Button>
        <Tabs activeTabIndex={0} tabs={[
            {
                title: 'Tab 1',
                content: <p>Hello from Tab 1</p>
            },
            {
                title: 'Tab 2',
                content: <ListOfMapItems />
            }
        ]}></Tabs>
    </>;
};
