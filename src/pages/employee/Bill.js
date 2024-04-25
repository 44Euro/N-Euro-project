import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";


const Bill = () => {

    const [orders, setOrders] = useState([]);
    const [reserve, serReserve] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // State to store total price
    const navigate = useNavigate();

    const { empid } = useParams();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            navigate('/');
        } else {
            fetch("http://localhost:8000/orders")
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    calculateTotalPrice(data);
                })
                .catch(err => console.log(err.message));

            fetch("http://localhost:8000/reserve")
                .then(res => res.json())
                .then(data => {
                    serReserve(data);
                    console.log(data);
                })
                .catch(err => console.log(err.message));
        }

    }, []);

    const calculateTotalPrice = (orders) => {
        let total = 0;
        orders.forEach(order => {
            order.items.forEach(item => {
                total += item.price * item.quantity;
            });
        });
        setTotalPrice(total);
    };

    const handleConfirm = () => {

        fetch('http://localhost:8000/orders/' + empid, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete orders.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Deleted successfully:', data);
        })
        .catch(error => {
            console.error('Error deleting orders:', error);
        });

        fetch('http://localhost:8000/reserve/' + empid, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete orders.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Deleted successfully:', data);
        })
        .catch(error => {
            console.error('Error deleting orders:', error);
        });

        navigate('/payment');
    };



    const handleCancle = () => {
        navigate('/payment');
    };

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Payment {">"} Bill</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
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
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <td>Total price</td>
                            <td></td>
                            <td>{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <button className='button2' onClick={() => { handleCancle() }}>Cancel</button>
                <button className='button2' onClick={() => { handleConfirm() }}>Confirm</button>
            </div>
        </div>
    );
}

export default Bill;