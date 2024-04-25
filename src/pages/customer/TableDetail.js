import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";


const TableDetail = () => {

    const navigate = useNavigate();

    const [tableNumber, setTableNumber] = useState('');
    const [position, setPosition] = useState('');
    const [size, setSize] = useState(0);

    const [userDetail, userDetailUpdate] = useState([]);
    const [presentDay, setPresentDay] = useState('');
    const [presentTime, setPresentTime] = useState('');


    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/reserve/" + username)
            .then((res) => res.json())
            .then((resp) => {
                //console.log(resp);
                setTableNumber(resp.table);
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



    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Table Detail</h2>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TableDetail;