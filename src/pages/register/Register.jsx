import './register.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [eye, setEye]= useState(false)
    return (
        <div className="register">
            <div className="register-container">
                <div className="header">
                    <div className="heading">
                        Đăng ký
                    </div>
                    <p className="title">
                        Quá trình đăng ký chỉ mất chưa đầy một phút nhưng mang lại cho bạn toàn quyền kiểm soát các đơn đặt hàng của mình.
                    </p>
                </div>
                <form action="" className="content">
                    <div className="input-group">
                        <label htmlFor="email" className="label">Họ và tên</label>
                        <div className="input">
                            <input type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="label">Địa chỉ Email</label>
                        <div className="input">
                            <input type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="label">Mật khẩu</label>
                        <div className="input">
                            <input type={eye ? "text" : "password"} name="password" id="password" />
                            {
                                eye ? 
                                <span onClick={() => {setEye(false)}}>
                                    <VisibilityOffIcon />
                                </span> :
                                <span onClick={() => {setEye(true)}}>
                                    <VisibilityIcon />
                                </span>
                            }
                            
                        </div>
                    </div>
                    <button>Đăng ký</button>
                    <div className="outer-link">
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}
