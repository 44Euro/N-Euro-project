import Navbar from "./Navbar";
import './Promotion.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import addImage from '../photo/plus.png'
import { toast } from "react-toastify";

const AddPromo = () => {

    const [detail, setDetail] = useState("");
    const [category, setCategory] = useState("");
    const [exp, setExp] = useState("");

    const navigate = useNavigate();

    const { empid } = useParams();

    

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newId = 'PROMO_' + Date.now() + Math.floor(Math.random() * 1000);
        let regObj = { id: newId, detail, category, exp};
        //console.log(regObj);
    
        fetch("http://localhost:8000/promotion", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(regObj)
        }).then((res) => {
          toast.success('Add new Promotion successfully.');
          navigate('/promotion');
        }).catch((err) => {
          toast.error('Failed: ' + err.message);
        });
    
      }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Promotion Management {">"} Adder</h2>
                    <div className="add-image">
                        <img src={addImage} alt="add" width="20" height="20" className="addPromoBtn"></img>
                    </div>
                </div>
                <div className="edit-container" style={{ marginTop: '40px' }}>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="detail">Detail</label>
                            <input
                                className="input"
                                type="text"
                                id="detail"
                                placeholder="Enter your detail"
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                className="input"
                                type="text"
                                id="category"
                                placeholder="Enter your category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="exp">Expire date</label>
                            <input
                                className="input"
                                type="date"
                                id="exp"
                                value={exp}
                                onChange={(e) => setExp(e.target.value)}
                            />
                        </div>
                        <div className="button2-container">
                            <button className="button2" onClick={() => navigate('/promotion ')}>Cancel</button>
                            <button className="button2" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AddPromo;