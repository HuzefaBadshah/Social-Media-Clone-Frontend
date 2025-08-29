import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import ConnectionCard from "./ConnectionCard";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

const Connections = () => {
  const user = useSelector((state) => state.user);
  const [connections, setConnections] = useState([]);
  async function fetchConnectins() {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnections(res?.data?.data);
    } catch (error) {
      console.error("Connections: ", error);
    }
  }

  useEffect(() => {
    fetchConnectins();
  }, []);
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {connections.length ? (
        connections.map((data) => {
          if (user._id !== data.fromUserId._id) {
            return (
              <ConnectionCard key={data._id} userData={data?.fromUserId} />
            );
          } else {
            return <ConnectionCard key={data._id} userData={data?.toUserId} />;
          }
        })
      ) : (
        <Loader className={["self-center"]} />
      )}
    </ul>
  );
};

export default Connections;
