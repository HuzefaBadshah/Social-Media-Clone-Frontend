import axios from "axios";
import React from "react";
import { removeFeed } from "../../store/slice/feedSlice";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const UserCard = ({ userData, renderFeedToaster }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    _id: toUserId,
    firstname,
    lastname,
    age,
    gender,
    photoURL,
    skills,
  } = userData;

  async function requestHandler(status) {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      renderFeedToaster(res.data.message);
      dispatch(removeFeed(toUserId));
    } catch (error) {
      renderFeedToaster(error.message, false);
      console.error("Request Error: ", error);
    }
  }
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt={`${firstname}'s photo`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstname} ${lastname}`}</h2>
        <p>Skills: {Array.isArray(skills) ? skills.join(", ") : ""}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        {(user._id !== toUserId && toUserId) && <div className="card-actions justify-end">
          <button
            onClick={() => requestHandler("interested")}
            className="btn btn-primary bg-green-400 text-amber-100"
          >
            Connect
          </button>
          <button
            onClick={() => requestHandler("ignored")}
            className="btn btn-primary bg-red-500 text-amber-100"
          >
            Ignore
          </button>
        </div>}
      </div>
    </div>
  );
};

export default UserCard;
