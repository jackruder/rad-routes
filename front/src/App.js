import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Search from './components/Search';
import Climb from './components/Climb';
import EditPortal from './components/EditPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/climb/:id" element={<Climb/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/editportal" element={<EditPortal/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
