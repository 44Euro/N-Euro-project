import { useNavigate, useParams } from "react-router";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const ConfirmTable = () => {

    const { empid } = useParams();
    const navigate = useNavigate();

    const [tableNumber, setTableNumber] = useState('');
    const [position, setPosition] = useState('');
    const [size, setSize] = useState(0);
    const [phone] = useState('');
    const [email] = useState('');

    const [userDetail, userDetailUpdate] = useState([]);
    const [presentDay, setPresentDay] = useState('');
    const [presentTime, setPresentTime] = useState('');

    const [isFree, setIsFree] = useState(true); // Default value is true

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/table/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                //console.log(resp);
                setTableNumber(resp.id);
                setPosition(resp.position);
                setSize(resp.size);
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch("http://localhost:8000/user/" + username)
            .then((res) => res.json())
            .then((resp) => {
                //console.log(resp);
                userDetailUpdate(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });

        const currentDate = new Date();
        const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        setPresentDay(currentDate.toLocaleDateString('en-US', dayOptions));
        setPresentTime(currentDate.toLocaleTimeString('en-US', timeOptions));
    }, []);

    const handleSubmit = () => {
        let username = sessionStorage.getItem('username');
        fetch(`http://localhost:8000/table/${empid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: tableNumber, isFree: false, position: position, size: size }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update table status.');
                }
                return response.json();
            })
            .then((data) => {
                //console.log('Table status updated successfully:', data);
                // Optionally, you can update the state or take other actions
                setIsFree(false); // Update the state after successful update
            })
            .catch((error) => {
                console.error('Error updating table status:', error);
            });


        fetch('http://localhost:8000/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Corrected header name
            },
            body: JSON.stringify({ 
                id: username, 
                table: tableNumber, 
                name: userDetail.name, 
                sName: userDetail.sName, 
                position: position, 
                size: size,
                phone: phone,
                email: email
             })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to reserve table.');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Table reserved successfully:', data);
                // Optionally, you can update the state or take other actions
                setIsFree(false); // Update the state after successful reservation
                navigate('/reserveTable'); // Navigate to another page after updating
            })
            .catch((error) => {
                console.error('Error reserving table:', error);
            });
    }


    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Reserve Table {">"} Confirm</h2>
                </div>
                <div className="edit-container" style={{ marginTop: '40px' }}>
                    <div>
                        {/* Assuming you want to display table details */}
                        <label>Table number: {tableNumber}</label>
                        <br />
                        <label>{position}</label>
                        <br />
                        <label>Size: {size}</label>
                        <br />
                        <br />
                        <div>
                            <p>Name</p>
                            <p>{userDetail.name} {userDetail.sName}</p>
                            <p>Email</p>
                            <p>{userDetail.email}</p>
                            <br />
                            <p>Date</p>
                            <p>{presentDay}</p>
                            <p>{presentTime}</p>
                            <p>Phone</p>
                            <p>{userDetail.phone}</p>
                        </div>
                        <div>
                            <button className="button2" onClick={() => navigate('/reserveTable')}>Cancel</button>
                            <button className="button2" onClick={handleSubmit}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmTable;
