import { Outlet, useNavigate } from "react-router"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/slice/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function fetchProfile() {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {withCredentials: true});
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401) {
        return navigate('/login');
      }
      console.error(error);
    }
  }

  useEffect(() => {
    !user && fetchProfile();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body
