
import { useContext, useEffect } from 'react';
import './userAdmin.scss'
// import UserItem from '../../components/userItem/UserItem';
import { Link, Outlet } from 'react-router-dom';
import { CountUserDeletedContext } from '../../../context/countUserDeleted';
import axios from 'axios';
import { BASE_URL } from '../../../requestMethod';
import { SUMMER_SHOP } from '../../../constants';
export default function UserAdmin() {
    const { countUserDeleted, setCountUserDeleted } = useContext(CountUserDeletedContext)
    console.log(countUserDeleted);
    useEffect(() => {
        const getCountProductDeleted = async () => {
            const res = await axios.get(`${BASE_URL}/user/count/deleted`, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setCountUserDeleted(res.data.count.numberDeleted)
        }
        getCountProductDeleted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='userAdmin-wrapper'>
            <div className="userAdmin-heading">
                <Link to="" className="link-item heading-title">Danh sách người dùng</Link>
                <Link to="deleted-user" className="link-item user-deleted">
                    Đã xoá {`(${countUserDeleted})`}
                </Link>
            </div>
            <>
                <Outlet />
            </>
        </div>
    )
}
