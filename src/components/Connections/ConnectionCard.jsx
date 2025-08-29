import React from "react";

const ConnectionCard = ({ userData }) => {
  const { firstname, lastname, age, gender, photoURL, skills } = userData;
  return (
    <li className="list-row">
      <div>
        <img className="size-10 rounded-box" src={photoURL} />
      </div>
      <div>
        <div>{`${firstname} ${lastname}`}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Age: {age} Gender: {gender}
        </div>
      </div>
      <p className="list-col-wrap text-xs">
        <b>Skills: </b> {skills}
      </p>
    </li>
  );
};

export default ConnectionCard;
