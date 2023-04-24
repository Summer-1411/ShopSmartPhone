import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useSelector } from 'react-redux';
import { IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
export default function Navbar() {
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <div className='navbar-wrapper'>
            <div className="navbar-left">
                <SearchOutlinedIcon />
                <input type="text" className="input-admin" placeholder='Type to search...' />
            </div>
            <div className="navbar-right">
                <EmailOutlinedIcon />
                <div className="infor-admin">
                    <div className="name-admin">
                        {currentUser.username}
                    </div>
                    <div className="wrapper-avatar">
                        <img src= {currentUser.avatar ? `${IMAGE_LINK}/${currentUser.avatar}` : `${IMAGE_DEFAULT}`} alt="" className="avatar-admin" />

                    </div>
                </div>
            </div>
        </div>
    )
}
