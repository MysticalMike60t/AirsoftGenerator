import React from "react";
import { Link, useLocation } from "react-router-dom";
import M4A1Image from "../../assets/images/rifles/ar15/Ferfrans Fully Licensed M4 AEG.png";
import AK47Image from "../../assets/images/rifles/ak/ELAK104 AEG ESSENTIAL.png";
import MP7Image from "../../assets/images/smgs/mp7/HK MP7 Navy GBB Airsoft Submachine Gun.png";

const Sidebar = ({ imagesByCategory }) => {
  const categories = [{ name: "AR-15" }, { name: "AK" }, { name: "SMG" }];

  return (
    <div className="sidebar" id="sidebar">
      {categories.map((category) => (
        <div className="category" key={category.name}>
          <h3>{category.name}</h3>
          {imagesByCategory[category.name].map((image, index) => (
            <Link
              className="link"
              key={index}
              to={`/?image=${encodeURIComponent(image.name)}`}
            >
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

  const imagesByCategory = {
    "AR-15": [
      {
        name: "M4A1",
        image: M4A1Image,
      },
    ],
    AK: [
      {
        name: "AK-47",
        image: AK47Image,
      },
    ],
    SMG: [
      {
        name: "MP7",
        image: MP7Image,
      },
    ],
  };

  const viewerBodyImageName =
    decodeURIComponent(new URLSearchParams(location.search).get("image")) ||
    "default-image-name";

  let viewerBodyImage;
  let viewerBodyCategory;

  // Loop through categories to find the image
  for (const category in imagesByCategory) {
    const image = imagesByCategory[category].find(
      (img) => img.name === viewerBodyImageName
    );
    if (image) {
      viewerBodyImage = image.image;
      viewerBodyCategory = category;
      break;
    }
  }

  const gunClass = viewerBodyCategory ? `gun ${viewerBodyCategory}` : "gun";
  const sightSelectorClass = viewerBodyImage
    ? `sight-selector ${viewerBodyImageName}`
    : "sight-selector";

  return (
    <div className="page home">
      <Sidebar imagesByCategory={imagesByCategory} />
      <div className="viewer">
        <div className="wrapper">
          <div className={gunClass}>
            <div className={sightSelectorClass}></div>
            {viewerBodyImage ? (
              <img src={viewerBodyImage} alt="Body" className="body" />
            ) : (
              <p>Image not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
