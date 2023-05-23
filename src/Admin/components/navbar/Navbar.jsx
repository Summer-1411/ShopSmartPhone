import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useSelector } from 'react-redux';
import { BASE_URL, IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import HeadlessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function Navbar() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [name, setName] = useState("")
    const [resultSearchProduct, setResultSearchProduct] = useState([])
    const [resultSearchUser, setResultSearchUser] = useState([])
    const [isShow, setIsShow] = useState(true)
    const [loading, setLoading] = useState(false);
    let debounced = useDebounce(name, 500);
    const inputRef = useRef()
    useEffect(() => {
        if (!debounced.trim()) {
            setResultSearchProduct([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${BASE_URL}/product/search?name=` + name)
            const res = await axios.get(`${BASE_URL}/user/search?name=` + name)
            //console.log(result.data);
            console.log(result.data, res.data);
            setResultSearchProduct(result.data.products)
            setResultSearchUser(res.data.users)
            setLoading(false);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    const handleHideResult = () => {
        setIsShow(false);
    };
    const handleClear = () => {
        setName('');
        setResultSearchProduct([]);
        setResultSearchUser([])
        inputRef.current.focus();
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setName(searchValue);
        }
    };
    return (
        <div className='navbar-wrapper'>
            <HeadlessTippy
                visible={isShow && (resultSearchProduct.length > 0 || resultSearchUser.length > 0)}
                interactive
                render={(attrs) => (
                    <div className="result-searrch" tabIndex="-1" {...attrs}>
                        {resultSearchProduct.map((pro) => (
                            <Link to={`/2020606605/admin/products/detail-product/${pro.id}`} key={pro.id} className="productSearch-item" onClick={handleClear}>
                                <img className="productSearch-item-img" src={`${IMAGE_LINK}/${pro.img}`} alt="" />
                                <span className="productSearch-item-name">{pro.name}</span>
                            </Link>
                        ))}
                        {resultSearchUser.map((user) => (
                            <Link to={`/2020606605/admin/users/detail-user/${user.id}`} key={user.id} className="productSearch-item" onClick={handleClear}>
                                <img className="productSearch-item-img" src={user.avatar ? `${IMAGE_LINK}/${user.avatar}` : `${IMAGE_DEFAULT}`} alt="" />
                                <span className="productSearch-item-name">{user.username}</span>
                            </Link>
                        ))}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className="navbar-left">
                    <SearchOutlinedIcon />
                    <input type="text" className="input-admin" placeholder='Type to search...' value={name}
                        onChange={handleChange}
                        onFocus={() => setIsShow(true)}
                        ref={inputRef} />
                    {!!name && !loading && (
                        <ClearOutlinedIcon className="clear" onClick={handleClear} />
                    )}
                    {loading && (
                        <RotateRightOutlinedIcon className="loading" />
                    )}
                </div>
            </HeadlessTippy>
            <div className="navbar-right">
                <EmailOutlinedIcon />
                <div className="infor-admin">
                    <div className="name-admin">
                        {currentUser.username}
                    </div>
                    <div className="wrapper-avatar">
                        <img src={currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`} alt="" className="avatar-admin" />

                    </div>
                </div>
            </div>
        </div >
    )
}
