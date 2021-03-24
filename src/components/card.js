import React, { useState } from "react";
import { Modal } from "react-bootstrap";

//css
import "./card.css";

const Card = ({ eventdatahome }) => {
  const { id, title, location, participant, date, note, image } = eventdatahome;

  return (
    <div>
      <div className="outer-box" key={id}>
        <div>
          <img
            className="card-title"
            src={`http://localhost:5000/image/${image}`}
            alt=""
          />
        </div>
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <p className="location">{location}</p>
          <p className="title-card-book">{title}</p>
          <p className="date">{date.slice(0, 10)}</p>
          <hr style={{ marginTop: "4px", marginBottom: "4px" }} />
          <p className="writer">{participant}</p>
          <hr style={{ marginTop: "4px", marginBottom: "4px" }} />
          <p className="note">
            <b>note</b>: {note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
