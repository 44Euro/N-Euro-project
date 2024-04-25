import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sName, setSName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); // Moved useNavigate hook here

  useEffect(() => {
    sessionStorage.clear();
  },[])

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('proceed');
      fetch("http://localhost:8000/user/" + username)
        .then((res) => res.json())
        .then((resp) => {
          //console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error('Please Enter valid username');
          } else {
            if (resp.password === password) {
              toast.success('Success');
              const { name, sName, email } = resp;
              setUsername(username);
              setName(name);
              setSName(sName);
              setEmail(email);
              // Store user information in sessionStorage
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('name', name);
              sessionStorage.setItem('sName', sName);
              sessionStorage.setItem('email', email);
              if (resp.id === 'manager01') {
                navigate('/userManagement');
              } else if (resp.id === 'employee01') {
                navigate('/menuManagement');
              } else {
                navigate('/reserveTable');
              }
            } else {
              toast.error('Please Enter valid credentials');
            }
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please enter username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please enter password');
    }
    return result; // Make sure to return the result
  };

  return (
    <div className='login'>
      <div className="container">
        <h1 className='h1'>Login</h1>
        <form className='form' onSubmit={ProceedLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <div></div>
            <input className='input'
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div></div>
            <input className='input'
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className='button' type="submit">Enter</button>
          </div>
        </form>
        <div className='link'>
          <Link to="/signup">Sign Up?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
