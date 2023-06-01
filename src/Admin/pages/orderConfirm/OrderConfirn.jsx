import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { SUMMER_SHOP } from '../../../constants'
export default function OrderConfirn() {
    const [listOrderConfirm, setListOrderConfirm] = useState([])
    useEffect(() => {
        const getListOrderConfirm = async () => {
            const res = await axios.get(`${BASE_URL}/order/byAdmin?confirm=true`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            setListOrderConfirm(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderConfirm();
    }, [])
    const sumTotal = listOrderConfirm.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderConfirm.map(order => (
                <OrderItem key={order.id} order={order} setListOrderConfirm={setListOrderConfirm} success/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
