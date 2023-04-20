import { Link, Outlet } from 'react-router-dom'
import './purchase.scss'
import { useState } from 'react'
import { routesPurchasePage } from '../../constants'
export default function Purchase() {

    const [currentRouteId, setCurrentRouteId] = useState(1);
    return (
        <div className='purchase-wrapper'>
            <div className="purchase-heading">
                {routesPurchasePage.map((route) => (
                    <Link to={route.path} key={route.id} className={route.id === currentRouteId ? "purchase-heading-item active" : "purchase-heading-item"} onClick={() => setCurrentRouteId(route.id)}>
                        {route.title}
                    </Link>
                ))}
            </div>
            <div className="purchase-content">
                <Outlet />
            </div>
        </div>
    )
}
