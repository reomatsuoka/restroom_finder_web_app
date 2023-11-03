import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import CustomInfoWindow from "./CustomInfoWindow.js";
import "../assets/scss/mapContainer.css";

const MapContainer = () => {
  const [markers, setMarkers] = useState([]);
  const [selectMarker, setSelectMarker] = useState(null);
  const [center] = useState({
    lat: 35.6895,
    lng: 139.6917,
  });
  const mapRef = useRef(null);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const clickMarker = (marker) => {
    console.log(mapRef.current);
    setSelectMarker(marker);
  };

  // APIからマーカーデータをフェッチ
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/markers/?format=json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setMarkers(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={center}
        onClick={() => setSelectMarker(null)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => clickMarker(marker)}
          />
        ))}
        {selectMarker && (
          <InfoWindow
            // marker={selectMarker}
            position={{ lat: selectMarker.lat, lng: selectMarker.lng }}
            onCloseClick={() => setSelectMarker(null)}
            className="info-window"
          >
            <div>
              <h3>マーカー情報</h3>
              <p>緯度: {selectMarker.lat}</p>
              <p>経度: {selectMarker.lng}</p>
              <span
                onClick={() => {
                  setSelectMarker(null);
                }}
              >
                閉じる
              </span>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
