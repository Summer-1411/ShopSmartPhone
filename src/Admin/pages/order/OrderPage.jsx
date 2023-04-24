import './orderPage.scss'
import { Link, Outlet } from 'react-router-dom'
import { routeOrderAdmin } from '../../../constants'
import { useState } from 'react'
export default function OrderPage() {
    const [currentRoute, setCurrentRoute] = useState(1)
    return (
        <div className='orderpage-wrapper'>
            <div className="orderpage-container">
                <div className="orderpage-heading">
                    {routeOrderAdmin.map(route => (
                        <Link
                            to={route.path}
                            key={route.id}
                            className={currentRoute === route.id ? "title-item active" : "title-item"}
                            onClick={() => setCurrentRoute(route.id)}
                        >
                            {route.title}
                        </Link>
                    ))}
                </div>
                <div className="orderpage-content">
                    <div className="head-table-order">
                        <div className="col-item-2">
                            Khách hàng
                        </div>
                        <div className="col-item-2">
                            Sản phẩm
                        </div>
                        <div className="col-item">
                            Mã đơn
                        </div>
                        <div className="col-item-2">
                            Ngày đặt
                        </div>
                        <div className="col-item">
                            Tổng tiền
                        </div>
                        <div className="col-item">
                        </div>
                    </div>
                    <div className="body-table-content">
                        <Outlet />
                    </div>
                </div>

            </div>
            
        </div>
    )
}
