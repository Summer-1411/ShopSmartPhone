import React, { useEffect, useState } from 'react'
import BottomOrder from '../../components/bottomOrder/BottomOrder'
import OrderItem from '../../components/orderItem/OrderItem'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { SUMMER_SHOP } from '../../../constants'

export default function OrderSuccess() {
    const [listOrderSuccess, setListOrderSuccess] = useState([])
    useEffect(() => {
        const getListOrderSuccess = async () => {
            const res = await axios.get(`${BASE_URL}/order/byAdmin?success=true`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            setListOrderSuccess(res.data.order)
            //setBill(res.data.order)
        }
        getListOrderSuccess();
    }, [])
    const sumTotal = listOrderSuccess.reduce((value, cur) => value + cur.total_amount, 0);
    return (
        <div>
            {listOrderSuccess.map(order => (
                <OrderItem key={order.id} setListOrderSuccess={setListOrderSuccess} order={order} />
            ))}
            
            <BottomOrder sumTotal={sumTotal}/>
        </div>
    )
}
