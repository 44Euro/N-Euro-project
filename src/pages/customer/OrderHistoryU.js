import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const OrderHistoryU = () => {

    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');

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
                            <td>Menu</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList
                            .filter(order => order.id === username) // Filter orders by username
                            .map((order, index) => (
                                <React.Fragment key={index}>
                                    {order.items.map((item, itemIndex) => (
                                        <tr key={`${order.id}-${itemIndex}`}>
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

export default OrderHistoryU;