import { Link } from 'react-router-dom';
import CartItem from '../../components/cartItem/CartItem';
import './cart.scss'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { numberWithCommas } from '../../utils/formatMoney';
export default function Cart() {
    const cart = useSelector((state) => state.cart)
    
    return (
        <div className='wrapper-cart'>
            <h3 className='heading'>Giỏ hàng</h3>
            {cart.count < 1 ? <h1>Chưa có sản phẩm trong giỏ hàng</h1>
                :
                <div>
                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th className='th-infor-product'>Sản phẩm</th>
                                    <th className='th-price-product'>Đơn giá</th>
                                    <th className='th-quantity-product'>Số lượng</th>
                                    <th className='th-sum-price'>Số tiền</th>
                                    <th className='th-btn-option'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.products.map(pro => (
                                    <CartItem product={pro} key={uuidv4()} />
                                ))}


                            </tbody>
                        </table>
                    </div>
                    <div className="bottom">
                        <div className="total-price">
                            <div className="title-total-price">
                                Tổng tiền:
                            </div>
                            <div className="number-total">
                                {numberWithCommas(cart.total)}
                            </div>
                        </div>
                        <Link to={"/order"} className="btn-checkout">
                            Đặt hàng
                        </Link>
                    </div>

                </div>
            }
        </div>
    )
}
