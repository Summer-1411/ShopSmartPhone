import "./listProduct.scss"

import Product from "../product/Product";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {  useState } from "react";
export default function ListProduct() {
    const products = [
        {
            id: 1,
            name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
            price: "27.490.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png"
        },
        {
            id: 2,
            name: "iPhone 11 64GB I Chính hãng VN/A ",
            price: "10.890.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_225.jpg"
        },
        {
            id: 3,
            name: "Samsung Galaxy S23 Ultra 256GB",
            price: "26.990.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/2/s23-ultra-tim.png"
        },
        {
            id: 4,
            name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
            price: "25.690.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
        },
        {
            id: 5,
            name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
            price: "27.490.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png"
        },
        {
            id: 6,
            name: "iPhone 11 64GB I Chính hãng VN/A ",
            price: "10.890.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_225.jpg"
        },
        {
            id: 7,
            name: "Samsung Galaxy S23 Ultra 256GB",
            price: "26.990.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/2/s23-ultra-tim.png"
        },
        {
            id: 8,
            name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
            price: "25.690.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
        },
        {
            id: 9,
            name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A iPhone 14 Pro Max 128GB | Chính hãng VN/A",
            price: "27.490.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png"
        },
        {
            id: 10,
            name: "iPhone 11 64GB I Chính hãng VN/A ",
            price: "10.890.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_225.jpg"
        },
        {
            id: 11,
            name: "Samsung Galaxy S23 Ultra 256GB",
            price: "26.990.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/2/s23-ultra-tim.png"
        },
        {
            id: 12,
            name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
            price: "25.690.000 ",
            img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg"
        },
    ]
    //const pages = 5;
    const length = 10; // độ dài của mảng
    const arr = []; // khởi tạo mảng rỗng
    const [currentPage, setCurrentPage] = useState(1)
    for (let i = 0; i < length; i++) {
        arr.push(i + 1); // thêm số tự nhiên vào mảng
    }

    // console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const handleChangePage = (value) => {
        if(value === "next"){
            if(currentPage < length){
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
    console.log({currentPage});
    return (
        <div className="list-products">
            <div className="products">
                {products.map((pro) => (
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
                    {/* <div className="page-number active">
                        1
                    </div>
                    
                    <div className="page-number">
                        3
                    </div>
                    <div className="page-number">
                        4
                    </div> */}
                    <div className="btn next-page" onClick={() => handleChangePage("next")}>
                        <KeyboardArrowRightIcon />
                    </div>
                </div>

            </div>
        </div>
    )
}
