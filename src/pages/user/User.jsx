import './user.scss'

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { routeUserPage } from '../../constants';
export default function User() {
    
    const [currentRouteId, setCurrentRouteId] = useState(1)
    return (
        <div className='user-wrapper'>
            <div className="left-user">
                <div className="heading-left">
                    <img src="https://i.pinimg.com/originals/32/b1/64/32b164c689fb0bd5673170c768653ec9.jpg" alt="" className="avatar-user" />
                    <div className="username">Le Van Tung</div>
                </div>
                <div className="content-left">
                    {routeUserPage.map((route) => {
                        return (
                            <Link
                                key={route.id}
                                to={route.path}
                                className={route.id === currentRouteId ? "item-content active" : "item-content"}
                                onClick={() => setCurrentRouteId(route.id)}
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
                    
                    <div className="item-content">
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
