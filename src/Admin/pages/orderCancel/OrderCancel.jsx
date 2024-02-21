import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { SUMMER_SHOP } from '../../../constants'

export default function OrderCancel() {
    const [listOrderCancel, setListOrderCancel] = useState([])
    useEffect(() => {
        const getListOrderCancel = async () => {
            const res = await axios.get(`${BASE_URL}/order/byAdmin?cancel=true`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log("Check", res.data);
            setListOrderCancel(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderCancel();
    }, [])
    const sumTotal = listOrderCancel.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderCancel.map(order => (
                <OrderItem key={order.id} order={order} setListOrderCancel={setListOrderCancel}/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
