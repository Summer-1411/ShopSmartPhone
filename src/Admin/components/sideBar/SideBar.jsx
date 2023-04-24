import { Link } from 'react-router-dom'
import { sideBarAdmin } from '../../../constants'
import './sideBar.scss'
import { useState } from 'react'

export default function SideBar() {
    const [currentPage, setCurrentPage] = useState(1)
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
                        className={nav.id === currentPage ? "navlink-item active" : "navlink-item"}
                        onClick={() => setCurrentPage(nav.id)}
                    >
                        <nav.icon /> {nav.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}
