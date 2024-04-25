import Navbar from "./Navbar";
import './EditUser.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import addImage from '../photo/invite.png'
import { toast } from "react-toastify";

const EditUser = () => {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [sName, setSName] = useState("");
    const [phone, setPhone] = useState("");
    const [bDay, setBDay] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, password, name, sName, phone, gender, bDay, email };
        //console.log(regObj);

        fetch("http://localhost:8000/user/" + empid, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regObj)
        }).then((res) => {
            toast.success('Edit successfully.');
            navigate('/userManagement');
        }).catch((err) => {
            toast.error('Failed: ' + err.message);
        });

    }

    const { empid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/user/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setId(resp.id);
            setPassword(resp.password);
            setName(resp.name);
            setSName(resp.sName);
            setPhone(resp.phone);
            setBDay(resp.bDay);
            setGender(resp.gender);
            setEmail(resp.email);
        }).catch((err) => {
            console.log(err.message)
        });

    }, []);

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>User Management {">"} Editor</h2>
                    <div className="add-image">
                        <img src={addImage} alt="add" width="25" height="25" className="imgBtn"></img>
                    </div>
                </div>
                <div className="edit-container" style={{ marginTop: '40px' }}>
                    <form className="form" onSubmit={handleSubmit}>
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
                        <div className="input-container">
                            <div className="input-wrapper">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    className="input"
                                    type="phone"
                                    id="phone"
                                    placeholder="Enter your new phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="gender">Gender</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="gender"
                                    placeholder="Enter your new Gender"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="bDay">Birthday</label>
                            <input
                                className="input"
                                type="date"
                                id="bDay"
                                placeholder="Enter your new birthday"
                                value={bDay}
                                onChange={e => setBDay(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                placeholder="Enter your new Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="button2-container">
                        <button className="button2" onClick={() => navigate('/userManagement')}>Cancel</button>
                            <button className="button2" type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;