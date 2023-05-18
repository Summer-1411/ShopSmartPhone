import './register.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../requestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function Register() {
    const navigate = useNavigate()
    const [eye, setEye]= useState(false)

    const [values, setValues] = useState({
        email: "",
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        if(!values.email || !values.username || !values.password){
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, values)
            toast.success('Đăng ký thành công !', toastOption);
            navigate("/login")
            console.log('register:', res);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log("ERROR REGISTER: ", error);
        }
    }
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
                        <label htmlFor="username" className="label">Họ và tên</label>
                        <div className="input">
                            <input type="text" name="username" id="username" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="label">Địa chỉ Email</label>
                        <div className="input">
                            <input type="text" name="email" id="email"onChange={handleChange} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="label">Mật khẩu</label>
                        <div className="input">
                            <input type={eye ? "text" : "password"} name="password" id="password" onChange={handleChange}/>
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
                    <button onClick={handleRegister}>Đăng ký</button>
                    <div className="outer-link">
                        Bạn đã có tài khoản? <Link className='link-item' to="/login">Đăng nhập</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}
