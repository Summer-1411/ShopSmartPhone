import { useEffect, useRef, useState } from 'react'
import FilterItem from '../../components/filterItem/FilterItem'
import './newProduct.scss'
import axios from 'axios'
import { BASE_URL } from '../../../requestMethod'
import { v4 as uuidv4 } from 'uuid';
import HeadingFilter from '../../components/HeadingFilter/HeadingFilter'
import { SUMMER_SHOP } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../../constants'
export default function NewProduct() {
    const navigate = useNavigate()
    const [listCategory, setListCategory] = useState([])
    const [listProducer, setListProducer] = useState([])
    const [listFilter, setListFilter] = useState([])
    const [newProduct, setNewProduct] = useState({
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
    const [file, setFile] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const prevAvatar = useRef()
    const prevColor = useRef()
    const { name, description, information, priceRange, status, id_owner, id_category } = newProduct
    const { color, size, quantity, price } = filter
    const handleChange = (e) => {
        console.log(e.target.value);
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleChangeFilter = (e) => {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        prevAvatar.current = avatar
    }, [avatar])


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
    const checkConditionAddFilter = () => {
        if (!color || !size || !quantity || !price) {
            toast.error("Bạn chưa nhập đủ thông tin !", toastOption);
            return false;
        }
        let quanti = Number(quantity)
        let pric = Number(price)
        if (!Number.isInteger(quanti) || !Number.isInteger(pric)) {
            toast.error("Số lượng và giá phải là số !", toastOption);
            return false
        }
        if (quanti < 1 || pric <= 0) {
            toast.error("Đơn giá hoặc số lượng không hợp lệ !", toastOption);
            return false
        }
        if (!file) {
            toast.error("Bạn chưa chọn hình ảnh !", toastOption);
            return false;
        }
        return true;
    }
    console.log("color", color, prevColor.current)
    const handleSaveFilter = async (e) => {
        e.preventDefault()
        if (checkConditionAddFilter()) {
            if (color !== prevColor.current) {
                const data = new FormData()
                const fileName = Date.now() + file.name;
                data.append("name", fileName)
                data.append("file", file)

                filter.img = fileName
                filter.file = file
                try {
                    await axios.post(`${BASE_URL}/upload`, data)
                } catch (error) {
                    toast.error("Có lỗi trong quá trình tải upload ảnh !", toastOption);
                }
                console.log("Upload file");
            }
            filter.id = uuidv4()
            setListFilter(prev => [...prev, filter])
            toast.success("Đã thêm màu sắc, dung lượng cho sản phẩm", toastOption);
        }
        prevColor.current = color
        // setFilter({
        //     color: "",
        //     size: "",
        //     quantity: 0,
        //     price: 0
        // })
    }
    const checkConditionAddProduct = () => {
        if (!name || !priceRange) {
            toast.error("Bạn chưa nhập đủ thông tin sản phẩm !", toastOption);
            return false;
        }
        let price = Number(priceRange);
        if (!Number.isInteger(price) || price <= 0) {
            toast.error("Giá sản phẩm chưa hợp lệ !", toastOption);
            return false
        }
        if (!avatar) {
            toast.error("Bạn chưa chọn ảnh đại diện sản phẩm !", toastOption);
            return false;
        }
        if (listFilter.length === 0) {
            toast.error("Bạn chưa thêm màu sắc, dung lượng !", toastOption);
            return false;
        }
        return true;
    }
    const handleAddProduct = async (e) => {
        if (checkConditionAddProduct()) {
            //console.log({avatar});
            const data = new FormData()
            const fileName = Date.now() + avatar.name;
            data.append("name", fileName)
            data.append("file", avatar)

            newProduct.img = fileName
            try {
                await axios.post(`${BASE_URL}/upload`, data)
            } catch (error) {
                toast.error("Có lỗi trong quá trình tải upload ảnh !", toastOption);
            }
            try {
                const res = await axios.post(`${BASE_URL}/product`,
                    {
                        ...newProduct,
                        filters: [...listFilter]
                    },
                    {
                        headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                    })
                toast.success("Thêm sản phẩm thành công", toastOption);
                navigate("/2020606605/admin/products")
                console.log(res);
            } catch (error) {
                toast.error("Có lỗi trong quá trình thêm sản phẩm !", toastOption);
            }
        }
    }
    const handleDeleteFilter = (id) => {
        setListFilter(prev => prev.filter((fil) => fil.id !== id))
        toast.info("Xoá màu sắc, dung lượng thành công !", toastOption);
    }
    //console.log(listFilter);
    return (
        <div className='newProduct-wrapper'>
            <h1 className="newProduct-heading">
                Thêm mới sản phẩm
            </h1>
            <div className="newProduct-container">
                <div className="left">
                    <div className="row-item-infor">
                        <div className="row-title">
                            Tên sản phẩm*
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
                            Tầm giá*
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
                                    <option style={{padding: "10px"}} key={producer.id} value={Number(producer.id)}>{producer.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src={avatar && URL.createObjectURL(avatar)} alt="" className="img-product" />
                    <input type="file" name="" className='input-file' id="fileAvatar-newProduct" accept=".png,.jpeg,.jpg" onChange={(e) => setAvatar(e.target.files[0])} />
                    <label htmlFor="fileAvatar-newProduct">
                        <div className="btn-select-img">
                            Chọn ảnh*
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
                        <img src={file && URL.createObjectURL(file)} alt="" className="img-filter" />
                        <input type="file" name="img" id='file' accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="file">
                            <div className="btn-select-img">
                                Chọn ảnh*
                            </div>
                        </label>
                    </div>
                    <div className="item-filter">
                        <button className="btn btn-add-filter" onClick={handleSaveFilter}>Lưu lại</button>
                    </div>
                </div>
            </div>
            <div className="list-filter">
                {listFilter.length > 0 && <HeadingFilter />}
                {listFilter.map((filter) => (
                    <FilterItem key={filter.id} filter={filter} handleDeleteFilter={handleDeleteFilter} />
                ))}
            </div>
            <button className='btn-add-newProduct' onClick={handleAddProduct}>Thêm mới sản phẩm</button>
        </div>
    )
}
