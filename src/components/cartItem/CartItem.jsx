import './cartItem.scss'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function CartItem() {
    return (
        <tr className='wrapper-row'>
            <td className='infor-product'>
                <img src="https://down-vn.img.susercontent.com/file/cd1294182414a93c3b00b458810996d0_tn" alt="" />
                <div className="name-product">
                    Apple iPhone 13 Chính hãng VN/A
                </div>
                <div className="filter-product">
                    Phân loại hàng:
                    Green, 128GB
                </div>
            </td>
            <td>₫26.990.000</td>
            <td className='td-quantity-product'>
                <div className="control-quantity">
                    <div className="btn-control">-</div>
                    <input type="text" />
                    <div className="btn-control">+</div>
                </div>
            </td>
            <td className='tr-sum-price'>₫26.990.000</td>
            <td className='delete-product'>
                <DeleteOutlinedIcon />
            </td>
        </tr>
    )
}
