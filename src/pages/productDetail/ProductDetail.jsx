import './productDetail.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
export default function ProductDetail() {
    return (
        
            <div className="productDetail-container">
                <div className="left">
                    <div className="main-img" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}></div>
                    <div className="list-img">
                        <div className="img-item" >
                            <div className="img-item-content" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}>
                            </div>
                        </div>
                        <div className="img-item" >
                            <div className="img-item-content" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}>
                            </div>
                        </div>
                        <div className="img-item" >
                            <div className="img-item-content" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}>
                            </div>
                        </div>
                        <div className="img-item" >
                            <div className="img-item-content" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}>
                            </div>
                        </div>
                        <div className="img-item" >
                            <div className="img-item-content" style={{backgroundImage: `url("https://down-vn.img.susercontent.com/file/4ceb518f27ab52db733bf4b2b0cd1774")`}}>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="right">
                    <div className="heading">
                        <div className="name-product">
                            Apple iPhone 13 Chính hãng VN/A
                        </div>
                        <div className="info-product">
                            <div className="star">
                                <div className="star-number">5.0</div>
                                <div className="list-star">
                                    <StarIcon className='icon-star'/>
                                    <StarIcon className='icon-star'/>
                                    <StarIcon className='icon-star'/>
                                    <StarIcon className='icon-star'/>
                                    <StarIcon className='icon-star'/>
                                    
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-item-number">
                                    318
                                </div>
                                <div className="info-item-title">
                                    Đánh giá
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-item-number">
                                    500
                                </div>
                                <div className="info-item-title">
                                    Đã bán
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="price-product">
                        đ18.890.000 
                    </div>
                    <div className="main">
                        <div className="main-row">
                            <div className="row-title">
                                0% Trả góp
                            </div>
                            12 tháng x ₫1.574.167 (Lãi suất 0%)
                        </div>
                        <div className="main-row">
                            <div className="row-title">
                                Bảo Hiểm
                            </div>
                            Bảo hiểm thiết bị di động nâng cao
                        </div>
                        <div className="main-row">
                            <div className="row-title">
                                Color
                            </div>
                            <div className="row-list-option">
                                <div className="option-item">
                                    Blue
                                </div>
                                <div className="option-item">
                                    Green
                                </div>
                                <div className="option-item">
                                    Pink
                                </div>
                                <div className="option-item">
                                    Gold
                                </div>
                                <div className="option-item">
                                    White
                                </div>
                            </div>
                        </div>
                        <div className="main-row">
                            <div className="row-title">
                                Size
                            </div>
                            <div className="row-list-option">
                                <div className="option-item">
                                    64GB
                                </div>
                                <div className="option-item">
                                    128GB
                                </div>
                                <div className="option-item">
                                    256GB
                                </div>
                                <div className="option-item">
                                    512GB
                                </div>
                            </div>
                        </div>
                        <div className="main-row">
                            <div className="row-title">
                                Số lượng
                            </div>
                            <div className="main-row-content">
                                <div className="row-content-left">
                                    <div className="btn-icon">
                                        -
                                    </div>
                                    <input type="text" className='input-number' value={1}/>
                                    <div className="btn-icon">
                                        +
                                    </div>
                                </div>
                                <div className="row-content-right">
                                    22 sản phẩm có sẵn
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-productDetail">
                        <div className='btn add-cart'>
                            
                            <AddShoppingCartIcon />
                            Thêm vào giỏ hàng
                        </div>
                        <div className='btn buy-now'>
                            Mua ngay
                        </div>
                    </div>
                </div>
            </div>
    )
}
