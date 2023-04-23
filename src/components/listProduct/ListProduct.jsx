import "./listProduct.scss"

import Product from "../product/Product";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {  useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../requestMethod";
export default function ListProduct() {
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
            const res = await axios.get(`${BASE_URL}/product?page=${currentPage}`)
            //console.log("product :", res.data.products);
            setListProduct(res.data.products)
        }
        getProducts()
    }, [currentPage])
    

    const arr = []; 
    for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
    }

    const handleChangePage = (value) => {
        if(value === "next"){
            if(currentPage < pages){
                setCurrentPage(prev => prev + 1)
            }else {
                return
            }
        }else if(value === "prev"){
            if(currentPage > 1){
                setCurrentPage(prev => prev - 1)
            }else {
                return
            }
        }else{
            setCurrentPage(value)
        }
    }
    //console.log({currentPage});
    return (
        <div className="list-products">
            <div className="products">
                {listProduct.map((pro) => (
                    <Product key={pro.id} product={pro} />
                ))}
            </div>
            <div className="pages">
                <div className="pages-content">
                    <div className="btn pre-page" onClick={() => handleChangePage("prev")}>
                        <KeyboardArrowLeftIcon />
                    </div>
                    {arr.map((page, key) => (
                        <div key={key} className={page === currentPage ? "page-number active" : "page-number"}
                            onClick={()=> handleChangePage(page)}
                        >
                            {page}
                        </div>
                    ))}
                    <div className="btn next-page" onClick={() => handleChangePage("next")}>
                        <KeyboardArrowRightIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
