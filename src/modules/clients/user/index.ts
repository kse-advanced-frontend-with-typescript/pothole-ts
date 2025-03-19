import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../convertToType';

const UserSchema = Type.Array(Type.Object({
    _id: Type.String(),
    login: Type.String(),
    token: Type.String(),
}));

export type User = Static<typeof UserSchema>

export const initUserAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const getUserToken = async (login: string, password: string): Promise<string> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const queryUser = {
            login: login
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
            return user[0].token;
        }

        throw Error('User does not exist');
    };


    return {
        getUserToken
    };
};

