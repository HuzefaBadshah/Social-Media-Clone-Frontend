import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body/Body";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
