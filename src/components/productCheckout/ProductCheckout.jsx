import './productCheckout.scss'

export default function ProductCheckout() {
    return (
        <div className="productCheckout-content">
            <div className="productCheckout-content-left">
                <img src="https://i.pinimg.com/originals/32/b1/64/32b164c689fb0bd5673170c768653ec9.jpg" alt="" className="img-product" />
                <div className="infor-product">
                    <div className="name-product">iPhone 14 Pro Max 128GB | Chính hãng VN/A</div>
                    <div className="filter-product">
                        Phân loại: 256G, White
                    </div>
                    <div className="quantity-product">
                        x1
                    </div>
                </div>
            </div>
            <div className="productCheckout-content-right">
                <div className="price-product">
                    đ18.890.000
                </div>
            </div>
        </div>
    )
}
