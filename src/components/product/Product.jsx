import './product.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/formatMoney';
import { IMAGE_LINK } from '../../requestMethod';
export default function Product({ product }) {
    //console.log(product.img);
    return (
        <Link to={`/product/${product.id}`} className="product-item">
            <div className="wrapper-img">
                <img className="img" src={`${IMAGE_LINK}/${product.img}`} alt='img-product' />

            </div>

            <div className="product-content">
                <div className="product-content-top">
                    <div className="name-product">{product.name}</div>

                    <div className="price-product">
                        {numberWithCommas(product.priceRange)}
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
