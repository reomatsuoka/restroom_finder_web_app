import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Map.css';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 35.681236,
  lng: 139.767125
};

type Position = {
  lat: number,
  lng: number
};

const Map: React.FC = () => {
  const [locations, setLocations] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態の追加
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // サイドバーの状態
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  // サイドバーの開閉を制御する関数
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ユーザーがログインしているかどうかをチェック
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // トークンがなければログインページへ
    } else {
      setIsLoading(false); // ローディング状態の解除
    }
  }, [navigate]);

  // APIから位置データを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/locations/');
        setLocations(result.data.map((location: any) => ({ lat: location.lat, lng: location.lng })));
        setIsLoading(false); // データ取得後、ローディング状態を解除
      } catch (error) {
        console.error(error);
        setIsLoading(false); // エラーが発生した場合もローディング状態を解除
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isSidebarOpen && (
        <div className="sidebar">
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      )}

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {locations.map((location, i) => (
            <Marker key={i} position={location} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;

