import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import addImage from '../photo/plus.png'
import { toast } from "react-toastify";

const EditMenu = () => {

    const [id,setId] = useState("");
    const [price, setPrice] = useState(0);

    const { empid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }
        fetch("http://localhost:8000/menu/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setId(resp.id);
            setPrice(resp.price);
        }).catch((err) => {
            console.log(err.message)
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, price};
        console.log(regObj);

        fetch("http://localhost:8000/menu/" + empid, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regObj)
        }).then((res) => {
            toast.success('Edit successfully.');
            navigate('/menuManagement');
        }).catch((err) => {
            toast.error('Failed: ' + err.message);
        });

    }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Menu Management {">"} Editor</h2>
                    <div className="add-image">
                        <img src={addImage} alt="add" width="20" height="20" className="addPromoBtn"></img>
                    </div>
                </div>
                <div className="edit-container" style={{ marginTop: '40px' }}>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="id">Menu</label>
                            <input
                                className="input"
                                type="text"
                                id="id"
                                placeholder="Enter your menu"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                className="input"
                                type="number"
                                id="price"
                                placeholder="Enter your price"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="button2-container">
                            <button className="button2" onClick={() => navigate('/menuManagement ')}>Cancel</button>
                            <button className="button2" type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default EditMenu;