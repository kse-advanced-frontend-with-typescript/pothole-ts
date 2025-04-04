import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../convertToType';
import {MapItem} from '../map';

const UserItemSchema = Type.Object({
    _id: Type.String(),
    login: Type.String(),
    token: Type.String(),
});

const UserSchema = Type.Array(UserItemSchema);

export type User = Static<typeof UserItemSchema>

export const initUserAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const SESSION_KEY = 'sessionKey';


    const getUserByToken = async (login: string, password: string): Promise<User> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const queryUser = {
            login: login,
            password
        };

        const params = new URLSearchParams();
        params.set('q', JSON.stringify(queryUser));

        const response =  await fetchAPI(`https://mapstorage-7e78.restdb.io/rest/userlist?${params.toString()}`, {
            headers
        });

        if (!response.ok) {
            throw Error(`Could not fetch user token: ${response.statusText}`);
        }

        const data = await response.json();

        const user = convertToType(data, UserSchema);

        if(user.length > 0) {
            return {
                _id: user[0]._id,
                token: user[0].token,
                login: user[0].login,
            };
        }

        throw Error('User does not exist');
    };

    const getUserInfo = async (token: string): Promise<Static<typeof UserItemSchema>> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const queryUser = {
            token,
        };

        const params = new URLSearchParams();
        params.set('q', JSON.stringify(queryUser));

        const response =  await fetchAPI(`https://mapstorage-7e78.restdb.io/rest/userlist?${params.toString()}`, {
            headers
        });

        if (!response.ok) {
            throw Error(`Could not fetch map item: ${response.statusText}`);
        }

        const data = await response.json();

        const user = convertToType(data, UserSchema);

        if(user.length > 0) {
            return {
                _id: user[0]._id,
                login: user[0].login,
                token: user[0].token,
            };
        }

        throw Error('User does not exist');
    };

    const restoreToken = (): string | null => {
        return window.localStorage.getItem(SESSION_KEY);
    };

    const cleanToken = (): void => {
        window.localStorage.removeItem(SESSION_KEY);
    };

    const saveToken = (token: string): void => {
        window.localStorage.setItem(SESSION_KEY, token);
    };


    return {
        getUserByToken,
        getUserInfo,
        restoreToken,
        saveToken,
        cleanToken
    };
};

