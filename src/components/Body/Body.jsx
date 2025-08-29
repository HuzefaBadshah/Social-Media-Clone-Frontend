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
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        return navigate('/login');
      }
      console.error(error);
    }
  }

  useEffect(() => {
    !user && fetchProfile();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
