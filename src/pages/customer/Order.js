import Navbar from "./Navbar";
import addImage from '../photo/plus.png';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import deleteImg from '../photo/plus.png';
import editImg from '../photo/line.png';
import { toast } from "react-toastify";

const Order = () => {
    const [menuList, listUpdate] = useState([]);
    const [quantities, setQuantities] = useState({}); // State to store quantities for each menu item
    const [confirm,setConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/menu").then((res) => {
            return res.json();
        }).then((resp) => {
            listUpdate(resp);
            // Initialize quantities for each menu item to 0
            const initialQuantities = resp.reduce((acc, item) => {
                acc[item.id] = 0;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    const increment = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1 // Increment quantity for the specific menu item ID
        }));
    };

    const decrement = (id) => {
        if (quantities[id] > 0) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [id]: prevQuantities[id] - 1 // Decrement quantity for the specific menu item ID
            }));
        }
    };

    const handleCheckout = () => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            console.error("Username not found in session storage.");
            return;
        }
    
        // Filter menu items with quantities greater than 0
        const itemsToOrder = menuList.filter(item => quantities[item.id] > 0);
    
        // Check if there are any items to order
        if (itemsToOrder.length === 0) {
            console.log("No items selected for order.");
            toast.error('Please select items to order.');
            return;
        }
    
        // Prepare the new order object
        const newOrder = {
            id: username,
            items: itemsToOrder.map(item => ({
                itemId: item.id,
                quantity: quantities[item.id],
                price: item.price,
            })),
        };
    
        // Send the order to the server
        fetch("http://localhost:8000/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save order.');
            }
            return response.json();
        })
        .then(data => {
            console.log("Order saved successfully:", data);
            // Optionally, you can clear the quantities state here
            setQuantities({});
            toast.success('Order placed successfully.');
            // Redirect the user to a success page or do other actions
            navigate('/orderHistoryU');
        })
        .catch(error => {
            console.error('Error saving order:', error.message);
            toast.error('Failed to place order.');
        });
    };
    
    
    
    

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Order</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {menuList &&
                            menuList.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.price}</td>
                                    <td><img src={deleteImg} width="25" height="25" className="tableImgBtn" onClick={() => increment(item.id)} style={{ cursor: 'pointer' }}></img></td>
                                    <td><span>{quantities[item.id]}</span></td>
                                    <td><img src={editImg} width="25" height="25" className="tableImgBtn" onClick={() => decrement(item.id)} style={{ cursor: 'pointer' }}></img></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="button2" onClick={()=>{handleCheckout()}}>Checkout</button>
            </div>
        </div>
    );
}

export default Order;
