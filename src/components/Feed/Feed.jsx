import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import UserCard from "../UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../store/slice/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);

  async function getFeed() {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
      <div className="stack stack-start size-28 w-fit h-full mb-4">
        {feed ? feed.map(item =>
            <div className="border-base-content card bg-base-100 border text-center">
              <div className="card-body"><UserCard key={item._id} userData={item} /></div>
            </div>) : 'Please wait while the feed is fetched...'
        }
      </div>
  );
}

export default Feed;
