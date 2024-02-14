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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/addworker" element={<AddWorker />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employee/:id/addleave" element={<AddLeave />} />
          <Route path="/hr" element={<HrDashboard />} />
          <Route path="/employee/:id" element={<EmployeeDashboard />} />
          <Route exact path='/viewworker/:id' element={<ViewWorker />} />
          <Route exact path='/editworker/:id' element={<EditWorker />} />
          <Route exact path='/employee/:id/details' element={<MyDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
