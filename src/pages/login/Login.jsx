import './login.scss'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { login } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../requestMethod';
import { SUMMER_SHOP } from '../../constants';
import { loginFailure, loginSuccess } from '../../redux/userRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function Login() {
    const dispatch = useDispatch()
    const [eye, setEye] = useState(false)

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const { email, password } = values
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if(!values.email || !values.password){
            toast.error('Vui lòng nhập đủ thông tin !', toastOption);
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, values)
            console.log(res);
            localStorage.setItem(SUMMER_SHOP, res.data.accessToken)
            
            toast.success(res.data.message, toastOption);
            dispatch(loginSuccess(res.data.user))
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            dispatch(loginFailure())
        }
    }
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
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="label">Mật khẩu</label>
                        <div className="input">
                            <input
                                type={eye ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                onChange={handleChange}
                            />
                            {
                                eye ?
                                    <span onClick={() => { setEye(false) }}>
                                        <VisibilityOffIcon />
                                    </span> :
                                    <span onClick={() => { setEye(true) }}>
                                        <VisibilityIcon />
                                    </span>
                            }

                        </div>
                    </div>

                    <button onClick={handleLogin}>Đăng nhập</button>
                    <div className="outer-link">
                        Bạn không có tài khoản? <Link className='link-item' to="/register">Đăng ký</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
