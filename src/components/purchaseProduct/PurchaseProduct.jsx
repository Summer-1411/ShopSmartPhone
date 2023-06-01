import { useEffect, useState } from 'react';
import React from './purchaseProduct.scss'
import axios from 'axios';
import { BASE_URL, IMAGE_LINK } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { numberWithCommas } from '../../utils/formatMoney';

export default function PurchaseProduct({ bill,cancelOrder }) {
    
    //console.log("item: ", bill);
    const [opnenCancellation, setOpnenCancellation] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProductByBill = async () => {
            const res = await axios.get(`${BASE_URL}/order_detail/${bill.id}`, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setProducts(res.data.products)
            console.log(res.data);
        }
        getProductByBill();
    }, [bill.id])

    const handleCalcellation = async () => {
        await cancelOrder(bill.id)
        setOpnenCancellation(false)
    }
    const dateString = bill.orderDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    
    return (
        <div className='purchaseProduct-wrapper'>

            {products.map(pro => (
                <div key={pro.id} className="purchaseProduct-content">
                    <div className="purchaseProduct-content-left">
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
                    <div className="purchaseProduct-content-right">
                        <div className="price-product">
                            {numberWithCommas(pro.price)}
                        </div>
                    </div>
                </div>
            ))}
            <div className="checkout-product">
                <div className="checkout-product-left">
                    <div className="name-customer">
                        {bill.fullname}
                    </div>
                    <div className="phone-number">
                        {bill.phone}
                    </div>
                    <div className="delivery-address">
                        {bill.shipping_address}
                    </div>
                    <div className="date-order">
                        <div className="title">Ngày đặt :</div>
                        <div className="date-value">{formattedDate}</div>
                    </div>
                    <div className="date-order">
                        <div className="title">Ghi chú :</div>
                        <div className="date-value">{bill.note}</div>
                    </div>
                </div>
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            {numberWithCommas(bill.total_amount)}
                        </div>
                    </div>
                </div>
            </div>
            {bill.status === 0 && (<div className="purchaseProduct-bottom">
                <div className="btn-delete" onClick={() => setOpnenCancellation(true)}>
                    Huỷ đơn
                </div>
            </div>)}
            {bill.status === -2 && (<div className="purchaseProduct-bottom">
                <div className="order-reason">
                    Đơn hàng của bạn đã bị huỷ vì lý do {bill.reason}, xin vui lòng thử lại !
                </div>
            </div>)}
            {opnenCancellation &&
                <div className="wrapper-cancel" onClick={() => setOpnenCancellation(false)}>
                    <div className="cancel-container" onClick={(e) => { e.stopPropagation() }} >
                        <div className="cancel-heading">
                            Bạn có chắc chắn muốn huỷ đơn hàng này <SentimentVeryDissatisfiedIcon />
                        </div>
                        <div className="cancel-content">
                            <div className="btn btn-agree" onClick={handleCalcellation}>
                                Đồng ý
                            </div>
                            <div className="btn btn-cancel" onClick={() => setOpnenCancellation(false)}>
                                Huỷ bỏ
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
