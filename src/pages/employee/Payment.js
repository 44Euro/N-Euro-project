import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import billImg from '../photo/bill.png';


const Payment = () => {

    const [reserveList, setReserveList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }


        fetch("http://localhost:8000/reserve")
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setReserveList(data);
            })
            .catch(err => console.log(err.message));

    }, []);

    const handleBill = (id) => {
        navigate("/bill/" + id);
    }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Payment</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Table</td>
                            <td>Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name} {item.sName}</td>
                                <td><img src={billImg} width="25" height="25" className="tableImgBtn" onClick={() => { handleBill(item.id) }} style={{ cursor: 'pointer' }}></img></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Payment;