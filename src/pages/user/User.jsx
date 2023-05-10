import './user.scss'

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SUMMER_SHOP, routeUserPage } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userRedux';
import { clearCart } from '../../redux/cartRedux';
import { IMAGE_DEFAULT, IMAGE_LINK } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function User() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    const location = useLocation().pathname;
    console.log(location);
    const [currentPage, setCurrentPage] = useState("profile")
    useEffect(() => {
        setCurrentPage(location.split("/")[2])
    },[location])
    const handleLogout = () => {
        toast.info("SummerMobile tạm biệt quý khách !", toastOption)
        dispatch(logout());
        dispatch(clearCart());
        localStorage.removeItem(SUMMER_SHOP)
    }
    return (
        <div className='user-wrapper'>
            <div className="left-user">
                <div className="heading-left">
                    <img src={currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`} alt="" className="avatar-user" />
                    <div className="username">{currentUser.username}</div>
                </div>
                <div className="content-left">
                    {routeUserPage.map((route) => {
                        return (
                            <Link
                                key={route.id}
                                to={route.path}
                                className={route.path === currentPage ? "item-content active" : "item-content"}
                                onClick={() => setCurrentPage(route.path)}
                            >
                                <div className="item-icon">
                                    <route.icon />
                                </div>
                                <div className="item-title">
                                    {route.title}
                                </div>
                            </Link>
                        )
                    })}
                    
                    <div className="item-content" onClick={handleLogout}>
                        <div className="item-icon">
                            <ExitToAppOutlinedIcon />
                        </div>
                        <div className="item-title">
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-user">
                <Outlet />
            </div>
        </div>
    )
}
