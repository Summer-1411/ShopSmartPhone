
import React, { useContext, useEffect, useState } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ProductItem from '../../components/productItem/ProductItem';
import axios from 'axios';
import { BASE_URL } from '../../../requestMethod';
import { SUMMER_SHOP } from '../../../constants';
import { countProductDeletedContext } from '../../../context/countProductDeleted';
import './listProduct.scss'
export default function ListProduct() {
    const { setCountDeleted } = useContext(countProductDeletedContext)
    const [listProduct, setListProduct] = useState([])
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        const getNumberPage = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/product/page`)
                setPages(res.data[0].numPages)
            } catch (error) {
                console.log(error);
            }
        }
        getNumberPage()
    }, [])
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`${BASE_URL}/product/byAdmin?page=${currentPage}`,{
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setListProduct(res.data.products)
        }
        getProducts()
    }, [currentPage])


    const arr = [];
    for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
    }
    const handleChangePage = (value) => {
        if (value === "next") {
            if (currentPage < pages) {
                setCurrentPage(prev => prev + 1)
            } else {
                return
            }
        } else if (value === "prev") {
            if (currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            } else {
                return
            }
        } else {
            setCurrentPage(value)
        }
    }
    const handleDeleteProductItem = async (id) => {
        setListProduct(prev => prev.filter((pro) => pro.id !== id))
        setCountDeleted(prev => prev + 1)
        const res = await axios.put(`${BASE_URL}/product/delete/${id}`,{},
        {
            headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
        })
        console.log(res.data);
    }
    return (
        <div className='listProduct-admin-wrapper'>
            <h1>Danh sách sản phẩm</h1>
            <div className="productAdmin-body">
                <div className="head-table-productAdmin">
                    <div className="col-item">
                        ID
                    </div>
                    <div className="col-item-2">
                        Tên sản phẩm
                    </div>
                    <div className="col-item">
                        Loại sản phẩm
                    </div>
                    <div className="col-item">
                        Hãng sản xuất
                    </div>
                    <div className="col-item">
                        Tầm giá
                    </div>
                    <div className="col-item">
                        Ngày tạo
                    </div>
                    <div className="col-item-2">
                        Thao tác
                    </div>
                </div>
                <div className="body-table-productAdmin">
                    {listProduct.map((pro) => (
                        <ProductItem key={pro.id} view remove edit product={pro} handleDeleteProductItem={handleDeleteProductItem} />
                    ))}
                </div>
            </div>
            <div className="productAdmin-bottom">
                <div className="productAdmin-pages">
                    <div className="btn btn-prev-page" onClick={() => handleChangePage("prev")}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                    <div className="page-list">
                        {arr.map((page, index) => (
                            <div
                                key={index}
                                className={page === currentPage ? "page-item active" : "page-item"}
                                onClick={() => handleChangePage(page)}
                            >
                                {page}
                            </div>
                        ))}

                    </div>
                    <div className="btn btn-next-page" onClick={() => handleChangePage("next")}>
                        <KeyboardDoubleArrowRightIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
