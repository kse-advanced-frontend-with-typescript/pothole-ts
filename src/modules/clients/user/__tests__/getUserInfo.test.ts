import {initUserAPI, User} from '../index';
import {MapItemResult} from '../../map';

describe('User API: getUserInfo', () => {
    const API_KEY = 'API_KEY';

    describe('when user exists', () => {
        const body: User = [{
            _id: '123',
            login: 'some',
            token: 'token123',
        }];

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        it('should return user', async () => {
            const token = await initUserAPI(API_KEY, fetchMocked).getUserInfo('some');

            expect(token).toEqual({
                _id: '123',
                login: 'some',
                token: 'token123',
            });
        });
    });

    describe('when user does not exist', () => {
        const body: User = [];

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        it('should return users token', async () => {
            const api = initUserAPI(API_KEY, fetchMocked);

            await expect(api.getUserInfo('some')).rejects.toThrow('User does not exist');
        });
    });
});
