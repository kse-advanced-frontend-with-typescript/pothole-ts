import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from 'react-router';
import {IndexPage} from './Pages/IndexPage/IndexPage';
import styles from './main.css';
import {Header, HeaderLeft, HeaderRight} from './Components/Header/Header';
import {Logo} from './Components/Logo/Logo';
import {IssueCounter} from './Components/IssueCounter/IssueCounter';
import {Login} from './Components/Login/Login';
import {LoginPage} from './Pages/loginPage/loginPage';
import {AddItemPage} from './Pages/addItemPage/AddItemPage';
import {AppContext} from './context';
import {initUserAPI, User} from './modules/clients/user';
import {initMapAPI} from './modules/clients/map';
import {DetailPage} from './Pages/IndexPage/DetailPage';



export const App: React.FC = () => {
    const [context, setContext] = useState<{user?: User}>({ });
    const [stats, setStats] = useState<{opened: number, closed: number}>({
        opened: 0,
        closed: 0
    });

    const userAPI = initUserAPI(process.env.API_KEY ?? '', fetch);
    const mapAPI = initMapAPI(process.env.API_KEY ?? '', fetch);

    const setUser = (user: User) => {
        const token = user.token;
        userAPI.saveToken(token);

        setContext({
            ...context,
            user
        });
    };

    const cleanUser = () => {
        setContext({
            ...context,
            user: undefined
        });

        userAPI.cleanToken();
    };

    useEffect(() => {
        mapAPI.getStat().then(stat => {
            const isDone = stat.true['COUNT isDone'];
            const isOpened = stat.false['COUNT isDone'] + stat.undefined['COUNT isDone'];
            setStats({
                opened: isOpened,
                closed: isDone
            });
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const token = userAPI.restoreToken();
        if (!token) return;

        userAPI.getUserInfo(token).then(user => {
            setUser(user);
        }).catch(console.error);
    }, []);

    return <>
        <AppContext.Provider value={{
            ...context,
            setUser,
            cleanUser,
            userAPI,
            mapAPI
        }}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <Header>
                        <HeaderLeft>
                            <Link to={'/'}><Logo/></Link>
                            <IssueCounter counter={stats.opened} title='Issues' kind='issue' isActive={false}/>
                            <IssueCounter counter={stats.closed} title='Solved' kind='solved' isActive={false}/>
                        </HeaderLeft>
                        <HeaderRight>
                            {context.user?._id ?
                                <Login onClick={cleanUser} isLogged={true}/>
                                :
                                <Link to={'/login'}><Login isLogged={false}/></Link>
                            }

                        </HeaderRight>
                    </Header>
                </header>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<IndexPage/>}/>
                        <Route path="/page/:page?" element={<IndexPage/>}/>
                        <Route path="/issue/:id" element={<DetailPage/>}/>
                        <Route path="login" element={<LoginPage />}/>
                        <Route path="add" element={<AddItemPage />}/>
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    </>
        ;
};
