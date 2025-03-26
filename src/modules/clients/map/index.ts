import {Static, Type} from '@sinclair/typebox';
import {TypeCompiler} from '@sinclair/typebox/compiler';
import {schemaErrorToError} from '../schemaErrorToError';
import {convertToType} from '../convertToType';

const MapItemSchema = Type.Object({
    _id: Type.String(),
    lat: Type.Union([Type.Number(), Type.String()]),
    lng: Type.Union([Type.Number(), Type.String()]),
    title: Type.String(),
    isDone: Type.Optional(Type.Boolean()),
});

const MapItemResultSchema = Type.Object({
    data: Type.Array(MapItemSchema),
    totals: Type.Object({
        total: Type.Number(),
        count: Type.Number(),
        skip: Type.Number(),
        max: Type.Number(),
    })
});

const MapStatSchema = Type.Object({
    false: Type.Record(Type.Literal('COUNT isDone'), Type.Number()),
    true: Type.Record(Type.Literal('COUNT isDone'), Type.Number()),
    undefined: Type.Record(Type.Literal('COUNT isDone'), Type.Number()),
});

export type MapItem = Static<typeof MapItemSchema>
export type MapItemResult = Static<typeof MapItemResultSchema>
export type MapStat = Static<typeof MapStatSchema>


export const initMapAPI = (api_key: string,
                     fetchAPI: typeof fetch) => {

    const get = async (skip: number = 0, perPage: number = 1000): Promise<MapItemResult> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const params = new URLSearchParams();
        params.set('totals', 'true');
        params.set('skip', skip.toString());
        params.set('max', perPage.toString());


        const response =  await fetchAPI(`https://mapstorage-7e78.restdb.io/rest/mapitem?${params.toString()}`, {
            headers
        });

        if (!response.ok) {
            throw Error(`Could not fetch map item: ${response.statusText}`);
        }

        const data = await response.json();

        const Compiler = TypeCompiler.Compile(MapItemResultSchema);
        const isValid = Compiler.Check(data);

        if(isValid) {
            return data;
        }

        throw schemaErrorToError(Compiler.Errors(data).First());
    };

    const getDetails = async (id: string): Promise<MapItem> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');


        const response =  await fetchAPI(`https://mapstorage-7e78.restdb.io/rest/mapitem/${id}`, {
            headers
        });

        if (!response.ok) {
            throw Error(`Could not fetch map item: ${response.statusText}`);
        }

        const data = await response.json();


        return convertToType(data, MapItemSchema);
    };

    const getStat = async () => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');

        const filter = { $aggregate: ['COUNT:isDone'], $groupby: ['isDone'] };

        const params = new URLSearchParams();
        params.set('h', JSON.stringify(filter));


        const response =  await fetchAPI('https://mapstorage-7e78.restdb.io/rest/mapitem/', {
            headers
        });

        if (!response.ok) {
            throw Error(`Could not fetch map item: ${response.statusText}`);
        }

        const data = await response.json();


        return convertToType(data, MapStatSchema);
    };


    return {
        get,
        getDetails,
        getStat
    };
};

