import axios from "axios";
import Toaster from "../Toaster/Toaster";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slice/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, msg: "", isSuccess: true });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Test@12345");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {firstname, lastname, emailId: email, password},
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setToast({ show: true, msg: res.data.message });
      navigate('/profile');
    } catch (error) {
      setToast({ show: true, msg: error.message, isSuccess: false });
      setError(error.response.data);
      console.error("signup error: ", error);
    }
  }

  return (
    <>
      <Toaster {...toast} />
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl font-bold text-center mt-4">Sign Up Now!</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstname"
                className="input"
                placeholder="Your First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="input"
                placeholder="Your Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
              <button className="btn btn-neutral mt-4">Signup</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
