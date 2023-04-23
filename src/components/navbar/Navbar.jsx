import "./navbar.scss"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMAGE_DEFAULT, IMAGE_LINK } from "../../requestMethod";


export default function NavBar() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart)
    //console.log({cart});
    const [openOption, setOpenOption] = useState(false)
    const [category, setCategory] = useState("All category");
    const handleClickOption = (value) => {
        setCategory(value);
        setOpenOption(false);
    }
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
                                {category} <KeyboardArrowDownIcon className={openOption ? "icon-category open-option" : "icon-category"} />

                            </div>
                            <div className={openOption ? "option open" : "option"}>
                                <div className="option-item" onClick={() => handleClickOption("All Category")}>
                                    All Category
                                </div>
                                <div className="option-item" onClick={() => handleClickOption("Android")}>
                                    Android
                                </div>
                                <div className="option-item" onClick={() => handleClickOption("iPhone (IOS)")}>
                                    iPhone (IOS)
                                </div>
                                <div className="option-item" onClick={() => handleClickOption("Khac")}>
                                    Khac
                                </div>
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
