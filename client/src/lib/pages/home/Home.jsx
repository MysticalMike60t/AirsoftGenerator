import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  const presetViewerBodyImages = {
    ar15: '/assets/images/rifles/ar15/Ferfrans Fully Licensed M4 AEG.png',
    ak: '/assets/images/rifles/ak/ELAK104 AEG ESSENTIAL.png',
    smg: '/assets/images/smgs/mp7/HK MP7 Navy GBB Airsoft Submachine Gun.png',
  };

  const viewerBodyCategory = new URLSearchParams(location.search).get('image');

  const viewerBodyUrl = presetViewerBodyImages[viewerBodyCategory] || 'default-image-url';

  const sightSelectorClass = viewerBodyCategory ? `sight-selector ${viewerBodyCategory}` : 'sight-selector';

  return (
    <div className="page home">
      <div className="sidebar" id="sidebar">
        <Link to="/?image=ar15">AR-15</Link>
        <Link to="/?image=ak">AK</Link>
        <Link to="/?image=smg">SMG</Link>
      </div>
      <div className="viewer">
        <div className="wrapper">
          <div className="gun">
            <div className={sightSelectorClass}></div>
            <img src={viewerBodyUrl} alt="Body" className="body" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
