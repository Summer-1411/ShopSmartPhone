import React, { useContext, useEffect } from 'react'
import './productPage.scss'
import axios from 'axios';
import { BASE_URL } from '../../../requestMethod';
import { SUMMER_SHOP } from '../../../constants';
import { Link, Outlet } from 'react-router-dom';
import { countProductDeletedContext } from '../../../context/countProductDeleted';

export default function ProductPage() {
    const { countDeleted, setCountDeleted } = useContext(countProductDeletedContext)
    console.log(countDeleted);
    useEffect(() => {
        const getCountProductDeleted = async () => {
            const res = await axios.get(`${BASE_URL}/product/count/deleted`, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setCountDeleted(res.data.count.numberDeleted)
        }
        getCountProductDeleted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='productAdmin-wrapper'>
            <div className="productAdmin-heading">
                <Link to="" className="link-item heading-title">Danh sách sản phẩm</Link>
                <Link to="new-product" className="link-item add-product">
                    Thêm sản phẩm
                </Link>
                <Link to="deleted-product" className="link-item user-deleted">
                    Đã xoá {`(${countDeleted})`}
                </Link>
            </div>
            <>
                <Outlet />
            </>
        </div>
    )
}
