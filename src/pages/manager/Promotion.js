import Navbar from "./Navbar";
import './Promotion.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import plusImg from '../photo/plus.png';
import deleteImg from '../photo/delete.png';
import editImg from '../photo/pencil.png';
import { toast } from "react-toastify";

const Promotion = () => {

    const [promotionList, listUpdate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/promotion").then((res) => {
            return res.json();
        }).then((resp) => {
            listUpdate(resp);
            //console.log(resp);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Do you wnat to remove?')) {
            fetch("http://localhost:8000/promotion/" + id, {
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
        navigate("/editPromo/" + id);
    }

    const handleAdd = () => {
        navigate("/addPromo");
    }

    return ( 
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Promotion Management</h2>
                    <div className="add-image">
                        <img src={plusImg} alt="add" width="20" height="20" className="addPromoBtn" onClick={() => {handleAdd()}} style={{ cursor: 'pointer' }}></img>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Expire Date</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {promotionList &&
                            promotionList.map(item => (
                                <tr key={item.id}>
                                    <td>{item.detail}</td>
                                    <td>{item.category}</td>
                                    <td>{item.exp}</td>
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
 
export default Promotion;