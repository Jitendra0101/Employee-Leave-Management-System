import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import AddWorker from './components/WorkerActions/AddWorker';
import HrDashboard from './components/HrDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import ViewWorker from './components/WorkerActions/ViewWorker';
import EditWorker from './components/WorkerActions/EditWorker';
import MyDetails from './components/EmployeeActions/MyDetails';
import AddEmployee from './components/WorkerActions/AddEmployee';
import AddLeave from './components/EmployeeActions/AddLeave';
import ManageLeave from './components/HrActions/ManageLeave';
import HrDetails from './components/HrActions/HrDetails';
import AdminDetails from './components/AdminDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/:adminid" element={<AdminDashboard />} />
          <Route path="/admin/:adminid/details" element={<AdminDetails />} />
          <Route path="/addworker" element={<AddWorker />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employee/:id/addleave" element={<AddLeave />} />
          <Route path="/hr/:id" element={<HrDashboard />} />
          <Route path="/employee/:id" element={<EmployeeDashboard />} />
          <Route exact path='/viewworker/:id' element={<ViewWorker />} />
          <Route exact path='/editworker/:id' element={<EditWorker />} />
          <Route exact path='/employee/:id/details' element={<MyDetails />} />
          <Route exact path='/hr/:id/details' element={<HrDetails />} />
          <Route exact path='/hr/:hrid/manageleave/:workerid' element={<ManageLeave />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
