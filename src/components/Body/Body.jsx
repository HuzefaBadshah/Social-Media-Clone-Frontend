import { Outlet } from "react-router"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body
