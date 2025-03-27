import React from 'react';
import {initUserAPI, User} from './modules/clients/user';
import {initMapAPI} from './modules/clients/map';

type AppContext = {
    readonly user?: User
    setUser: (user: User) => void
    cleanUser: () => void
    userAPI: ReturnType<typeof initUserAPI>
    mapAPI: ReturnType<typeof initMapAPI>
}

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    userAPI: {} as ReturnType<typeof initUserAPI>,
    mapAPI: {} as ReturnType<typeof initMapAPI>,
    cleanUser: () => {}
});
