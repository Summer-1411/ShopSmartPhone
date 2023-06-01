import { useEffect, useState } from 'react'

import './order.scss'
import ProductCheckout from '../../components/productCheckout/ProductCheckout'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
import { numberWithCommas } from '../../utils/formatMoney';

export default function Order() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const [inforAddressShip, setInforAddressShip] = useState({
        listProvince: [],
        listDistrict: [],
        listWard: [],

        province: null,
        district: null,
        ward: null,
    })
    const [openItem, setOpenItem] = useState({
        openSelectProvince: false,
        openSelectDistrict: false,
        openSelectWard: false,
    })
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [customer, setCustomer] = useState({
        fullname: "",
        phone: "",
        note: ""
    })
    const [methodShip, setMethodShip] = useState("Giao hàng tận nơi")
    // console.log("customer: ", customer);
    // console.log("methodShip: ", methodShip);
    useEffect(() => {
        const getProvinces = () => {
            fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setInforAddressShip(prev => ({ ...prev, listProvince: dt.data }))
                    //setListProvince(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getProvinces()
    }, [])

    useEffect(() => {
        const getDistricts = () => {
            inforAddressShip.province && fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${inforAddressShip.province.code}&limit=-1`)
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setInforAddressShip(prev => ({ ...prev, listDistrict: dt.data }))
                    //setListDistrict(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getDistricts()
    }, [inforAddressShip.province])

    useEffect(() => {
        const getWards = () => {
            inforAddressShip.district && fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${inforAddressShip.district.code}&limit=-1`)
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setInforAddressShip(prev => ({ ...prev, listWard: dt.data }))
                    //setListWard(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getWards();
    }, [inforAddressShip.district])

    // useEffect(() => {
    //     inforAddressShip.ward && addressDetail ? setAddress(`${addressDetail}, ${inforAddressShip.ward.path_with_type}`) : setAddress("");
    // }, [inforAddressShip.ward, addressDetail]);
    useEffect(() => {
        addressDetail && setAddress(`${addressDetail}`);
    }, [addressDetail]);

    //console.log(address);


    const handleOpenListProvince = () => {
        setOpenItem(prev => ({
            ...prev,
            openSelectProvince: !prev.openSelectProvince,
            openSelectDistrict: false,
            openSelectWard: false
        }))
    }
    const handleOpenListDistrict = () => {
        setOpenItem(prev => ({
            ...prev,
            openSelectDistrict: !prev.openSelectDistrict,
            openSelectProvince: false,
            openSelectWard: false
        }))
    }
    const handleOpenListWard = () => {
        setOpenItem(prev => ({
            ...prev,
            openSelectWard: !prev.openSelectWard,
            openSelectDistrict: false,
            openSelectProvince: false
        }))
    }

    const handleSelectProvince = (pro) => {
        setInforAddressShip(prev => ({
            ...prev,
            province: pro,
            district: null,
            ward: null,
            listDistrict: [],
            listWard: []
        }))
        //setProvince(pro)
        setOpenItem(prev => ({
            ...prev,
            openSelectProvince: false
        }))
    }
    const handleSelectDistrict = (dis) => {
        setInforAddressShip(prev => ({
            ...prev,
            district: dis,
            ward: null,
            listWard: []
        }))
        setOpenItem(prev => ({
            ...prev,
            openSelectDistrict: false
        }))
    }
    const handleSelectWard = (ward) => {
        setInforAddressShip(prev => ({
            ...prev,
            ward: ward,
        }))
        setOpenItem(prev => ({
            ...prev,
            openSelectWard: false
        }))
    }
    const handleChange = (e) => {
        setCustomer(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    let checkCondition = () => {
        if (!customer.fullname || !customer.phone) {
            toast.error('Bạn vui lòng nhập tên và số điện thoại !', toastOption);
            return false
        } else {
            if (!address) {
                toast.error('Vui lòng chọn địa chỉ giao hàng !', toastOption);
                return false
            }
        }
        return true
    }
    //console.log("products: ", cart.products);
    const handleOrder = async () => {
        let check = checkCondition();
        if (check) {
            try {
                const res = await axios.post(`${BASE_URL}/order`,
                    {
                        fullname: customer.fullname,
                        phone: customer.phone,
                        address: address,
                        methodShip: methodShip,
                        note: customer.note,
                        total: cart.total,
                        products: [...cart.products]
                    },
                    {
                        headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                    })
                toast.success(res.data.message, toastOption);
                dispatch(clearCart());
                const clearCartCurrentUser = await axios.delete(`${BASE_URL}/cart/clear`, {
                    headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                })
                console.log({ res, clearCartCurrentUser });

                navigate("/user/purchase")

            } catch (error) {
                toast.error(error.response.data.message, toastOption);
            }

        }
    }
    return (
        <div className='order-wrapper'>
            <div className="order-heading">
                Đặt hàng
            </div>
            <div className="order-user">
                <div className="order-user-heading">
                    Thông tin khách hàng
                </div>
                <div className="user-infor">
                    <div className="user-infor-item">
                        <input
                            type="text"
                            name='fullname'
                            placeholder='Họ tên'
                            value={customer.fullname}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="user-infor-item">
                        <input
                            type="text"
                            name='phone'
                            placeholder='Số điện thoại'
                            value={customer.phone}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

            </div>
            <div className="order-address">
                <div className="order-address-heading">
                    Địa chỉ nhận hàng
                </div>
                <div className="address-infor">
                    <div className="address-infor-item">
                        <div className="title-address" onClick={handleOpenListProvince}>
                            {inforAddressShip.province ? inforAddressShip.province.name : "Tỉnh/Thành phố"}
                        </div>
                        {openItem.openSelectProvince &&
                            <div className="list-option">
                                {inforAddressShip.listProvince && inforAddressShip.listProvince.map((pro) => (
                                    <div
                                        key={pro._id}
                                        className="option-item"
                                        onClick={() => handleSelectProvince(pro)}
                                    >
                                        {pro.name}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="address-infor-item">
                        <div className="title-address" onClick={handleOpenListDistrict}>
                            {inforAddressShip.district ? inforAddressShip.district.name_with_type : "Quận/Huyện"}
                        </div>
                        {openItem.openSelectDistrict &&
                            <div className="list-option">
                                {inforAddressShip.listDistrict && inforAddressShip.listDistrict.map((dis) => (
                                    <div
                                        key={dis._id}
                                        className="option-item"
                                        onClick={() => handleSelectDistrict(dis)}
                                    >
                                        {dis.name_with_type}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="address-infor-item">
                        <div className="title-address" onClick={handleOpenListWard}>
                            {inforAddressShip.ward ? inforAddressShip.ward.name_with_type : "Phường/Xã"}
                        </div>
                        {openItem.openSelectWard &&
                            <div className="list-option">
                                {inforAddressShip.listWard && inforAddressShip.listWard.map((ward) => (
                                    <div
                                        key={ward._id}
                                        className="option-item"
                                        onClick={() => handleSelectWard(ward)}
                                    >
                                        {ward.name_with_type}
                                    </div>
                                ))}
                            </div>
                        }

                    </div>
                </div>
                <div className="address-detail">
                    <input
                        type="text"
                        className="input-address-detail"
                        placeholder='Địa chỉ cụ thể'
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                    />
                </div>
            </div>
            <div className="method-checkout">
                <div className="checkout-item">
                    <div className="item">
                        <div className="title-item">Cách thức thanh toán :</div>
                        <div className="value-item">Thanh toán khi nhận hàng</div>
                    </div>
                    <div className="item">
                        <div className="title-item">Cách thức giao hàng :</div>
                        <select name="address-shipping" id="" className='select-option' onClick={(e) => setMethodShip(e.target.value)}>
                            <option value={"Giao hàng tận nơi"}>Giao hàng tận nơi</option>
                            <option value={"Nhận tại cửa hàng"}>Nhận tại cửa hàng</option>

                        </select>

                    </div>
                </div>
                <div className="wrapper-node">
                    <input
                        type="text"
                        className="input-text-node"
                        placeholder='Ghi chú...'
                        name='note'
                        value={customer.note}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            <div className="order-product">
                {cart.products.map(pro => (
                    <ProductCheckout product={pro} key={uuidv4()} />
                ))}
            </div>
            <div className="checkout-product">
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            {numberWithCommas(cart.total)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-bottom">
                <div className="btn-submit" onClick={handleOrder}>
                    Đặt hàng
                </div>
            </div>
        </div>
    )
}
