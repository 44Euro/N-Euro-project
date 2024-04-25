import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // State to store total price
    const navigate = useNavigate();
    const [reserve, setReserve] = useState([]);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            navigate('/');
        } else {
            fetchOrders(username);
        }

    }, []);

    const fetchOrders = (username) => {
        fetch(`http://localhost:8000/orders?id=${username}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                calculateTotalPrice(data); // Calculate total price when orders are fetched
                //console.log(data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

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
        const username = sessionStorage.getItem('username');



        //navigate('/orderHistoryU');
    };



    const handleCancle = () => {
        const username = sessionStorage.getItem('username');

        // Delete the orders associated with the username where confirm is false
        fetch(`http://localhost:8000/orders/${username}?confirm=true`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete orders.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Orders with confirm:false deleted successfully:', data);
                // Optionally, you can clear the orders state here
                setOrders([]);
            })
            .catch(error => {
                console.error('Error deleting orders:', error);
            });

        //navigate('/order');
    };


    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Order {">"} Checkout</h2>
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

export default CheckOut;
