import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MenuManagement from './pages/employee/MenuManagement';
import UserManagement from './pages/manager/UserManagement';
import ReserveTable from './pages/customer/ReserveTable';
import EditUser from './pages/manager/EditUser';
import Promotion from './pages/manager/Promotion';
import EditPromo from './pages/manager/EditPromo';
import AddPromo from './pages/manager/AddPromo';
import Report from './pages/manager/Report';
import ShowReport from './pages/manager/ShowReport';
import EditMenu from './pages/employee/EditMenu';
import AddMenu from './pages/employee/AddMenu';
import TableManage from './pages/employee/TableManage';
import TableManage2 from './pages/employee/TableManage';
import TableManage3 from './pages/employee/TableManage';
import TableManage4 from './pages/employee/TableManage';
import EditTable from './pages/employee/EditTable';
import Order from './pages/customer/Order';
import CheckOut from './pages/customer/CheckOut';
import ConfirmTable from './pages/customer/ConfirmTable';
import OrderHistory from './pages/employee/OrderHis';
import OrderHistoryU from './pages/customer/OrderHistoryU';
import PromotionE from './pages/employee/Promotion';
import PromotionU from './pages/customer/PromotionU';
import TableDetail from './pages/customer/TableDetail';
import UserDetail from './pages/customer/UserDetail';
import Payment from './pages/employee/Payment';
import Bill from './pages/employee/Bill';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/menuManagement' element={<MenuManagement />}></Route>
          <Route path='/userManagement' element={<UserManagement />}></Route>
          <Route path='/reserveTable' element={<ReserveTable />}></Route>
          <Route path='/editUser/:empid' element={<EditUser />}></Route>
          <Route path='/promotion' element={<Promotion />}></Route>
          <Route path='/addPromo' element={<AddPromo />}></Route>
          <Route path='/editPromo/:empid' element={<EditPromo />}></Route>
          <Route path='/report' element={<Report />}></Route>
          <Route path='/showReport/:empid' element={<ShowReport />}></Route>
          <Route path='/editMenu/:empid' element={<EditMenu />}></Route>
          <Route path='/addMenu' element={<AddMenu />}></Route>
          <Route path='/tableManage' element={<TableManage/>}></Route>
          <Route path='/edittable/:empid' element={<EditTable/>}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path='/checkout' element={<CheckOut />}></Route>
          <Route path='/confirmTable/:empid' element={<ConfirmTable/>}></Route>
          <Route path='/orderHistory' element={<OrderHistory/>}></Route>
          <Route path='/orderHistoryU' element={<OrderHistoryU/>}></Route>
          <Route path='/PromotionE' element={<PromotionE/>}></Route>
          <Route path='/PromotionU' element={<PromotionU/>}></Route>
          <Route path='/tableDetail' element={<TableDetail/>}></Route>
          <Route path='/userDetail' element={<UserDetail/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='/bill/:empid' element={<Bill/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
