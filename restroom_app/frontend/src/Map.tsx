import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 35.681236,
    lng: 139.767125
};

type Position = {
    lat: number,
    lng: number
}

const Map: React.FC = () => {
    const [locations, setLocations] = useState<Position[]>([]);

    // APIから位置データを取得
    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/locations/');
            setLocations(result.data.map((location: any) => ({lat: location.lat, lng: location.lng})));
        } catch (error) {
            console.error(error);
        }
    };
        
    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = async (e: google.maps.MapMouseEvent) => {
        let lat: number = e.latLng?.lat() ?? 0;
        let lng: number = e.latLng?.lng() ?? 0;

        try {
            //データの保存に成功したら、再度APIから位置データを取得
            await axios.post('http://localhost:8000/api/locations/', {lat, lng});
            console.log('Location saved');
            fetchData();
        } catch (err) {
            console.error(err);
        }
        
    };
    
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleClick}
            >
                {/* DBカラ取得した位置データに基づいて複数のマーカーを描画 */}
                {locations.map((location, i) => (
                    <Marker key={i} position={location} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;