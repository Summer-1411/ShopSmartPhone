import { useEffect, useState } from "react";
import "./widgetSm.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { BASE_URL, IMAGE_LINK } from "../../../requestMethod";
import { SUMMER_SHOP } from "../../../constants";
import { Link } from "react-router-dom";
export default function WidgetSm() {
  const [topProduct, setTopProduct] = useState([])
  useEffect(() => {
    const getTopProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stat/top-product`, {
          headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
        })
        setTopProduct(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTopProduct()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Sản phẩm đã bán</span>
      <ul className="widgetSmList">
        {topProduct.map((pro) => (
          <li className="widgetSmListItem" key={pro.id}>
            <img
              src={`${IMAGE_LINK}/${pro.img}`}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{pro.name}</span>
              <span className="widgetSmUserTitle">Số lượng: {pro.total_quantity}</span>
            </div>
            <Link to={`products/detail-product/${pro.id}`} className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Xem
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
