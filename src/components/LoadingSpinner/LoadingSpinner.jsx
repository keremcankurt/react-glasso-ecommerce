import React from 'react';
import './LoadingSpinner.scss';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <p>Yükleniyor...</p>
    </div>
  );
}
