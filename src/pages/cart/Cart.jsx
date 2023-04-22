import { Link } from 'react-router-dom';
import CartItem from '../../components/cartItem/CartItem';

import './cart.scss'

export default function Cart() {
    return (
        <div className='wrapper-cart'>
            <h3 className='heading'>Giỏ hàng</h3>
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
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                <div className="total-price">
                    <div className="title-total-price">
                        Tổng tiền:
                    </div>
                    <div className="number-total">
                        55.470.000 ₫
                    </div>
                </div>
                <Link to={"/order"} className="btn-checkout">
                    Đặt hàng
                </Link>
            </div>
        </div>
    )
}
