import React from "react";
import "./DetailedInfoCard.css";

const DetailedInfoCard = ({ label, value}) => {
  return (
    <div className="info-card">
      <p className="info-label">{label}</p>
      <h3 className="info-value">{value}</h3>
    </div>
  );
};

export default DetailedInfoCard;
