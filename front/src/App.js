import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Search from './components/Search';
import BookList from './components/BookList';
import AreaList from './components/AreaList';
import FeatureList from './components/FeatureList';
import FaceList from './components/FaceList';
import ClimbList from './components/ClimbList';
import EditPortal from './components/EditPortal';
import Layout from './components/Layout';

function App() {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setLoggedIn(Object.keys(sessionStorage).indexOf("auth_token") >= 0 || Object.keys(localStorage).indexOf("auth_token") >= 0);
  }, []);

  return (
    <BrowserRouter>
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/books" element={<BookList loggedIn={loggedIn}/>}/>
          <Route exact path="/areas" element={<AreaList loggedIn={loggedIn}/>}/>
          <Route exact path="/faces" element={<FaceList loggedIn={loggedIn}/>}/>
          <Route exact path="/features" element={<FeatureList loggedIn={loggedIn}/>}/>
          <Route exact path="/climbs" element={<ClimbList loggedIn={loggedIn}/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/create" element={<EditPortal/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
