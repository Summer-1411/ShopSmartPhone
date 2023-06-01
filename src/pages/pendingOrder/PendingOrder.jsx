import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import PurchaseProduct from '../../components/purchaseProduct/PurchaseProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function PendingOrder() {
    const [bill, setBill] = useState([])
    const [billError, setBillError] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getBill = async () => {
            const res = await axios.get(`${BASE_URL}/order/byCustomer`, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            console.log(res.data);
            setBill(res.data.order)
            setBillError(res.data.orderError)
        }
        getBill();
    }, [])

    const cancelOrder = async (id) => {
        try {
            const res = await axios.put(`${BASE_URL}/order/cancel_by_user/${currentUser.id}`,
                {
                    id: id
                },
                {
                    headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                })
            setBill((prev) => prev.filter(order => order.id !== id))
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
        }

    }
    console.log(bill);
    return (
        <div>
            {bill.map(item => (
                <PurchaseProduct key={item.id} bill={item} cancelOrder={cancelOrder} />
            ))}
            {billError.map(item => (
                <PurchaseProduct key={item.id} bill={item} cancelOrder={cancelOrder} />
            ))}
        </div>
    )
}
