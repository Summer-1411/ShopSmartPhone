import './productCheckout.scss'

export default function ProductCheckout({product}) {
    return (
        <div className="productCheckout-content">
            <div className="productCheckout-content-left">
                <img src={product.img} alt="" className="img-product" />
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
                    {product.price}đ
                </div>
            </div>
        </div>
    )
}
