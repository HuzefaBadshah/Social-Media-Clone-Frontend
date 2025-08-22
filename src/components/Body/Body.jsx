import { Outlet } from "react-router"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
