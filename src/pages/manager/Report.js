import Navbar from "./Navbar";
import './Promotion.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import inspectImg from '../photo/checked.png';
import { toast } from "react-toastify";

const Report = () => {

    const [reportList, listUpdate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/report").then((res) => {
            return res.json();
        }).then((resp) => {
            listUpdate(resp);
            //console.log(resp);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    const handleShow = (id) => {
        navigate ("/showReport/"+ id);
    }

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Summary Reports</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Month</td>
                            <td>Year</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList &&
                            reportList.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.year}</td>
                                    <td><img src={inspectImg} width="25" height="25" className="tableImgBtn" onClick={() => { handleShow(item.id) }} style={{ cursor: 'pointer' }}></img></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <button className="button2" style={{ cursor: 'pointer' }} onClick={() => {toast.success('Printed')}}>Print</button>
            </div>
        </div>
    );
}

export default Report;