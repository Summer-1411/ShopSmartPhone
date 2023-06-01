
import './productItem.scss'
import {  parseDate } from '../../../utils/formatDate';
import { numberWithCommas } from '../../../utils/formatMoney';
import { IMAGE_LINK } from '../../../requestMethod';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../../constants'
export default function ProductItem({view, remove, edit, undo,product, handleDeleteProductItem, handleCancelDeleteProductItem}) {
    //console.log(user);
    const handleClickDelette = () => {
        toast.success("Xoá sản phẩm thành công", toastOption);
        handleDeleteProductItem(product.id)
    }
    const handleClickRestore = () => {
        toast.success("Khôi phục sản phẩm thành công", toastOption);
        handleCancelDeleteProductItem(product.id)
    }
    return (
        <div className='row-userItem'>
            <div className="col-item">
                {product.id}
            </div>
            <div className="col-item-2 col-img-name">
                <img className="avatar-user" src={`${IMAGE_LINK}/${product.img}`} alt="" />
                <div className="name-user">{product.name}</div>
            </div>
            <div className="col-item">
                {product.category}
            </div>
            <div className="col-item">
                {product.producer}
            </div>
            <div className="col-item">
                {numberWithCommas(product.priceRange)}
            </div>
            <div className="col-item">
                {parseDate(product.createAt)}
            </div>
            <div className="col-item-2 col-action-admin">
                {view && <Link to={`/2020606605/admin/products/detail-product/${product.id}`} className="btn-action btn-view">Xem</Link>}
                {edit && <Link to={`detail-product/${product.id}`} className="btn-action btn-edit">Sửa</Link>}
                {remove && <div className="btn-action btn-remove" onClick={handleClickDelette}>Xoá</div>}
                {undo && <div className="btn-action btn-undo" onClick={handleClickRestore}>Khôi phục</div>}
            </div>
        </div>
    )
}
