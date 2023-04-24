import { Outlet } from "react-router-dom"
import Navbar from "../Admin/components/navbar/Navbar"
import SideBar from "../Admin/components/sideBar/SideBar"

const LayoutAdmin = () => {

    return (
        <div className="admin-wrapper">
            <div className="container-admin">
                <div className="side-bar">
                    <SideBar />
                </div>
                <div className="main">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default LayoutAdmin