import { useDispatch } from 'react-redux';
import './cartItem.scss'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { removeProduct } from '../../redux/cartRedux';
import axios from 'axios';
import { BASE_URL, IMAGE_LINK } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import { numberWithCommas } from '../../utils/formatMoney';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';
export default function CartItem({product}) {
    const dispatch = useDispatch();

    const handleDeletetItem = async (product) => {
        try {
            dispatch(removeProduct({id_filter: product.id_filter, price: product.price, quantity: product.quantity}))
            const res = await axios.delete(`${BASE_URL}/cart/delete/${product.id_filter}`,{
                    headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
                }
            )
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
        }
    }
    console.log(product);
    return (
        <tr className='wrapper-row'>
            <td className='infor-product'>
                <img src={`${IMAGE_LINK}/${product.img}`} alt="" />
                <div className="name-product">
                    {product.name}
                </div>
                <div className="filter-product">
                    Phân loại hàng:
                    {product.color}, {product.size}
                </div>
            </td>
            <td>{numberWithCommas(product.price)}</td>
            <td className='td-quantity-product'>
                <div className="control-quantity">
                    <div className="btn-control">-</div>
                    <div className='input'>{product.quantity}</div>
                    <div className="btn-control">+</div>
                </div>
            </td>
            <td className='tr-sum-price'>{numberWithCommas(product.price * product.quantity)}</td>
            <td className='delete-product' onClick={() => handleDeletetItem(product)}>
                <DeleteOutlinedIcon />
            </td>
        </tr>
    )
}
