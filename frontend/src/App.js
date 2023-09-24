import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Login } from './screens/Login';
import { Home } from './screens/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  
  const checkIfUserIsLoggedIn = () => {
    const data = localStorage.getItem('loggedInUser');
    const loggedInUser = JSON.parse(data)
    console.log(loggedInUser)
    
    if (loggedInUser && loggedInUser.isLoggedIn) {
      const currentTime = new Date().getTime();
      const lastLoginTime = loggedInUser.loginTime;
      const timeDifference = (currentTime - lastLoginTime) / 1000;

      if (timeDifference <= 300) {
        setUser(loggedInUser);
        return true;
      } else {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('authToken');
      }
    }

    return false;
  };
  
  const startLogoutTimer = () => {
    const timer = setTimeout(logoutUser, 5 * 60 * 1000);
    setLogoutTimer(timer);
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };

  const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const userIsLoggedIn = checkIfUserIsLoggedIn();
    setIsLoggedIn(userIsLoggedIn);

    if (userIsLoggedIn) {
      startLogoutTimer();
    }
  }, []);
  
  return (
    <>

      <div className="container mt-5">
        <ul className="nav">
          <p>{isLoggedIn}</p>
          {isLoggedIn && <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>}
          {!isLoggedIn && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
        </ul>

      </div>

      <Routes>
        {isLoggedIn && <Route exact path="/home" element={<Home user={user} onLogout={logoutUser} />} />}
        <Route exact path="/login" element={<Login onSuccess={resetLogoutTimer} onLogin={user => setUser(user)} />} />
      </Routes>
    </>
  );
}

export default App;
