import { Link, useLocation } from 'react-router-dom'
import { SUMMER_SHOP, sideBarAdmin, toastOption } from '../../../constants'
import './sideBar.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userRedux';
import { clearCart } from '../../../redux/cartRedux';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export default function SideBar() {
    const dispatch = useDispatch()
    const location = useLocation().pathname;
    const [currentPage, setCurrentPage] = useState("dashboard")

    useEffect(() => {
        setCurrentPage(location.split("/")[3] || "")
    }, [location])
    const handleLogout = () => {
        toast.info("Bạn đã đăng xuất thành công !", toastOption)
        dispatch(logout());
        dispatch(clearCart());
        localStorage.removeItem(SUMMER_SHOP)
    }
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
                <Link
                    to="/"
                    className="exit-admin"
                >
                    <HighlightOffIcon /> Thoát Admin
                </Link>
                <div
                    className="btn-logout"
                    onClick={handleLogout}
                >
                    <ExitToAppOutlinedIcon /> Đăng xuất
                </div>
            </div>
        </div>
    )
}
