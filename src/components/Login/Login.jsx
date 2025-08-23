import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slice/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
    const [email, setEmail] = useState('scarlet@xyz.com');
    const [password, setPassword] = useState('Test@12345');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, {
                emailId: email,
                password
            },
                { withCredentials: true });

            dispatch(addUser(res.data));
            return navigate('/');
        } catch (err) {
            console.error('Error while login: ', err);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse mb-5">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Login now your friends are waiting to get connected and get ready to be part of fantastic new relationships!
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" value={email} />
                            <label className="label">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" value={password} />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
