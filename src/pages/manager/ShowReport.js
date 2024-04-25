import Navbar from "./Navbar";
import './ShowReport.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ShowReport = () => {

    const { empid } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }
        fetch("http://localhost:8000/report/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setId(resp.id);
            setYear(resp.year);
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Summary Reports {">"} {id} {year}</h2>
                </div>
                <table className="report">
                    <thead>
                        <tr>
                            <td>13/06/2566</td><td></td><td></td><td></td><td></td><td>หน้า1</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>รายงานสรุปรายรับ</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>วันที่สรุปการเข้าใช้บริการ : วัน/เดือน/ปี</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ชื่อผู้จอง</td><td>หมายโต๊ะ</td><td>ผู้รับเงิน</td><td>จำนวนเงิน</td><td>ยอดชำระ</td><td>เงินทอน</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bunyapu</td><td>101</td><td>Kanom</td><td>570.00</td><td>1000.00</td><td>430.00</td>
                        </tr>
                        <tr>
                            <td>Chonnipa</td><td>102</td><td>Kanom</td><td>700.00</td><td>1000.00</td><td>300.00</td>
                        </tr>
                        <tr>
                            <td>Thanaree</td><td>106</td><td>Pangpang</td><td>340.00</td><td>500.00</td><td>160.00</td>
                        </tr>
                        <tr>
                            <td>Kwantipo</td><td>109</td><td>Pangpang</td><td>420.00</td><td>420.00</td><td>0.00</td>
                        </tr>
                        <tr>
                            <td>Jakkapob</td><td>110</td><td>Kanom</td><td>505.00</td><td>520.00</td><td>15.00</td>
                        </tr>
                        <tr>
                            <td>Sasima</td><td>112</td><td>Pangpang</td><td>660.00</td><td>700.00</td><td>40.00</td>
                        </tr>
                        <tr>
                            <td>Jacob</td><td>115</td><td>Pangpang</td><td>1230.00</td><td>1300.00</td><td>70.00</td>
                        </tr>
                        <tr>
                            <td></td><td>รายรับทั้งหมด</td><td>ของ วัน/เดือน/ปี</td><td>4425.00</td><td>5440.00</td><td>1015.00</td>
                        </tr>
                    </tbody>
                </table>
                <button className="button2" onClick={() => { navigate("/report") }}>Back</button>
            </div>
        </div>
    );
}

export default ShowReport;