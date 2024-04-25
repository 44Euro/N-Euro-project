import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserDetail = () => {

    const navigate = useNavigate();
    const [userDetail, userDetailUpdate] = useState([]);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [sName, setSName] = useState("");
    const [phone, setPhone] = useState("");
    const [bDay, setBDay] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/user/" + username)
            .then((res) => res.json())
            .then((resp) => {
                //console.log(resp);
                userDetailUpdate(resp);
                setId(resp.id);
                setPassword(resp.password);
                setName(resp.name);
                setSName(resp.sName);
                setPhone(resp.phone);
                setBDay(resp.bDay);
                setGender(resp.gender);
                setEmail(resp.email);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, []);

    const handleSubmit = (e) => {
        let username = sessionStorage.getItem('username');
        e.preventDefault();
        let regObj = { id, password, name, sName, phone, gender, bDay, email };
        //console.log(regObj);

        fetch("http://localhost:8000/user/" + username, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regObj)
        }).then((res) => {
            toast.success('Edit successfully.');
            navigate('/reserveTable');
        }).catch((err) => {
            toast.error('Failed: ' + err.message);
        });
    };

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>User Detail</h2>
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
                            <button className="button2" onClick={() => navigate('/reserveTable')}>Cancel</button>
                            <button className="button2" type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;