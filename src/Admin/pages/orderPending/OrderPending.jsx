import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { SUMMER_SHOP } from '../../../constants'

export default function OrderPending() {
    const [listOrderPending, setListOrderPending] = useState([])
    useEffect(() => {
        const getListOrderPending = async () => {
            const res = await axios.get(`${BASE_URL}/order/byAdmin`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            setListOrderPending(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderPending();
    }, [])
    const sumTotal = listOrderPending.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderPending.map(order => (
                <OrderItem key={order.id} order={order} setListOrderPending={setListOrderPending} confirm cancel/>
            ))}
            <BottomOrder sumTotal ={sumTotal}/>
        </div>
    )
}
