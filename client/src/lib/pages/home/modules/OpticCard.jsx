import React from "react";
const OpticCard = ({ gunName, opticImage, opticName, manufacturerLink }) => {
  const opticClassName = opticName
    ? opticName.toLowerCase().replace(/\s/g, "-")
    : "";

  return (
    <div className={`optic-card ${opticClassName} ${gunName}`}>
      <img src={opticImage} alt="Optic" className="optic-card-image" />
      <h3>{opticName}</h3>
      {manufacturerLink && (
        <div>
          <p>Manufacturer's Website:</p>
          <a href={manufacturerLink} target="_blank" rel="noopener noreferrer">
            {manufacturerLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default OpticCard;
