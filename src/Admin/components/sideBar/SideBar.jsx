import { Link, useLocation } from 'react-router-dom'
import { sideBarAdmin } from '../../../constants'
import './sideBar.scss'
import { useEffect, useState } from 'react'

export default function SideBar() {
    const location = useLocation().pathname;
    const [currentPage, setCurrentPage] = useState("dashboard")

    useEffect(() => {
        setCurrentPage(location.split("/")[3] || "")
    },[location])
    //console.log(location.split("/")[3]);
    return (
        <div className='sideBar-container'>
            <div className="sideBar-container-heading">
                Summer Admin
            </div>
            <div className="list-navlink">
                {sideBarAdmin.map((nav) => (
                    <Link
                        to={nav.path}
                        key={nav.id}
                        className={nav.path === currentPage ? "navlink-item active" : "navlink-item"}
                        onClick={() => setCurrentPage(nav.path)}
                    >
                        <nav.icon /> {nav.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}
