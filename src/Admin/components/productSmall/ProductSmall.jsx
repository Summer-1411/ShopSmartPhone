import './productSmall.scss'
export default function ProductSmall({pro}) {
    return (
        <div className="product-item">
            <div className="product-name">
                {pro.name}
            </div>
            <div className="product-properties">
                {pro.size}, {pro.color}
                <div className="quantity-product">
                    x{pro.quantity}
                </div>
            </div>
        </div>
    )
}
