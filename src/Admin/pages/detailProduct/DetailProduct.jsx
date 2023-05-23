import { useEffect, useRef, useState } from 'react'
import FilterItem from '../../components/filterItem/FilterItem'
import './detailProduct.scss'
import axios from 'axios'
import { BASE_URL, IMAGE_LINK } from '../../../requestMethod'
import { v4 as uuidv4 } from 'uuid';
import HeadingFilter from '../../components/HeadingFilter/HeadingFilter'
import { SUMMER_SHOP } from '../../../constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FilterItemUpdate from '../../components/filterItemUpdate/FilterItemUpdate'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../../constants'
export default function DetailProduct() {
    const location = useLocation()
    const id = location.pathname.split("/")[5];
    const navigate = useNavigate()
    // console.log(id);
    const [listCategory, setListCategory] = useState([])
    const [listProducer, setListProducer] = useState([])
    const [filters, setFilters] = useState([])
    const [product, setProduct] = useState({
        name: "",
        description: "",
        information: "",
        priceRange: 0,
        status: "",
        id_category: 1,
        id_owner: 1,
        img: ""
    })
    const [filter, setFilter] = useState({
        color: "",
        size: "",
        quantity: "",
        price: ""
    })
    const [countSold, setCountSold] = useState(0);
    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/product/detail-admin/${id}`)
                const result = await axios.get(`${BASE_URL}/stat/sold/${id}`)
                //console.log(result.data);
                setCountSold(result.data.total_quantity)
                console.log(res.data);
                setProduct({
                    ...product,
                    name: res.data.product.name,
                    description: res.data.product.description,
                    information: res.data.product.information,
                    priceRange: res.data.product.priceRange,
                    status: res.data.product.status,
                    id_category: res.data.product.id_category,
                    id_owner: res.data.product.id_owner,
                    img: res.data.product.img,
                })
                setFilters(res.data.filter)
                // setAvatar(res.data.product.img)
            } catch (error) {
                console.log(error);
            }
        }
        getProductDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/category`)
                setListCategory(res.data.category)
            } catch (error) {
                console.log(error);
            }
        }
        const getProducer = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/producer`)
                setListProducer(res.data.producer)
            } catch (error) {
                console.log(error);
            }
        }
        getProducer()
        getCategory()
    }, [])
    const [image, setImage] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const { name, description, information, priceRange, status, id_owner, img, id_category } = product
    const { color, size, quantity, price } = filter
    const prevColor = useRef()
    const handleChange = (e) => {
        console.log(e.target.value);
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleChangeFilter = (e) => {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const checkConditionAddProduct = () => {
        if (!name || !priceRange) {
            toast.error("Bạn chưa nhập đủ thông tin !", toastOption);
            return false;
        }
        let price = Number(priceRange);
        if (!Number.isInteger(price) || price <= 0) {
            toast.error("Đơn giá chưa hợp lệ !", toastOption);
            return false
        }
        return true;
    }
    const hanldeClickUpdate = async () => {
        if (checkConditionAddProduct()) {
            if (avatar) {
                //console.log({ avatar });
                const data = new FormData()
                const fileName = Date.now() + avatar.name;
                data.append("name", fileName)
                data.append("file", avatar)
                product.img = fileName
                try {
                    await axios.post(`${BASE_URL}/upload`, data)
                } catch (error) {
                    toast.error("Có lỗi trong quá trình upload ảnh !", toastOption);
                    console.log(error);
                }
            }

            console.log(product);
            try {
                await axios.put(`${BASE_URL}/product/update/${id}`, product,
                    {
                        headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                    })
                toast.success("Cập nhật thông tin sản phẩm thành công", toastOption);
                navigate("/2020606605/admin/products")
            } catch (error) {
                toast.error("Có lỗi trong quá trình cập nhật !", toastOption);
            }
        } else {
            console.log("error");
        }

    }
    const checkConditionAddFilter = () => {
        if (!color || !size || !quantity || !price) {
            toast.error("Bạn chưa nhập đủ thông tin !", toastOption);
            return false;
        }
        let quanti = Number(quantity)
        let pric = Number(price)
        if (!Number.isInteger(quanti) || !Number.isInteger(pric)) {
            toast.error("Đơn giá hoặc số lượng phải là số !", toastOption);
            return false
        }
        if (quanti < 1 || pric <= 0) {
            toast.error("Đơn giá hoặc số lượng không hợp lệ !", toastOption);
            return false
        }
        if (!image) {
            toast.error("Bạn chưa chọn ảnh theo màu sắc !", toastOption);
            return false;
        }
        return true;
    }
    const handleAddFilter = async () => {
        // const {id_pro, size, color, quantity, price, img} = req.body
        if (checkConditionAddFilter()) {
            if (color !== prevColor.current) {
                console.log("Upload file");
                const data = new FormData()
                const fileName = Date.now() + image.name;
                data.append("name", fileName)
                data.append("file", image)
                filter.img = fileName
                try {
                    await axios.post(`${BASE_URL}/upload`, data)
                } catch (error) {
                    toast.error("Có lỗi trong quá trình upload ảnh !", toastOption);
                }
            }
            filter.id_pro = id
            try {
                const res = await axios.post(`${BASE_URL}/filter`, filter,
                    {
                        headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                    })
                filter.id = res.data.id
                setFilters(prev => ([filter, ...prev]))
                toast.success("Đã thêm màu sắc, dung lượng sản phẩm", toastOption);
            } catch (error) {
                toast.error("Có lỗi trong quá trình thêm màu sắc, dung lượng !", toastOption);
            }
            prevColor.current = color
        } else {
            console.log("Error");
        }
    }
    //console.log(filter);
    const handleDeleteFilter = async (id) => {
        try {
            await axios.put(`${BASE_URL}/filter/delete/${id}`, {},
                {
                    headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                })
            setFilters(prev => prev.filter((filter) => filter.id !== id))
            toast.success("Xoá thành công ", toastOption);
        } catch (error) {
            toast.error("Có lỗi trong quá trình xoá !", toastOption);
        }
    }
    return (
        <div className='detailProduct-wrapper'>
            <div className="detailProduct-heading">
                Chi tiết sản phẩm
            </div>
            <div className="detailProduct-container">
                <div className="left">
                    <div className="row-item-infor">
                        <div className="row-title">
                            Đã bán
                        </div>
                        <div className="row-value">
                            {countSold ? countSold : 0}
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Tên sản phẩm
                        </div>
                        <div className="row-value">
                            <input
                                type="text"
                                name='name'
                                className='text-input'
                                value={name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Mô tả
                        </div>
                        <div className="row-value">
                            <textarea
                                type="text"
                                name='description'
                                value={description}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Thông tin
                        </div>
                        <div className="row-value">
                            <textarea
                                type="text"
                                name='information'
                                value={information}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Tầm giá
                        </div>
                        <div className="row-value">
                            <input
                                type="text"
                                name='priceRange'
                                value={priceRange}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Trạng thái
                        </div>
                        <div className="row-value">
                            <input
                                type="text"
                                className='text-input'
                                name='status'
                                value={status}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Loại sản phẩm
                        </div>
                        <div className="row-value">
                            <select
                                name="id_category"
                                id="category"
                                value={id_category}
                                onChange={(e) => handleChange(e)}
                                className='select-element'
                            >
                                {listCategory.map((category) => (
                                    <option key={category.id} value={Number(category.id)}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row-item-infor">
                        <div className="row-title">
                            Nhà sản xuất
                        </div>
                        <div className="row-value">
                            <select
                                name="id_owner"
                                id="category"
                                value={id_owner}
                                onChange={(e) => handleChange(e)}
                                className='select-element'
                            >
                                {listProducer.map((producer) => (
                                    <option key={producer.id} value={Number(producer.id)}>{producer.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src={avatar ? URL.createObjectURL(avatar) : `${IMAGE_LINK}/${img}`} alt="" className="img-product" />
                    <input type="file" name="" className='input-file' id="fileAvatar-detailProduct" accept=".png,.jpeg,.jpg" onChange={(e) => setAvatar(e.target.files[0])} />
                    <label htmlFor="fileAvatar-detailProduct">
                        <div className="btn-select-img">
                            Chọn ảnh
                        </div>
                    </label>
                </div>
            </div>

            <div className="newFilter-product">
                <div className="newFilter-product-container">
                    <div className="item-filter">
                        <input
                            type="text"
                            placeholder='Màu sắc'
                            name='color'
                            value={color}
                            onChange={(e) => handleChangeFilter(e)}
                        />
                    </div>
                    <div className="item-filter">
                        <input
                            type="text"
                            placeholder='Dung lượng'
                            name='size'
                            value={size}
                            onChange={(e) => handleChangeFilter(e)}
                        />
                    </div>
                    <div className="item-filter">
                        <input
                            type="text"
                            placeholder='Số lượng có'
                            name='quantity'
                            value={quantity}
                            onChange={(e) => handleChangeFilter(e)}
                        />
                    </div>
                    <div className="item-filter">
                        <input
                            type="text"
                            placeholder='Đơn giá'
                            name='price' value={price}
                            onChange={(e) => handleChangeFilter(e)}
                        />
                    </div>
                    <div className="item-filter-img">
                        <img src={image && URL.createObjectURL(image)} alt="" className="img-filter" />
                        <input type="file" name="img" id='image-filter' accept=".png,.jpeg,.jpg" onChange={(e) => setImage(e.target.files[0])} />
                        <label htmlFor="image-filter">
                            <div className="btn-select-img">
                                Chọn ảnh
                            </div>
                        </label>
                    </div>
                    <div className="item-filter">
                        <button className="btn btn-add-filter" onClick={handleAddFilter}>Thêm mới</button>
                    </div>
                </div>
                <h1>Danh sách màu sắc, dung lượng sản phẩm</h1>
                <HeadingFilter />
                {filters.map((ft) => (
                    <FilterItemUpdate key={ft.id} filterProduct={ft} handleDeleteFilter={handleDeleteFilter} />
                ))}
            </div>
            <button className='btn btn-updateProduct' onClick={hanldeClickUpdate}>Cập nhật</button>
            <Link className='btn btn-exit' to={"/2020606605/admin/products"}>Thoát</Link>
        </div>
    )
}
