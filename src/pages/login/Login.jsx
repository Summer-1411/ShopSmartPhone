import './login.scss'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
    const [eye, setEye]= useState(false)
    return (
        <div className="login">
            <div className="login-container">
                <div className="header">
                    <div className="heading">
                        Đăng nhập
                    </div>
                    <p className="title">
                        Bạn có thể đăng nhập bằng địa chỉ email của mình
                    </p>
                </div>
                <form action="" className="content">
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
                    
                    <button>Đăng nhập</button>
                    <div className="outer-link">
                        Bạn không có tài khoản? <Link to="/register">Đăng ký</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}
