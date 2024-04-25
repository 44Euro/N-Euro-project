import Navbar from "./Navbar";
import addImage from '../photo/plus.png';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import deleteImg from '../photo/delete.png';
import editImg from '../photo/pencil.png';
import { toast } from "react-toastify";
import correctImg from '../photo/correct.png'
import incorrectImg from '../photo/remove.png'


const TableManage = () => {
    const [tableList, setTableList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/');
        }

        fetch("http://localhost:8000/table")
            .then((res) => res.json())
            .then((resp) => {
                setTableList(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const handleEdit = (id) => {
        navigate(`/editTable/${id}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate indexes of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableList && tableList.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="menuManagement">
            <Navbar />
            <div className="content">
                <div className="line">
                    <h2>Table Management</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Number</td>
                            <td>Available</td>
                            <td>Position</td>
                            <td>Size</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems &&
                            currentItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        {item.isFree ? (
                                            <img src={correctImg} alt="Available" width="20" height="20" />
                                        ) : (
                                            <img src={incorrectImg} alt="Not Available" width="20" height="20" />
                                        )}
                                    </td>
                                    <td>{item.position}</td>
                                    <td>{item.size}</td>
                                    <td><img src={editImg} width="20" height="20" className="tableImgBtn" onClick={() => { handleEdit(item.id) }} style={{ cursor: 'pointer' }}></img></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={prevPage} disabled={currentPage === 1} className="button2">Previous</button>
                    <span style={{ marginRight: '50px', marginTop: '35px' }}>{`${currentPage}/3`}</span>
                    <button onClick={nextPage} disabled={indexOfLastItem >= tableList.length} className="button2">Next</button>
                </div>
            </div>
        </div>
    );
}

export default TableManage;
