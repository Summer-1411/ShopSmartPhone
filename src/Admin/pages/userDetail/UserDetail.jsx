
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from "react-router-dom";
import "./userDetail.scss";
import { useEffect, useState } from 'react';
import { BASE_URL, IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
import axios from 'axios';
import { SUMMER_SHOP } from '../../../constants';
import { parseDate } from '../../../utils/formatDate';
import { numberWithCommas } from '../../../utils/formatMoney';

export default function UserDetail() {
  const location = useLocation()
  const id = location.pathname.split("/")[5];
  //console.log(id);
  const [user, setUser] = useState({})
  const [infor, setInfor] = useState({
    countOrder: 0,
    money: 0,
    countOrderCancel: 0,
    moneyOrderCancel: 0,
    countProductBought: 0,
  })
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/alluser?id=${id}`, {
          headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
        })

        const result = await axios.get(`${BASE_URL}/stat/stat-byUser/${id}`, {
          headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
        })
        setInfor({
          countOrder: result.data.order?.numberOrder,
          money: result.data.order?.money,
          countOrderCancel: result.data.orderCancel?.numberOrderCancel,
          moneyOrderCancel: result.data.orderCancel?.money,
          countProductBought: result.data.product?.total_quantity
        })
        //console.log(result.data);
        setUser(res.data.user)
      } catch (error) {
        console.log(error);
      }
    }
    getUserDetail()
  }, [id])
  const { countOrder, money, countOrderCancel, moneyOrderCancel, countProductBought } = infor
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chi tiết khách hàng</h1>
        <Link to={"/2020606605/admin/users"}>
          <button className="userAddButton">Thoát</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.avatar ? `${IMAGE_LINK}/${user.avatar}` : `${IMAGE_DEFAULT}`}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              {/* <span className="userShowUserTitle">{user.email}</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin liên hệ</span>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <span className="userShowTitle">Giới tính</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.gender === 1 ? "Nam" : user.gender === 2 ? "Nữ" : "Khác"}</span>
            </div>
            <span className="userShowTitle">Ngày sinh</span>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{parseDate(user.birthday)}</span>
            </div>
            <span className="userShowTitle">Ngày đăng ký</span>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{parseDate(user.createAt)}</span>
            </div>

          </div>
        </div>
        <div className="userOrder">
          <div className="featuredItem">
            <span className="featuredTitle">Số sản phẩm đã mua</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{countProductBought ? countProductBought : 0}</span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Tổng số đơn đã đặt</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{countOrder}</span>
            </div>
            <span className="featuredTitle">Thành tiền</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{money ? numberWithCommas(Number(money)) : numberWithCommas(0)}</span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Tổng số đơn đã huỷ</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{countOrderCancel}</span>
            </div>
            <span className="featuredTitle">Thành tiền</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{moneyOrderCancel ? numberWithCommas(Number(moneyOrderCancel)) : numberWithCommas(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
