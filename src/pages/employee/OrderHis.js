import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/orders")
            .then(res => res.json())
            .then(data => {
                setOrderList(data);
            })
            .catch(err => console.log(err.message));
    }, []);

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Order History</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Menu</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                    {orderList.map((orderList, index) => (
                            <React.Fragment key={index}>
                                {orderList.items.map((item, itemIndex) => (
                                    <tr key={`${orderList.id}-${itemIndex}`}>
                                        <td>{orderList.id}</td>
                                        <td>{item.itemId}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderHistory;
