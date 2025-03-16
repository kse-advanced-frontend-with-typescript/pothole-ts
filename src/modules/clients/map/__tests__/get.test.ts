import {initMapAPI, MapItemResult} from '../index';

describe('Map API: get', () => {
    const API_KEY = 'API_KEY';


    describe('when response is valid', () => {
        const body: MapItemResult = [{
            _id: '123',
            lat: 1,
            lng: 1,
            title: 'Some title here',
            isDone: false,
        }];

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('test', async () => {
            const res = await api.get();

            expect(res).toEqual(body);
        });
    });

    describe('when response is not valid', () => {
        const body: MapItemResult = [{
            _id: '123',
            lat: 1,
            lng: 1,
            // @ts-expect-error We want to check invalid data
            title: 2,
            isDone: false,
        }];

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('test', async () => {
            expect(api.get()).rejects.toThrow('Data is not valid: Expected string');
        });
    });


});
