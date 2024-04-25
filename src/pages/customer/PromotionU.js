import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import plusImg from '../photo/plus.png';


const PromotionU = () => {

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

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Promotion</h2>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PromotionU;