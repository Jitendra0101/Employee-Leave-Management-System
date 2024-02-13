import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Import the Login component
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import AddWorker from './components/AddWorker';
import AddEmployee from './components/AddEmployee';
import HrDashboard from './components/HrDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import AddLeave from './components/AddLeave';

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
          <Route path="/addleave" element={<AddLeave />} />
          <Route path="/hr" element={<HrDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          {/* <Route exact path='/viewuser/:id' element={<ViewUser />} />
          <Route exact path='/edituser/:id' element={<EditUser />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
