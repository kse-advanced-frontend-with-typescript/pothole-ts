import React from 'react';
import styles from './main.css';
import {Header, HeaderLeft, HeaderRight} from './Components/Header/Header';
import {Logo} from './Components/Logo/Logo';
import {IssueCounter} from './Components/IssueCounter/IssueCounter';
import {Login} from './Components/Login/Login';
import {Tabs} from './Components/Tabs/Tabs';

export const App: React.FC = () => {

    return <div className={styles.wrapper}>
        <header className={styles.header}>
            <Header>
                <HeaderLeft>
                    <Logo />
                    <IssueCounter counter={84} title='Issues' kind='issue' isActive={false} />
                    <IssueCounter counter={42} title='Solved' kind='solved' isActive={false} />
                </HeaderLeft>
                <HeaderRight>
                    <Login isLogged={false} />
                </HeaderRight>
            </Header>
        </header>
        <div className={styles.content}>
            <Tabs activeTabIndex={0} tabs={[
                {
                    title: 'Tab 1',
                    content: <p>Hello from Tab 1</p>
                },
                {
                    title: 'Tab 2',
                    content: <p>Hello from Tab 2</p>
                }
            ]}></Tabs>
        </div>
    </div>;
};
