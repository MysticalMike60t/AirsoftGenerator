import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const categories = [{ name: "AR-15" }, { name: "AK" }, { name: "SMG" }];

  const imagesByCategory = {
    "AR-15": [
      {
        name: "M4A1",
        link: "/assets/images/rifles/ar15/Ferfrans Fully Licensed M4 AEG.png",
      },
    ],
    AK: [
      {
        name: "AK-47",
        link: "/assets/images/rifles/ak/ELAK104 AEG ESSENTIAL.png",
      },
    ],
    SMG: [
      {
        name: "MP7",
        link: "/assets/images/smgs/mp7/HK MP7 Navy GBB Airsoft Submachine Gun.png",
      },
    ],
  };

  return (
    <div className="sidebar" id="sidebar">
      {categories.map((category) => (
        <div className="category" key={category.name}>
          <h3>{category.name}</h3>
          {imagesByCategory[category.name].map((image, index) => (
            <Link key={index} to={`/?image=${encodeURIComponent(image.link)}`}>
              {image.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const location = useLocation();

  const viewerBodyCategory = ""; // You can use this if you want to visually distinguish the category
  const viewerBodyUrl =
    decodeURIComponent(new URLSearchParams(location.search).get("image")) ||
    "default-image-url";

  const sightSelectorClass = viewerBodyCategory
    ? `sight-selector ${viewerBodyCategory}`
    : "sight-selector";

  return (
    <div className="page home">
      <Sidebar />
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
