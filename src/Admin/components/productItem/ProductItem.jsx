
import './productItem.scss'
import {  parseDate } from '../../../utils/formatDate';
import { numberWithCommas } from '../../../utils/formatMoney';
import { IMAGE_LINK } from '../../../requestMethod';
export default function ProductItem({view, remove, undo,product, handleDeleteProductItem}) {
    //console.log(user);
    const handleClickDelette = () => {
        handleDeleteProductItem(product.id)
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
                {view && <div className="btn-action btn-view">Xem</div>}
                {remove && <div className="btn-action btn-remove" onClick={handleClickDelette}>Xoá</div>}
                {undo && <div className="btn-action btn-undo">Khôi phục</div>}
            {/* {edit && <div className="btn-action btn-edit">Sửa</div>} */}
            </div>
        </div>
    )
}
