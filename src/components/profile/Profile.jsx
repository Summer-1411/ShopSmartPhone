import './profile.scss'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useState } from 'react';
import { genders } from '../../constants';
export default function Profile() {
    console.log({
        genders
    });

    const [gender, setGender] = useState(-1)
    
    return (
        <div className="profile-wrapper">
            <div className="profile-heading">
                <div className="profile-title">
                    Hồ Sơ Của Tôi
                </div>
                <div className="profile-infor">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
            </div>
            <div className="profile-content">
                <div className="profile-content-left">
                    <div className="profile-content-left-item">
                        <div className="title">
                            Email
                        </div>
                        <div className="item-value">
                            levantung14112002gmail.com
                        </div>
                    </div>
                    <div className="profile-content-left-item">
                        <div className="title">
                            Họ và tên
                        </div>
                        <div className="item-value">
                            <input type="text" className="input-name" />
                        </div>
                    </div>
                    <div className="profile-content-left-item">
                        <div className="title">
                            Giới tính
                        </div>
                        <div className="item-value">
                            <div className="gender">
                                {genders.map((gen) => (
                                    <div key={gen.id} className="gender-item" onClick={()=>setGender(gen.id)}>
                                        <div className={gen.id === gender ? 'check-radio selected' : 'check-radio'}>
                                            {
                                                gen.id === gender
                                                ? <RadioButtonCheckedOutlinedIcon />
                                                : <RadioButtonUncheckedOutlinedIcon />
                                            }
                                            
                                        </div>
                                        <div className="title-radio">{gen.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="profile-content-right">
                    <img src="https://i.pinimg.com/originals/32/b1/64/32b164c689fb0bd5673170c768653ec9.jpg" alt="" className="avatar-user" />
                    <input type="file" name="" id="file" />
                    <label htmlFor="file">
                        <div className="btn-select-img">
                            Chọn ảnh
                        </div>
                    </label>
                </div>
            </div>
            <div className="profile-bottom">
                <div className="btn-save">
                    Lưu
                </div>
            </div>
        </div>
    )
}
