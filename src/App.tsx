import React, {useState} from 'react';
import {Link, Route, Routes} from 'react-router';
import {IndexPage} from './Pages/IndexPage/IndexPage';
import styles from './main.css';
import {Header, HeaderLeft, HeaderRight} from './Components/Header/Header';
import {Logo} from './Components/Logo/Logo';
import {IssueCounter} from './Components/IssueCounter/IssueCounter';
import {Login} from './Components/Login/Login';
import {LoginPage} from './Pages/loginPage/loginPage';
import {AddItemPage} from './Pages/addItemPage/AddItemPage';
import {AppContext} from "./context";

export const App: React.FC = () => {
    const [context, setContext] = useState({ user: null })
    return <>
        <AppContext.Provider value={context}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <Header>
                        <HeaderLeft>
                            <Link to={'/'}><Logo/></Link>
                            <IssueCounter counter={84} title='Issues' kind='issue' isActive={false}/>
                            <IssueCounter counter={42} title='Solved' kind='solved' isActive={false}/>
                        </HeaderLeft>
                        <HeaderRight>
                            <Link to={'/login'}><Login isLogged={false}/></Link>
                        </HeaderRight>
                    </Header>
                </header>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<IndexPage/>}/>
                        <Route path="login" element={<LoginPage />}/>
                        <Route path="add" element={<AddItemPage />}/>
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    </>
        ;
};
