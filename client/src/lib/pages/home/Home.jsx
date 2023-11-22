import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import M4A1Image from "../../assets/images/rifles/ar15/Ferfrans Fully Licensed M4 AEG.png";
import AK47Image from "../../assets/images/rifles/ak/ELAK104 AEG ESSENTIAL.png";
import MP7Image from "../../assets/images/smgs/mp7/HK MP7 Navy GBB Airsoft Submachine Gun.png";
import OpticImage from "../../assets/images/optics/holographic/eotech/exps2_ls.png"; // Add your optic image

const Sidebar = ({ imagesByCategory, onSelectOptic, selectedGun }) => {
  const categories = [{ name: "AR-15" }, { name: "AK" }, { name: "SMG" }];

  return (
    <div className="sidebar" id="sidebar">
      {categories.map((category) => (
        <div className="category" key={category.name}>
          <h3>{category.name}</h3>
          {imagesByCategory[category.name].map((gun, index) => (
            <div key={index}>
              <Link
                className="link"
                to={`/?category=${encodeURIComponent(
                  category.name
                )}&image=${encodeURIComponent(gun.name)}`}
              >
                {gun.name}
              </Link>
              {selectedGun &&
                selectedGun.name === gun.name &&
                gun.optics &&
                gun.optics.length > 0 && (
                  <div className="optic-selector">
                    <h4>Optics:</h4>
                    {gun.optics.map((optic, opticIndex) => (
                      <button
                        key={opticIndex}
                        onClick={() => onSelectOptic(optic.image, optic.name)}
                      >
                        {optic.name}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [opticImage, setOpticImage] = useState(null);
  const [selectedGun, setSelectedGun] = useState(null);

  const imagesByCategory = {
    "AR-15": [
      {
        name: "M4A1",
        image: M4A1Image,
        optics: [
          {
            name: "EOTech EXPS2",
            image: OpticImage,
          },
          // Add more optics as needed
        ],
      },
    ],
    AK: [
      {
        name: "AK-47",
        image: AK47Image,
        optics: [
          // Add optics for AK-47
        ],
      },
    ],
    SMG: [
      {
        name: "MP7",
        image: MP7Image,
        optics: [
          {
            name: "EOTech EXPS2",
            image: OpticImage,
          },
          // Add more optics as needed
        ],
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
    ? `sight-selector ${viewerBodyImageName} ${selectedGun && selectedGun.name}`
    : "sight-selector";

  const opticClass = opticImage
    ? `${opticImage.split("/").pop().split(".")[0]} ${
        selectedGun && selectedGun.name
      }`
    : "";

  const onSelectOptic = (opticImage, opticName) => {
    // Check if the selected optic is part of the currently selected gun's optics array
    if (selectedGun && selectedGun.optics) {
      const isValidOptic = selectedGun.optics.some(
        (optic) => optic.name === opticName
      );

      if (!isValidOptic) {
        // Selected optic is not valid for the currently selected gun, do nothing
        return;
      }
    }

    // Update the state with the selected optic image
    setOpticImage(opticImage);

    // Update URL parameter
    if (opticName) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("optic", encodeURIComponent(opticName));
      navigate({ search: searchParams.toString() });
    }
  };

  // Effect to handle changing opticImage based on URL parameters
  useEffect(() => {
    const opticName = decodeURIComponent(
      new URLSearchParams(location.search).get("optic")
    );
    if (opticName) {
      for (const category in imagesByCategory) {
        const optic = imagesByCategory[category]
          .flatMap((gun) => gun.optics || [])
          .find((o) => o.name === opticName);

        if (optic && optic.image !== opticImage) {
          setOpticImage(optic.image);

          // Update URL parameter
          const searchParams = new URLSearchParams(location.search);
          searchParams.set("optic", encodeURIComponent(optic.name));
          navigate({ search: searchParams.toString() });

          break;
        }
      }
    }
    const categoryImages = imagesByCategory[viewerBodyCategory];

const updatedSelectedGun =
  categoryImages &&
  categoryImages.find((gun) => gun.name === viewerBodyImageName);

if (!updatedSelectedGun) {
  // Handle the case where the gun is not found
  console.error(`Gun with name ${viewerBodyImageName} not found.`);
  return;
}

setSelectedGun(updatedSelectedGun);

  }, [
    location.search,
    opticImage,
    imagesByCategory,
    navigate,
    viewerBodyCategory,
    viewerBodyImageName,
  ]);

  return (
    <div className="page home">
      <Sidebar
        imagesByCategory={imagesByCategory}
        onSelectOptic={onSelectOptic}
        selectedGun={selectedGun}
      />

      <div className="viewer">
        <div className="wrapper">
          <div className={gunClass}>
            <div className={sightSelectorClass}>
              {opticImage && (
                <img
                  src={opticImage}
                  alt="Optic"
                  className={`optic ${opticClass}`}
                />
              )}
            </div>
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
