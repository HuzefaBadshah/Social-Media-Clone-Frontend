import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import Toaster from "../Toaster/Toaster";

const RequestCard = (props) => {
  const {
    _id: requestId,
    fromUserId: { firstname, lastname, age, gender, photoURL, skills },
    count,
  } = props.userData;
  const [toast, setToast] = useState({ show: false, msg: "", isSuccess: true });

  async function handleRequest(status) {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      props.setResetRequests(true);
      setToast({ show: true, msg: res.data.message });
    } catch (error) {
      setToast({ show: true, msg: error.message, isSuccess: false });
      console.error("Request Error: ", error);
    }
  }
  return (
    <>
      <Toaster show={toast.show} msg={toast.msg} />
      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {count}
        </div>
        <div>
          <img className="size-10 rounded-box" src={photoURL} />
        </div>
        <div className="list-col-grow">
          <div>{`${firstname} ${lastname}`}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            Age: {age} | Gender: {gender}
          </div>
        </div>
        <p className="list-col-wrap text-xs">
          <b>Skills: </b> {Array.isArray(skills) ? skills.join(", ") : skills}
        </p>
        <button
          onClick={() => handleRequest("accepted")}
          className="btn btn-dash btn-success"
        >
          Accept
        </button>
        <button
          onClick={() => handleRequest("rejected")}
          className="btn btn-dash btn-primary"
        >
          Ignore
        </button>
      </li>
    </>
  );
};

export default RequestCard;
