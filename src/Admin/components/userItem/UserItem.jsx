import { IMAGE_DEFAULT, IMAGE_LINK } from '../../../requestMethod';
import {  parseDate } from '../../../utils/formatDate';
import './userItem.scss'

export default function UserItem({view, remove, undo, user}) {
    //console.log(user);
    return (
        <div className='row-userItem'>
            <div className="col-item">
                {user.id}
            </div>
            <div className="col-item-2 col-img-name">
                <img className="avatar-user" src={user.avatar ? `${IMAGE_LINK}/${user.avatar}` : `${IMAGE_DEFAULT}`} alt="" />
                <div className="name-user">{user.username}</div>
            </div>
            <div className="col-item-2">
                {user.email}
            </div>
            <div className="col-item">
                {user.gender === 1 ? "Nam" : user.gender === 2 ? "Nữ" : "Khác"}
            </div>
            <div className="col-item">
                {parseDate(user.birthday)}
            </div>
            <div className="col-item">
                {parseDate(user.createAt)}
            </div>
            <div className="col-item col-action-admin">
                {view && <div className="btn-action btn-view">Xem</div>}
                {remove && <div className="btn-action btn-remove">Xoá</div>}
                {undo && <div className="btn-action btn-undo">Khôi phục</div>}
            </div>
        </div>
    )
}
