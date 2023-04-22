
import ListProduct from "../../components/listProduct/ListProduct";
import Slider from "../../components/slider/Slider";
import './home.scss'

function Home() {
    return ( 
    <div className="home">
        <div className="home-container">
            <Slider />
            <div className="home-heading">
                <div className="home-title">
                    ĐIỆN THOẠI NỔI BẬT NHẤT
                </div>
                <div className="home-manufacturer">
                    <div className="manufacturer-item">
                        Apple
                    </div>
                    <div className="manufacturer-item">
                        Android
                    </div>
                    <div className="manufacturer-item">
                        Xiaomi
                    </div>
                    <div className="manufacturer-item">
                        OPPO
                    </div>
                    <div className="manufacturer-item">
                        realme
                    </div>
                    <div className="manufacturer-item">
                        Apple
                    </div>
                    <div className="manufacturer-item">
                        Android
                    </div>
                    <div className="manufacturer-item">
                        Xiaomi
                    </div>
                    <div className="manufacturer-item">
                        OPPO
                    </div>
                    <div className="manufacturer-item">
                        realme
                    </div>
                </div>
            </div>
            <ListProduct />
        </div>
    </div> );
}

export default Home;