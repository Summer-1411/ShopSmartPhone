import { useEffect, useState } from "react";
import "./featuredInfo.scss";
import { BASE_URL } from "../../../requestMethod";
import axios from "axios";
import { SUMMER_SHOP } from "../../../constants";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  const [count, setCount] = useState({
    user: 0,
    product: 0,
    order: 0,
    productSold: 0
  })
  useEffect(() => {
    const getCountStat = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stat/count`, {
          headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
        })
        //console.log(res.data);
        setCount({
          user: res.data.user.numberUser,
          product: res.data.product.numberProduct,
          order: res.data.order.numberOrder,
          productSold: res.data.productSold.total_sold,
        })
      } catch (error) {
        console.log(error);
      }
    }

    getCountStat()
  }, [])
  const {user, product, order, productSold} = count
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tổng số người dùng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{user}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tổng số sản phẩm </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{product}</span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tổng số đơn hàng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{order}</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon"/> */}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số máy đã bán</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{productSold}</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon"/> */}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
