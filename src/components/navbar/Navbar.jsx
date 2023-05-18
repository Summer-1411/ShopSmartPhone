import "./navbar.scss"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import 'react-toastify/dist/ReactToastify.css';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL, IMAGE_DEFAULT, IMAGE_LINK } from "../../requestMethod";
import axios from "axios";
import { ProductFilterContext } from "../../context/productFilterContext";
import { toast } from "react-toastify";
import { toastOption } from "../../constants";
import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from '../../hooks/useDebounce'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function NavBar() {
    const { productFilter, setProductFilter } = useContext(ProductFilterContext)
    const currentUser = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart)
    //console.log({cart});
    const [openOption, setOpenOption] = useState(false)
    const [category, setCategory] = useState("All category");
    const handleClickOption = (category) => {
        setCategory(category.name);
        setProductFilter(prev => ({ category: category.id, producer: null }))
        setOpenOption(false);
    }
    const [listCategory, setListCategory] = useState([])
    const [name, setName] = useState("")
    const [resultSearch, setResultSearch] = useState([])
    const [isShow, setIsShow] = useState(true)
    const [loading, setLoading] = useState(false);
    let debounced = useDebounce(name, 500);
    const inputRef = useRef()
    useEffect(() => {
        if (!debounced.trim()) {
            setResultSearch([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${BASE_URL}/product/search?name=` + name)
            console.log(result.data);
            setResultSearch(result.data.products)
            setLoading(false);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setName(searchValue);
        }
    };
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
    const handleHideResult = () => {
        setIsShow(false);
    };
    const handleClear = () => {
        setName('');
        setResultSearch([]);
        inputRef.current.focus();
    };
    const handleToAdmin = () => {
        toast.success("Bạn đã đăng nhập với vai trò Admin", toastOption)
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
                    <HeadlessTippy
                        visible={resultSearch.length > 0 && isShow}
                        interactive
                        render={(attrs) => (
                            <div className="result-searrch" tabIndex="-1" {...attrs}>
                                {resultSearch.map((pro) => (
                                    <Link to={`/product/${pro.id}`} key={pro.id} className="productSearch-item" onClick={handleClear}>
                                        <img className="productSearch-item-img" src={`${IMAGE_LINK}/${pro.img}`} alt="" />
                                        <span className="productSearch-item-name">{pro.name}</span>
                                    </Link>
                                ))}

                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <div className="search">
                            <div className="selection">
                                <div onClick={() => { openOption ? setOpenOption(false) : setOpenOption(true) }} className="selection-title">
                                    {productFilter.category ? category : "Tất cả"} <KeyboardArrowDownIcon className={openOption ? "icon-category open-option" : "icon-category"} />
                                </div>
                                <div className={openOption ? "option open" : "option"}>
                                    <div className="option-item" onClick={() => handleClickOption({ name: "All Category", id: null })}>
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
                            <input
                                placeholder="Search...."
                                value={name}
                                onChange={handleChange}
                                onFocus={() => setIsShow(true)}
                                ref={inputRef}
                            />
                            {!!name && !loading && (
                                <ClearOutlinedIcon className="clear" onClick={handleClear} />
                            )}
                            {loading && (
                                <RotateRightOutlinedIcon className="loading" />
                            )}
                        </div>
                    </HeadlessTippy>
                </div>
                <div className="right">
                    {currentUser.isAdmin === 1 &&
                        <Link to={"/2020606605/admin"} className="icon-cart" onClick={handleToAdmin}>
                            Admin
                        </Link>
                    }
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
