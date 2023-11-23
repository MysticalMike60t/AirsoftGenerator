import React from "react";

const OpticCard = ({ opticImage, opticName }) => {
  return (
    <div className="optic-card">
      <img src={opticImage} alt={opticName} />
      <h4>{opticName}</h4>
      {/* Add more details if needed */}
    </div>
  );
};

export default OpticCard;
