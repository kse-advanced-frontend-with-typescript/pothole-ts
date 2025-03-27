import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { generatePath, useNavigate } from 'react-router';

const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 10rem)'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

type Point = {
    _id: number
    lat: number | string
    lng: number | string
}

type MapProps = {
    points: Point[]

}

type MapInstance = {
    fitBounds: (b: google.maps.LatLngBounds) => void
    setZoom: (n: number) => void
}

export const Map: React.FC<MapProps> = ({ points }) => {
    const navigate = useNavigate();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.MAP_KEY ?? ''
    });

    const [map, setMap] = React.useState<MapInstance>();

    const onLoad = React.useCallback(
        function callback(map: MapInstance) {
            fitMap(map, points);

            setMap(map);
        },
        [points]
    );

    useEffect(() => {
        if (!map) return;

        fitMap(map, points);
    }, [map, points]);

    const fitMap = (map: MapInstance, points: Point[]) => {
        const bounds = new window.google.maps.LatLngBounds();

        points.forEach((point) => bounds.extend({ lat: Number(point.lat), lng: Number(point.lng) }));

        map.fitBounds(bounds);
        map.setZoom(3);
    };

    const onUnmount = React.useCallback(function callback() {
        // @ts-ignore
        setMap(null);
    }, []);

    return isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
        center={center}
    onLoad={onLoad}
    zoom={7}
    onUnmount={onUnmount}
        >
        <>
            {points.map((point) => (
                    <Marker
                        key={point._id}
                onClick={() => {
        navigate(generatePath('/issue/:id', { id: point._id.toString() }));
    }}
    position={{
        lat: Number(point.lat),
            lng: Number(point.lng)
    }}
    />
))}
    </>
    </GoogleMap>
) : (
        <></>
    );
};
