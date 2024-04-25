import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const EditTable = () => {

    const [position, setPosition] = useState("");
    const [size, setSize] = useState("")
    const [tableNumber, setTableNumber] = useState('');
    const [name, setName] = useState('');
    const [sName, setSName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [isFree, setIsFree] = useState(true); // Default value is true

    const { empid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }
        fetch("http://localhost:8000/table/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setTableNumber(resp.id);
            setPosition(resp.position);
            setSize(resp.size);
            setIsFree(resp.isFree);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    const handleSubmit = () => {
        let username = sessionStorage.getItem('username');
        
        // PUT request to update table status
        fetch(`http://localhost:8000/table/${empid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: tableNumber, isFree: isFree, position: position, size: size }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update table status.');
                }
                return response.json();
            })
            .then((data) => {
                setIsFree(false); // Update the state after successful update
            })
            .catch((error) => {
                console.error('Error updating table status:', error);
            });

        // POST request to reserve table only when checkbox is checked
        if (!isFree) {
            fetch('http://localhost:8000/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Corrected header name
                },
                body: JSON.stringify({ 
                    id: username, 
                    table: tableNumber, 
                    name: name, 
                    sName: sName, 
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
                    
                })
                .catch((error) => {
                    console.error('Error reserving table:', error);
                });
        } else {
            // Optionally, you can display a message or perform other actions if the checkbox is not checked
            console.log('Table is not reserved because the checkbox is not checked.');
        }
        navigate('/tableManage'); // Navigate to another page after updating
    }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Table Management {">"} Editor</h2>
                </div>
                <div className="edit-container" style={{ marginTop: '40px' }}>
                    <form className="form" onSubmit={handleSubmit}>
                        {/* Table information */}
                        <label>Table number: {tableNumber}</label>
                        <br />
                        <label>{position}</label>
                        <br />
                        <label>Size: {size}</label>
                        <br />
                        <br />
                        {/* Name and surname inputs */}
                        <div className="input-container">
                            <div className="input-wrapper">
                                <label htmlFor="name">Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="name"
                                    placeholder="Enter your new name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="sName">Surname</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="sName"
                                    placeholder="Enter your new surname"
                                    value={sName}
                                    onChange={e => setSName(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Email input */}
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                className="input"
                                type="text"
                                id="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Date and time inputs */}
                        <div className="input-container">
                            <div className="input-wrapper">
                                <label htmlFor="date">Date</label>
                                <input
                                    className="input"
                                    type="date"
                                    id="date"
                                    placeholder="Enter your date"
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="Time">Time</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="time"
                                    placeholder="Enter your time"
                                />
                            </div>
                        </div>
                        {/* Phone input */}
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                className="input"
                                type="text"
                                id="phone"
                                placeholder="Enter your table phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        {/* Checkbox for reservation */}
                        <div className="input-wrapper">
                            <input
                                type="checkbox"
                                id="reserve"
                                name="reserve"
                                checked={!isFree}
                                onChange={() => setIsFree(!isFree)}
                            />
                            <label htmlFor="reserve">    Reserve</label>
                        </div>
                        {/* Button for submitting form */}
                        <div className="button2-container">
                            <button className="button2" onClick={() => navigate('/tableManage')}>Cancel</button>
                            <button className="button2" type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditTable;
