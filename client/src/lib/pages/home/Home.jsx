import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import M4A1Image from "../../assets/images/rifles/ar15/Ferfrans Fully Licensed M4 AEG.png";
import AK47Image from "../../assets/images/rifles/ak/ELAK104 AEG ESSENTIAL.png";
import MP7Image from "../../assets/images/smgs/mp7/HK MP7 Navy GBB Airsoft Submachine Gun.png";
import OpticImage from "../../assets/images/optics/holographic/eotech/exps2_ls.png"; // Add your optic image
import LUMIXSpeedringCrossbowScope from "../../assets/images/optics/scope/crossbow/LUMIX_SPEEDRING_Crossbow_Scope.png";
import FastFire3Image from "../../assets/images/optics/red-dot/fastfire3.png";
import EotechVudu from "../../assets/images/optics/scope/eotech/EOTech_vudu.png";

import OpticCard from "./modules/OpticCard";

const initialState = {
  opticImage: null,
  selectedGun: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_OPTIC_IMAGE":
      return { ...state, opticImage: action.payload };
    case "SET_SELECTED_GUN":
      return { ...state, selectedGun: action.payload };
    default:
      return state;
  }
};

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
                onClick={() =>
                  setTimeout(function () {
                    window.location.reload();
                  }, 1)
                }
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

  const [state, dispatch] = useReducer(reducer, initialState);

  const isMounted = useRef(true);

  const [messageHidden, setMessageHidden] = useState(false);
  const [showOpticCard, setShowOpticCard] = useState(false);

  // Destructure state for easier access
  const { opticImage, selectedGun } = state;

  const imagesByCategory = useMemo(() => {
    return {
      "AR-15": [
        {
          name: "M4A1",
          image: M4A1Image,
          optics: [
            {
              name: "EOTech EXPS2",
              image: OpticImage,
              manufacturerLink: "https://www.eotechinc.com/",
            },
            {
              name: "LUMIX SPEEDRING Crossbow Scope",
              image: LUMIXSpeedringCrossbowScope,
              manufacturerLink:
                "https://shop.killerinstinctcrossbows.com/lumix-speedring-1-5-5-x-32-ir-e-crossbow-scope/",
            },
            {
              name: "FastFire 3",
              image: FastFire3Image,
              manufacturerLink: "https://www.burrisoptics.com/red-dots/fastfire-3",
            },
            {
              name: "EOTech Vudu",
              image: EotechVudu,
              manufacturerLink: "https://alphaopticsinc.com/eotech-vudu-1-10x28-ffp-precision-rifle-scope",
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
              manufacturerLink: "https://www.eotechinc.com/",
            },
            {
              name: "LUMIX SPEEDRING Crossbow Scope",
              image: LUMIXSpeedringCrossbowScope,
              manufacturerLink:
                "https://shop.killerinstinctcrossbows.com/lumix-speedring-1-5-5-x-32-ir-e-crossbow-scope/",
            },
            {
              name: "FastFire 3",
              image: FastFire3Image,
              manufacturerLink: "https://www.burrisoptics.com/red-dots/fastfire-3",
            },
            {
              name: "EOTech Vudu",
              image: EotechVudu,
              manufacturerLink: "https://alphaopticsinc.com/eotech-vudu-1-10x28-ffp-precision-rifle-scope",
            },
            // Add more optics as needed
          ],
        },
      ],
    };
  }, []);

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

  const gunClass = viewerBodyCategory
    ? `gun ${viewerBodyCategory} ${selectedGun && selectedGun.name}`
    : "gun";
  const sightSelectorClass = viewerBodyImage
    ? `sight-selector ${viewerBodyImageName} ${selectedGun && selectedGun.name}`
    : "sight-selector hidden";

  const opticClass = opticImage
    ? `${opticImage.split("/").pop().split(".")[0]} ${
        selectedGun && selectedGun.name
      }`
    : "";

  const onSelectOptic = (opticImage, opticName, manufacturerLink) => {
    if (selectedGun && selectedGun.optics) {
      const selectedOptic = selectedGun.optics.find(
        (optic) => optic.name === opticName
      );

      if (!selectedOptic) {
        console.error(
          `Optic with name ${opticName} not found for ${selectedGun.name}.`
        );
        return;
      }
    }

    dispatch({ type: "SET_OPTIC_IMAGE", payload: opticImage });

    if (opticName) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("optic", encodeURIComponent(opticName));
      navigate({ search: searchParams.toString() });
    }
  };

  useEffect(() => {
    return () => {
      // Component will unmount, set isMounted to false
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const opticParam = new URLSearchParams(location.search).get("optic");
    const updatedSelectedGun = imagesByCategory[viewerBodyCategory]?.find(
      (gun) => gun.name === viewerBodyImageName
    );

    console.log(`Gun Updated to: ${viewerBodyImageName}`);

    if (!updatedSelectedGun) {
      console.error(`Gun with name ${viewerBodyImageName} not found.`);
      return;
    }

    // Check if the component is still mounted before updating the state
    if (isMounted.current) {
      // Compare the previous and current selected gun before dispatching the action

      // Reset the optic image when a new gun is selected
      if (selectedGun && updatedSelectedGun !== selectedGun) {
        dispatch({ type: "SET_OPTIC_IMAGE", payload: null });
      }

      // Set the initial optic image based on the URL parameter
      if (opticParam) {
        const selectedOptic = updatedSelectedGun.optics.find(
          (optic) =>
            optic.name.toLowerCase() ===
            decodeURIComponent(opticParam).toLowerCase()
        );

        if (selectedOptic) {
          dispatch({ type: "SET_OPTIC_IMAGE", payload: selectedOptic.image });
        } else {
          console.error(
            `Optic with name ${opticParam} not found for ${updatedSelectedGun.name}.`
          );
          // If the specified optic is not found, clear the optic image
          dispatch({ type: "SET_OPTIC_IMAGE", payload: null });
        }
      } else {
        // No optic specified in the URL, clear the optic image
        dispatch({ type: "SET_OPTIC_IMAGE", payload: null });
      }

      if (updatedSelectedGun !== selectedGun) {
        dispatch({ type: "SET_SELECTED_GUN", payload: updatedSelectedGun });
      }
    }
  }, [
    location.search,
    imagesByCategory,
    viewerBodyCategory,
    viewerBodyImageName,
    selectedGun,
  ]);

  return (
    <div className="page home">
      <div className={`page-width-message ${messageHidden ? "hidden" : ""}`}>
        <p>
          Please use this site on a device with a screen wider than{" "}
          <span>970</span> pixels! The site will not function correctly
          otherwise!
        </p>
        <button onClick={() => setMessageHidden(true)}>
          I Understand, and wish to Proceed
        </button>
      </div>
      <Sidebar
        imagesByCategory={imagesByCategory}
        onSelectOptic={onSelectOptic}
        selectedGun={selectedGun}
      />

      <div className="viewer">
        <div className="wrapper">
          <div className={gunClass}>
            {showOpticCard && selectedGun && opticImage && (
              <OpticCard
                gunName={selectedGun.name}
                opticImage={opticImage}
                opticName={
                  selectedGun.optics.find((optic) => optic.image === opticImage)
                    ?.name || ""
                }
                manufacturerLink={
                  selectedGun.optics.find((optic) => optic.image === opticImage)
                    ?.manufacturerLink || ""
                }
              />
            )}
            <div
              className={sightSelectorClass}
              onClick={() => opticImage && setShowOpticCard(!showOpticCard)}
            >
              {opticImage && (
                <img
                  src={opticImage}
                  alt="Optic"
                  className={`optic ${opticClass}`}
                />
              )}
            </div>

            {selectedGun ? (
              <img src={selectedGun.image} alt="Body" className="body" />
            ) : (
              <p>Select A gun to start!</p>
            )}
          </div>
        </div>
      </div>
      {/* Display the optic card when showOpticCard is true */}
    </div>
  );
};

export default Home;
