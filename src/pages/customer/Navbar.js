import profileImage from "../photo/user.jpg";
import tableImage from "../photo/table.png";
import detailImage from "../photo/chair.png"
import orderHistoryImg from "../photo/purchase-order.png";
import promotionImage from "../photo/promotions.png"
import orderImg from "../photo/add.png"
import userImg from "../photo/people.png"
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
                    <img src={tableImage} alt="table" width="25" height="25" />
                    <Link className="link" to={'/reserveTable'}>Reserve Table</Link>
                </div>
                <div className="menu-1">
                    <img src={detailImage} alt="table" width="25" height="25" />
                    <Link className="link" to={'/tableDetail'}>Table Detail</Link>
                </div>

                <div className="menu-1">
                    <img src={orderImg } alt="order" width="25" height="25" />
                    <Link className="link" to={'/order'}>Order</Link>
                </div>
                <div className="menu-1">
                    <img src={orderHistoryImg } alt="orderHis" width="25" height="25" />
                    <Link className="link" to={'/orderHistoryU'}>Order History</Link>
                </div>
                <div className="menu-1">
                    <img src={userImg } alt="user" width="25" height="25" />
                    <Link className="link" to={'/userDetail'}>User Detail</Link>
                </div>

                <div className="menu-1">
                    <img src={promotionImage } alt="promotion" width="25" height="25" />
                    <Link className="link" to={'/PromotionU'}>Promotion</Link>
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