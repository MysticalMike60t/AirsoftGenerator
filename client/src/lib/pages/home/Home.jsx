import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  
  const presetViewerBodyImages = {
    ar15: 'ar15-image-url',
    ak: 'ak-image-url',
    smg: 'smg-image-url',
  };

  const viewerBodyCategory = new URLSearchParams(location.search).get('image');

  const viewerBodyUrl = presetViewerBodyImages[viewerBodyCategory] || 'default-image-url';

  return (
    <div className="page home">
      <div className="sidebar" id="sidebar">
        <Link to="/?image=ar15">AR-15</Link>
        <Link to="/?image=ak">AK</Link>
        <Link to="/?image=smg">SMG</Link>
      </div>
      <div className="viewer">
        <div className="wrapper">
          <img src={viewerBodyUrl} alt="Body" className="body" />
        </div>
      </div>
    </div>
  );
};

export default Home;
