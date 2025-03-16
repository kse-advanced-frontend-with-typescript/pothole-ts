import {Static, Type} from '@sinclair/typebox';
import {TypeCompiler} from '@sinclair/typebox/compiler';
const MapItemSchema = Type.Object({
    _id: Type.String(),
    lat: Type.Union([Type.Number(), Type.String()]),
    lng: Type.Union([Type.Number(), Type.String()]),
    title: Type.String(),
    isDone: Type.Optional(Type.Boolean()),
});

const MapItemResultSchema = Type.Array(MapItemSchema);
export type MapItemResult = Static<typeof MapItemResultSchema>


export const initMapAPI = (api_key: string,
                     fetchAPI: typeof fetch) => {

    const get = async (): Promise<MapItemResult> => {
        const headers = new Headers();
        headers.set('x-apikey', api_key);

        const response =  await fetchAPI('https://mapstorage-7e78.restdb.io/rest/mapitem', {
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

        throw Error(`Data is not valid: ${Compiler.Errors(data).First()?.message}`);
    };


    return {
        get
    };
};



