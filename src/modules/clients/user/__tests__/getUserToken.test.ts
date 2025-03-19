import {initUserAPI, User} from '../index';
import {MapItemResult} from '../../map';

describe('User API: getUserToken', () => {
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

        it('should return users token', async () => {
            const token = await initUserAPI(API_KEY, fetchMocked).getUserToken('some', 'corrent');

            expect(token).toEqual('token123');
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

            await expect(api.getUserToken('some', 'corrent')).rejects.toThrow('User does not exist');
        });
    });


});
