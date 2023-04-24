import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../requestMethod'
import { SUMMER_SHOP } from '../../constants'
import OrderItem from '../../components/orderItem/OrderItem'

export default function CompletedOrder() {
    const [orderItem,setOrderItem] = useState([])
    useEffect(() => {
        const getOrderItem = async () => {
            const res = await axios.get(`${BASE_URL}/order/byCustomer?success=true`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            setOrderItem(res.data.order)
        }
        getOrderItem();
    }, [])
    return (
        <div>
            {
                orderItem.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))
            }
        </div>
    )
}
