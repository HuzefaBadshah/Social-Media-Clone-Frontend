import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/slice/userSlice";

const Profile = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, { firstname, lastname, gender, age, photoURL, skills: Array.isArray(skills) ? skills : skills.split(',') }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    } catch (error) {
      setError(error?.response?.data);
      console.error('profile error: ', error);
    }
  }
  return (
    <>
      {toast && <div className="toast toast-top toast-center z-51">
        <div className="alert alert-success">
          <span>User saved successfully!</span>
        </div>
      </div>}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-4">Edit Profile</h1>
            <UserCard userData={{ firstname, lastname, gender, age, photoURL, skills }} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Firstname</label>
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className="input" placeholder="Firstname" />

                <label className="label">Lastname</label>
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="input" placeholder="Lastname" />

                <label className="label">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="input" placeholder="Age" />

                <label className="label">Gender</label>
                <select value={gender} onChange={(e) => { setGender(e.target.value) }} className="select select-primary">
                  <option disabled={true}>Select Gender</option>
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                  <option value={'others'}>Others</option>
                </select>

                <label className="label">Photo URL</label>
                <input value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} type="text" className="input" placeholder="Photo URL" />

                <label className="label">Skills</label>
                <textarea value={skills} onChange={(e) => setSkills(e.target.value)} className="textarea" placeholder="eg: ['angular', 'react.js', 'node.js', etc...]"></textarea>
                <p className="text-red-500">{error}</p>
                <button className="btn btn-neutral mt-4">Edit Changes</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile;
