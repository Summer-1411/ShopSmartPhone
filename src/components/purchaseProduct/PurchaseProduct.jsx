import './purchaseProduct.scss'

export default function PurchaseProduct() {
    return (
        <div className='purchaseProduct-wrapper'>
            <div className="purchaseProduct-content">
                <div className="purchaseProduct-content-left">
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
                <div className="purchaseProduct-content-right">
                    <div className="price-product">
                        đ18.890.000
                    </div>
                </div>
            </div>
            
            <div className="checkout-product">
                <div className="checkout-product-left">
                    <div className="name-customer">
                        Le Van Tung
                    </div>
                    <div className="phone-number">
                        0373984007
                    </div>
                    <div className="delivery-address">
                        Xóm Tân Mĩ I, xã Tân Quang, thành phố Sông Công, tỉnh Thái Nguyên
                    </div>
                </div>
                <div className="checkout-product-right">
                    <div className="sum-price-checkout">
                        <div className="title-checkout">
                            Thành tiền :
                        </div>
                        <div className="price-order">
                            đ18.890.000
                        </div>
                    </div>
                </div>
            </div>
            <div className="purchaseProduct-bottom">
                <div className="btn-delete">
                    Huỷ đơn
                </div>
            </div>
        </div>
    )
}
