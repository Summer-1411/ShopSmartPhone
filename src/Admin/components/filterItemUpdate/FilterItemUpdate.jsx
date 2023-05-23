import { useEffect, useState } from 'react'
import './filterItemUpdate.scss'
import { BASE_URL, IMAGE_LINK } from '../../../requestMethod'
import axios from 'axios'
import { SUMMER_SHOP } from '../../../constants'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../../constants'
export default function FilterItemUpdate({ filterProduct,handleDeleteFilter }) {
    // console.log(filterProduct);
    const [filter, setFilter] = useState({
        color: "",
        size: "",
        quantity: "",
        price: "",
        img: ""
    })
    useEffect(() => {
        setFilter({
            ...filter, 
            color: filterProduct.color,
            size: filterProduct.size,
            quantity: filterProduct.quantity,
            price: filterProduct.price,
            img: filterProduct.img
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterProduct])
    const [fileImg, setFileImg] = useState(null)
    //console.log("item", file);
    const { color, size, quantity, price, img } = filter
    const handleChangeFilter = (e) => {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClickDelete = () => {
        handleDeleteFilter(filterProduct.id)
    }
    
    const handleSaveChange = async () => {
        if(fileImg){
            const data = new FormData()
            const fileName = Date.now() + fileImg.name;
            data.append("name", fileName)
            data.append("file", fileImg)
            
            filter.img = fileName
            try {
                await axios.post(`${BASE_URL}/upload`, data)
            } catch (error) {
                console.log(error);
            }
        }
        //console.log(filterProduct);
        try {
            const res = await axios.put(`${BASE_URL}/filter/update/${filterProduct.id}`, filter, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            console.log(res.data);
            setFileImg(null);
            toast.success("Cập nhật thành công ", toastOption);
            //dispatch(updateUser(infor))
            //toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error("Có lỗi xảy ra trong quá trình cập nhật ! ", toastOption);
            //toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }
    //console.log(fileImg);
    return (
        <div className="filterItemUpdate-product-container">
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
                <img src={fileImg ? URL.createObjectURL(fileImg) : `${IMAGE_LINK}/${img}`} alt="" className="img-filter" />
                <input type="file" name="img" id={`fileUpdate-${filterProduct.id}`} accept=".png,.jpeg,.jpg" onChange={(e) => setFileImg(e.target.files[0])} />
                <label htmlFor={`fileUpdate-${filterProduct.id}`}>
                    <div className="btn-select-img">
                        Chọn ảnh
                    </div>
                </label>
            </div>
            <div className="item-filter">
                <button className="btn btn-save-filter" onClick={handleSaveChange}>Lưu lại</button>
                <button className="btn btn-delete-filter" onClick={handleClickDelete}>Xoá</button>
            </div>
        </div>
    )
}
