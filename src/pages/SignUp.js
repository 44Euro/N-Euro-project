import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sName, setSName] = useState("");
  const [phone, setPhone] = useState("");
  const [bDay, setBDay] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = { id, password, name, sName, phone, gender, bDay, email };
    //console.log(regObj);

    fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(regObj)
    }).then((res) => {
      toast.success('Registered successfully.');
      navigate('/');
    }).catch((err) => {
      toast.error('Failed: ' + err.message);
    });

  }

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <h1 className="h1">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>

        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                className="input"
                type="text"
                id="name"
                placeholder="Enter your name"
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
                placeholder="Enter your surname"
                value={sName}
                onChange={e => setSName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="phone">Phone</label>
              <input
                className="input"
                type="phone"
                id="phone"
                placeholder="Enter your phone"
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
                placeholder="Enter your Gender"
                value={gender}
                onChange={e => setGender(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="bDay">Birthday</label>
          <input className="input"
            type="date"
            id="bDay"
            placeholder="Enter your birthday"
            value={bDay}
            onChange={e => setBDay(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input className="input"
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button className="button" type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
