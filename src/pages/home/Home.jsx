
import { useContext, useEffect, useState } from "react";
import ListProduct from "../../components/listProduct/ListProduct";
import Slider from "../../components/slider/Slider";
//import { producers } from "../../constants";
import './home.scss'
import axios from "axios";
import { BASE_URL } from "../../requestMethod";
import { ProductFilterContext } from "../../context/productFilterContext";

function Home() {
    const { productFilter, setProductFilter } = useContext(ProductFilterContext)
    const [listProducer, setListProducer] = useState([])
    useEffect(() => {
        const getProducer = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/producer`)
                setListProducer(res.data.producer)
            } catch (error) {
                console.log(error);
            }
        }
        getProducer()
    }, [])
    const handleChangeProducer = (id) => {
        if(id === productFilter.producer){
            setProductFilter(prev => ({ category: null, producer: null}))
        }else{
            setProductFilter(prev => ({ category: null, producer: id}))
        }
    }
    return (
        <div className="home">
            <div className="home-container">
                <Slider />
                <div className="home-heading">
                    <div className="home-title">
                        ĐIỆN THOẠI NỔI BẬT NHẤT
                    </div>
                    <div className="home-manufacturer">
                        {listProducer.map((producer) => (
                            <div
                                key={producer.id}
                                className={producer.id === productFilter.producer ? "manufacturer-item active" : "manufacturer-item"}
                                onClick={() => handleChangeProducer(producer.id)}
                            >
                                {producer.name}
                            </div>
                        ))}
                    </div>
                </div>
                <ListProduct />
            </div>
        </div>);
}

export default Home;