import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const MapContainer = () => {
    const [markers, setMarkers] = useState([]);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 35.6895,
        lng: 139.6917
    }

    // APIからマーカーデータをフェッチ
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/markers/?format=json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log("data", data);
                setMarkers(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={defaultCenter}>
                {
                    markers.map(marker => {
                        return (
                            <Marker key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            />
                        )
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;