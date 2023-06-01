import { useEffect, useState } from 'react';
import './orderItem.scss'
import axios from 'axios';
import { BASE_URL, IMAGE_LINK } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import { numberWithCommas } from '../../utils/formatMoney';
import { formatDate } from '../../utils/formatDate';
export default function OrderItem({ order }) {
    //console.log("Item:", order);
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductByBill = async () => {
            const res = await axios.get(`${BASE_URL}/order_detail/${order.id}`, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setProducts(res.data.products)
            console.log(res.data);
        }
        getProductByBill();
    }, [order.id])

    return (
        <div className='orderItem-wrapper'>
            {products.map(pro => (
                <div key={pro.id} className="orderItem-content">
                    <div className="orderItem-content-left">
                        <img src={`${IMAGE_LINK}/${pro.img}`} alt="" className="img-product" />
                        <div className="infor-product">
                            <div className="name-product">{pro.name}</div>
                            <div className="filter-product">
                                Phân loại: {pro.size}, {pro.color}
                            </div>
                            <div className="quantity-product">
                                x{pro.quantity}
                            </div>
                        </div>
                    </div>
                    <div className="orderItem-content-right">
                        <div className="price-product">
                            {numberWithCommas(pro.price)}
                        </div>
                    </div>
                </div>

            ))}
            <div className="checkout-product">
                <div className="checkout-product-left">
                    <div className="name-customer">
                        {order.fullname}
                    </div>
                    <div className="phone-number">
                        {order.phone}
                    </div>
                    <div className="delivery-address">
                        {order.shipping_address}
                    </div>
                    <div className="date-order">
                        <div className="title">Ngày đặt : </div>
                        <div className="date-value">{formatDate(order.orderDate)}</div>
                    </div>
                </div>
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            {numberWithCommas(order.total_amount)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
