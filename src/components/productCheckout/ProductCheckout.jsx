import { IMAGE_LINK } from '../../requestMethod'
import { numberWithCommas } from '../../utils/formatMoney'
import './productCheckout.scss'

export default function ProductCheckout({product}) {
    return (
        <div className="productCheckout-content">
            <div className="productCheckout-content-left">
                <img src={`${IMAGE_LINK}/${product.img}`} alt="" className="img-product" />
                <div className="infor-product">
                    <div className="name-product">{product.name}</div>
                    <div className="filter-product">
                        Phân loại: {product.color}, {product.size}
                    </div>
                    <div className="quantity-product">
                        x{product.quantity}
                    </div>
                </div>
            </div>
            <div className="productCheckout-content-right">
                <div className="price-product">
                    {numberWithCommas(product.price)}
                </div>
            </div>
        </div>
    )
}
