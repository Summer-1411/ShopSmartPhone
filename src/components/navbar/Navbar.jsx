import "./navbar.scss"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL, IMAGE_DEFAULT, IMAGE_LINK } from "../../requestMethod";
import axios from "axios";
import { ProductFilterContext } from "../../context/productFilterContext";


export default function NavBar() {
    const { productFilter, setProductFilter } = useContext(ProductFilterContext)
    const currentUser = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart)
    //console.log({cart});
    const [openOption, setOpenOption] = useState(false)
    const [category, setCategory] = useState("All category");
    const handleClickOption = (category) => {
        setCategory(category.name);
        setProductFilter(prev => ({category: category.id, producer: null}))
        setOpenOption(false);
    }
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/category`)
                setListCategory(res.data.category)
            } catch (error) {
                console.log(error);
            }
        }
        getCategory()
    }, [])
    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="left">
                    <Link to="/" className="logoApp">
                        Summer Mobile
                    </Link>
                    <div>
                        <WbSunnyOutlinedIcon />
                    </div>
                    <div className="search">
                        <div className="selection">
                            <div onClick={() => { openOption ? setOpenOption(false) : setOpenOption(true) }} className="selection-title">
                                {productFilter.category ? category : "Tất cả"} <KeyboardArrowDownIcon className={openOption ? "icon-category open-option" : "icon-category"} />

                            </div>
                            <div className={openOption ? "option open" : "option"}>

                                <div className="option-item" onClick={() => handleClickOption({name: "All Category", id: null})}>
                                    Tất cả
                                </div>
                                {listCategory.map((category) => (
                                    <div key={category.id} className="option-item" onClick={() => handleClickOption(category)}>
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SearchOutlinedIcon />
                        <input placeholder="Search...." />
                    </div>
                </div>
                <div className="right">
                    <Link to={"/cart"} className="icon-cart">
                        <ShoppingCartOutlinedIcon />
                        {cart.count > 0 && (
                            <div className="quantity-cart">
                                {cart.count}
                            </div>
                        )}

                    </Link>
                    <EmailOutlinedIcon />
                    <NotificationsOutlinedIcon />
                    <Link to={"/user/profile"} className="user">
                        <img src={currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`} alt="" />
                        <span>{currentUser.username}</span>
                    </Link>

                </div>

            </div>
        </div>
    )
}
