import React, { useEffect, useState } from 'react'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import OrderItem from '../../components/orderItem/OrderItem'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { SUMMER_SHOP } from '../../../constants'

export default function OrderRefuse() {
    const [listOrderRefuse, setListOrderRefuse] = useState([])
    useEffect(() => {
        const getListOrderRefuse = async () => {
            const res = await axios.get(`${BASE_URL}/order/byAdmin?refuse=true`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            setListOrderRefuse(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderRefuse();
    }, [])
    const sumTotal = listOrderRefuse.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderRefuse.map(order => (
                <OrderItem key={order.id} order={order} setListOrderRefuse={setListOrderRefuse} undo/>
            ))}
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
