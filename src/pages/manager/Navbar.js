import profileImage from "../photo/user.jpg";
import userImage from "../photo/group.png";
import promotionImage from "../photo/promotions.png";
import reportImage from "../photo/report.png";
import logoutImage from "../photo/logout.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../Navbar.css';

const Navbar = () => {

    const [displayName, setDisplayName] = useState(null);
    const [displayEmail, setDisplayEmail] = useState(null);

    useEffect(() => {
        let name = sessionStorage.getItem('name');
        let sName = sessionStorage.getItem('sName');
        let email = sessionStorage.getItem('email');
        setDisplayName(name + ' ' + sName)
        setDisplayEmail(email)
    }, []);

    return (
        <div className="container-navbar">
            <div className="profile">
                <div className="picture">
                    <img src={profileImage} alt="user" width="80" height="80" />
                </div>
                <div className="userData">
                    <p>{displayName}</p>
                    <p>{displayEmail}</p>
                </div>
            </div>
            <div className="menu">
                <div className="menu-1">
                    <img src={userImage} alt="profile" width="25" height="25" />
                    <Link className="link" to={'/userManagement'}>User Management</Link>
                </div>
                <div className="menu-1">
                    <img src={promotionImage} alt="promotion" width="25" height="25" />
                    <Link className="link" to={'/promotion'}>Promotion Management</Link>
                </div>
                <div className="menu-1">
                    <img src={reportImage} alt="report" width="25" height="25" />
                    <Link className="link" to={'/report'}>Summary Reports</Link>
                </div>
                <div className="menu-1">
                    <img src={logoutImage} alt="logout" width="25" height="25" />
                    <Link className="link" to={'/'}>Logout</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;