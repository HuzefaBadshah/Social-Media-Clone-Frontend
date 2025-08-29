import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import Loader from "../Loader/Loader";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [resetRequests, setResetRequests] = useState(true);
  async function fetchFriendRequests() {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      setFriendRequests(res.data.data);
    } catch (error) {
      console.error("Friend Requests: ", error);
    }
  }

  useEffect(() => {
    if (resetRequests) {
      fetchFriendRequests();
      setResetRequests(false);
    }
  }, [resetRequests]);

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-4xl tracking-wide">Requests:</li>
        {friendRequests.length ? (
          friendRequests.map((data, i) => (
            <RequestCard key={data._id} userData={data} count={i} setResetRequests={setResetRequests} />
          ))
        ) : (
          <Loader
            className={["self-center"]}
            failureMsg={"No Friend Requests Found!"}
          />
        )}
      </ul>
    </div>
  );
};

export default FriendRequests;
