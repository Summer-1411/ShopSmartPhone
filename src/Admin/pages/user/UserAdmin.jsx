import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../requestMethod';
import { SUMMER_SHOP } from '../../../constants';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './userAdmin.scss'
import UserItem from '../../components/userItem/UserItem';
export default function UserAdmin() {
    
    // useEffect(() => {
    //     const getAllUser = async () => {
    //         try {
    //             const res = await axios.get(`${BASE_URL}/user/alluser`, {
    //                 headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
    //             })
    //             console.log(res.data);
    //             setListUser(res.data.users)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getAllUser();
    // }, [])
    const [listUser, setListUser] = useState([])
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        const getNumberPage = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/page`)
                setPages(res.data[0].numPages)
            } catch (error) {
                console.log(error);
            }
        }
        getNumberPage()
    }, [])
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get(`${BASE_URL}/user/alluser?page=${currentPage}`,{
                headers: { Authorization: `Bearer ${localStorage[SUMMER_SHOP]}` }
            })
            setListUser(res.data.users)
        }
        getUsers()
    }, [currentPage])


    const arr = [];
    for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
    }

    const handleChangePage = (value) => {
        if (value === "next") {
            if (currentPage < pages) {
                setCurrentPage(prev => prev + 1)
            } else {
                return
            }
        } else if (value === "prev") {
            if (currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            } else {
                return
            }
        } else {
            setCurrentPage(value)
        }
    }
    return (
        <div className='userAdmin-wrapper'>
            <div className="userAdmin-heading">
                <div className="heading-title">Danh sách người dùng</div>
                <div className="user-deleted">
                    Đã xoá (10)
                </div>
            </div>
            <div className="userAdmin-body">
                <div className="head-table-userAdmin">
                    <div className="col-item">
                        Id
                    </div>
                    <div className="col-item-2">
                        Tên người dùng
                    </div>
                    <div className="col-item-2">
                        Email
                    </div>
                    <div className="col-item">
                        Giới tính
                    </div>
                    <div className="col-item">
                        Ngày sinh
                    </div>
                    <div className="col-item">
                        Ngày đăng ký
                    </div>
                    <div className="col-item">
                        Thao tác
                    </div>
                </div>
                <div className="body-table-userAdmin">
                    {listUser.map((user) => (
                        <UserItem key={user.id} remove view user={user} />
                    ))}
                    
                </div>
            </div>
            <div className="userAdmin-bottom">
                <div className="userAdmin-pages">
                    <div className="btn btn-prev-page" onClick={() => handleChangePage("prev")}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                    <div className="page-list">
                        {arr.map((page, index) => (
                            <div
                                key={index}
                                className={page === currentPage ? "page-item active" : "page-item"}
                                onClick={() => handleChangePage(page)}
                            >
                                {page}
                            </div>
                        ))}
                        
                    </div>
                    <div className="btn btn-next-page" onClick={() => handleChangePage("next")}>
                        <KeyboardDoubleArrowRightIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
