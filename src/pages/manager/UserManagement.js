import Navbar from "./Navbar";
import './UserManagement.css'
import addImage from '../photo/invite.png';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import deleteImg from '../photo/delete.png';
import editImg from '../photo/pencil.png';
import { toast } from "react-toastify";


const UserManagement = () => {

    const [userList, listUpdate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/user").then((res) => {
            return res.json();
        }).then((resp) => {
            listUpdate(resp);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Do you wnat to remove?')) {
            fetch("http://localhost:8000/user/" + id, {
                method: "DELETE"
            }).then((res) => {
                toast.success('Delete successfully.');
                window.location.reload();
            }).catch((err) => {
                toast.error('Failed: ' + err.message);
            });
        }
    }

    const handleEdit = (id) => {
        navigate("/editUser/" + id);
    }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>User Management</h2>
                    <div className="add-image">
                        <img src={addImage} alt="add" width="25" height="25" className="imgBtn"></img>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone number</td>
                            <td>Email address</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {userList &&
                            userList.slice(2).map(item => (
                                <tr key={item.id}>
                                    <td>{item.name + ' ' + item.sName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td><img src={deleteImg} width="25" height="25" className="tableImgBtn" onClick={() => { handleDelete(item.id) }} style={{ cursor: 'pointer' }}></img></td>
                                    <td><img src={editImg} width="25" height="25" className="tableImgBtn" onClick={() => { handleEdit(item.id) }} style={{ cursor: 'pointer' }}></img></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;