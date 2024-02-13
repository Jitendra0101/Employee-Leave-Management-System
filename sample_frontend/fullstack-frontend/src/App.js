import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavbarAD from './layout/AdminLayout/NavbarAD';

import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import Login from './pages/Login';
import AddHr from './users/AddHR';

function App() {
  return <div className="App">
    
<Router>
  <Routes>
    <Route exact path = "/" element={<Login/>}/>
    <Route exact path = "/startAD" element={<NavbarAD/>}/>
    <Route exact path = "/addHR" element={<AddHr />}/>
    <Route exact path = "/home" element={<Home/>}/>
    <Route exact path='/adduser' element={<AddUser />}></Route>
    <Route exact path='/viewuser/:id' element={<ViewUser/>}></Route>
    
    <Route exact path='/edituser/:id' element={<EditUser/>}/>
  </Routes>
</Router>
    </div>
}

export default App;
