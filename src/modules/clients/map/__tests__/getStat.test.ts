import {initMapAPI, MapItemResult, MapStat} from '../index';
import {Type} from '@sinclair/typebox';

describe('Map API: getStat', () => {
    const API_KEY = 'API_KEY';


    describe('when response is valid', () => {
        const body: MapStat = {
            false: {
                'COUNT isDone': 2
            },
            true: {
                'COUNT isDone': 28
            },
            undefined: {
                'COUNT isDone': 23
            }
        };

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = initMapAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.getStat();

            expect(res).toEqual(body);
        });
    });
});
