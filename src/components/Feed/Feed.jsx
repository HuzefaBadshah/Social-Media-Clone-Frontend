import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../store/slice/feedSlice";
import Toaster from "../Toaster/Toaster";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [toast, setToast] = useState({ show: false, msg: "", isSuccess: true });

  async function getFeed() {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  }

  function renderFeedToaster(msg, isSuccess = true) {
    setToast({ show: true, msg, isSuccess });
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <Toaster show={toast.show} msg={toast.msg} isSuccess={toast.isSuccess} />
      <div className="stack stack-start size-28 w-fit h-full mb-4">
        {feed
          ? feed.map((item) => (
              <div
                key={item._id}
                className="border-base-content card bg-base-100 border text-center"
              >
                <div className="card-body">
                  <UserCard
                    userData={item}
                    renderFeedToaster={renderFeedToaster}
                  />
                </div>
              </div>
            ))
          : "Please wait while the feed is fetched..."}
      </div>
    </>
  );
};

export default Feed;
