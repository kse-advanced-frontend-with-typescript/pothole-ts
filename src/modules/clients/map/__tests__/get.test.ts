import {initMapAPI, MapItemResult} from '../index';
import {Type} from '@sinclair/typebox';

describe('Map API: get', () => {
    const API_KEY = 'API_KEY';


    describe('when response is valid', () => {
        const body: MapItemResult = {
            data: [{
                _id: '123',
                lat: 1,
                lng: 1,
                title: 'Some title here',
                isDone: false,
            }],
            totals: {
                total: 100,
                count: 10,
                skip: 10,
                max: 10,
            }
        };

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.get();

            expect(res).toEqual(body);
        });
    });

    describe('when response is not valid', () => {
        const body: MapItemResult = {
            data: [{
                _id: '123',
                lat: 1,
                lng: 1,
                // @ts-expect-error We want to check invalid data
                title: 2,
                isDone: false,
            }],
            totals: {
                total: 100,
                count: 10,
                skip: 10,
                max: 10,
            }
        };

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('should throw an error', async () => {
            await expect(api.get()).rejects.toThrow('Data is not valid: /data/0/title (Expected string)');
        });
    });

    describe('when pages are specified', () => {
        const body: MapItemResult = {
            data: [{
                _id: '123',
                lat: 1,
                lng: 1,
                title: 'Some title here',
                isDone: false,
            }],
            totals: {
                total: 100,
                count: 10,
                skip: 10,
                max: 10,
            }
        };

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('it should extend query parameters', async () => {
            await api.get(10, 100);

            expect(fetchMocked).toBeCalledWith(expect.stringContaining('totals=true'), expect.any(Object));
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('skip=10'), expect.any(Object));
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('max=100'), expect.any(Object));
        });
    });


});
