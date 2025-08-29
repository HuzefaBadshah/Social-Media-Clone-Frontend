import { BrowserRouter, Routes, Route } from "react-router";
import { store } from "./store/app";
import { Provider } from 'react-redux';
import Body from "./components/Body/Body";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Feed from "./components/Feed/Feed";
import Connections from "./components/Connections/Connections";
import FriendRequests from "./components/FriendRequests/FriendRequests";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="friend-requests" element={<FriendRequests />} />
            <Route path="sign-up" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
