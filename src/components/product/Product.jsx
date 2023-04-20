import './product.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
    return (
        <Link to={`/product/${product.id}`} className="product-item">
            <div className="wrapper-img">
                <img className="img" src={product.img} alt='img-product' />

            </div>

            <div className="product-content">
                <div className="product-content-top">
                    <div className="name-product">{product.name}</div>

                    <div className="price-product">
                        {product.price} đ
                    </div>

                </div>


                <div className="btn">
                    <div className="list-star">
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                        <div className="star-tem">
                            <StarRateIcon className="star" />
                        </div>
                    </div>
                    <button>
                        ADD TO CART <ShoppingCartIcon />
                    </button>
                </div>
            </div>

        </Link>
    )
}
