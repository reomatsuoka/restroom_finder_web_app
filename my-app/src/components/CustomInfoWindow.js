import React from "react";
import "../assets/scss/mapContainer.css";

const CustomInfoWindow = ({ marker, onCloseClick }) => {
  // カスタムオーバーレイを表示する位置を計算
  const overlayStyle = {
    position: "absolute",
    backgroundColor: "red",
    padding: "10px",
    borderRadius: "5px",
    top: `${marker.lat}px`, // 緯度にem単位を使用
    left: `${marker.lng}px`, // 経度にem単位を使用
    // zIndex: 9999, // 適切な値を設定
  };

  return (
    <div style={overlayStyle}>
      <h3>マーカー情報</h3>
      <p>緯度: {marker.lat}</p>
      <p>経度: {marker.lng}</p>
      <button onClick={onCloseClick}>閉じる</button>
    </div>
  );
};

export default CustomInfoWindow;
