import { useEffect, useState } from 'react'

import './order.scss'
import ProductCheckout from '../../components/productCheckout/ProductCheckout'

export default function Order() {
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()

    const [openSelectProvince, setOpenSelectProvince] = useState(false)
    const [openSelectDistrict, setOpenSelectDistrict] = useState(false)
    const [openSelectWard, setOpenSelectWard] = useState(false)


    useEffect(() => {
        const getProvinces = () => {
            fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setListProvince(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getProvinces()
    }, [])

    useEffect(() => {
        const getDistricts = () => {
            province && fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${province.code}&limit=-1`)
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setListDistrict(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getDistricts()
    }, [province])

    useEffect(() => {
        const getWards = () => {
            district && fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${district.code}&limit=-1`)
                .then((response) => response.json())
                .then((value) => {
                    let dt = value.data
                    setListWard(dt.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        getWards();
    }, [district])

    useEffect(() => {
        ward && addressDetail ? setAddress(`${addressDetail}, ${ward.path_with_type}`) : setAddress("");
    }, [ward, addressDetail]);

    console.log({
        address
    }); 
    // console.log({
    //     addressDetail
    // });

    // console.log({
    //     province,
    //     district,
    //     ward
    // });

    const handleOpenListProvince = () => {
        setOpenSelectProvince(!openSelectProvince)
        setOpenSelectDistrict(false)
        setOpenSelectWard(false)
    }
    const handleOpenListDistrict = () => {
        setOpenSelectDistrict(!openSelectDistrict)
        setOpenSelectProvince(false)
        setOpenSelectWard(false)
    }
    const handleOpenListWard = () => {
        setOpenSelectWard(!openSelectWard);
        setOpenSelectDistrict(false)
        setOpenSelectProvince(false)
    }

    const handleSelectProvince = (pro) => {
        setProvince(pro)
        setOpenSelectProvince(false)
        setDistrict(null)
        setWard(null)

    }
    const handleSelectDistrict = (dis) => {
        setDistrict(dis)
        setOpenSelectDistrict(false)
        setWard(null)
    }
    const handleSelectWard = (ward) => {
        setWard(ward);
        setOpenSelectWard(false);
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
                        <input type="text" name='fullname' placeholder='Họ tên' />
                    </div>
                    <div className="user-infor-item">
                        <input type="text" name='phoneNumber' placeholder='Số điện thoại' />
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
                            {province ? province.name : "Tỉnh/Thành phố"}
                        </div>
                        {openSelectProvince &&
                            <div className="list-option">
                                {listProvince && listProvince.map((pro) => (
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
                            {district ? district.name_with_type : "Quận/Huyện"}
                        </div>
                        {openSelectDistrict &&
                            <div className="list-option">
                                {listDistrict && listDistrict.map((dis) => (
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
                            {ward ? ward.name_with_type : "Phường/Xã"}
                        </div>
                        {openSelectWard &&
                            <div className="list-option">
                                {listWard && listWard.map((ward) => (
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
            <div className="order-product">
                <ProductCheckout />
                <ProductCheckout />
                <ProductCheckout />
                <ProductCheckout />
                <ProductCheckout />
            </div>
            <div className="checkout-product">
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            đ18.890.000
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-bottom">
                <div className="btn-submit">
                    Đặt hàng
                </div>
            </div>
        </div>
    )
}
