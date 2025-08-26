import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../store/slice/userSlice";
import { Link, useNavigate } from "react-router";

const NavBar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, {withCredentials: true});
            dispatch(removeUser(null));
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-xl">Social Media Clone</Link>
            </div>
            {user && <div className="flex gap-2">
                <p className="self-center">{user?.firstname} {user?.lastname}</p>
                <div className="dropdown dropdown-end mr-7">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User pic"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={'/profile'} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={'/connections'}>My Connections</Link></li>
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default NavBar
