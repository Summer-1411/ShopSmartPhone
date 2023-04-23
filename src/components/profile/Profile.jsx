import './profile.scss'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useEffect, useState } from 'react';
import { SUMMER_SHOP, genders } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, IMAGE_LINK } from '../../requestMethod';
import axios from 'axios';
import { updateUser } from '../../redux/userRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../constants';

export default function Profile() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(currentUser);
    const [gender, setGender] = useState(currentUser.gender)
    const [name, setName] = useState(currentUser.username)
    const [date, setDate] = useState("");
    const [file, setFile] = useState(null)

    useEffect(() => {
        const initialDate = new Date(currentUser.birthday).toISOString().substr(0, 10);
        setDate(initialDate);
    }, [currentUser.birthday]);
    const handleSubmit = async (e) => {
        e.preventDefault()

        let infor = {
            username : name,
            gender: gender,
            birthday: date
        }

        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file)
            
            infor.avatar = fileName
            try {
                await axios.post(`${BASE_URL}/upload`, data)
            } catch (error) {
                console.log(error);
            }
        }
        console.log(infor);
        try {
            const res = await axios.put(`${BASE_URL}/user/update/${currentUser.id}`, infor, {
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            console.log(res.data);
            setFile(null);
            dispatch(updateUser(infor))
            toast.success(res.data.message, toastOption);
        } catch (error) {
            toast.error(error.response.data.message, toastOption);
            console.log(error);
        }
    }
    //console.log(`${IMAGE_LINK}/${currentUser.avatar}`);

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
                            {currentUser.email}
                        </div>
                    </div>
                    <div className="profile-content-left-item">
                        <div className="title">
                            Họ và tên
                        </div>
                        <div className="item-value">
                            <input type="text" className="input-name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="profile-content-left-item">
                        <div className="title">
                            Ngày sinh
                        </div>
                        <div className="item-value">
                            <input
                                type="date"
                                className="input-name"
                                name="date"
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="profile-content-left-item">
                        <div className="title">
                            Giới tính
                        </div>
                        <div className="item-value">
                            <div className="gender">
                                {genders.map((gen) => (
                                    <div key={gen.id} className="gender-item" onClick={() => setGender(gen.id)}>
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
                    <img src={file ? URL.createObjectURL(file) : `${IMAGE_LINK}/${currentUser.avatar}`} alt="" className="avatar-user" />
                    <input type="file" name="" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="file">
                        <div className="btn-select-img">
                            Chọn ảnh
                        </div>
                    </label>
                </div>
            </div>
            <div className="profile-bottom">
                <div className="btn-save" onClick={handleSubmit}>
                    Lưu
                </div>
            </div>
        </div>
    )
}
