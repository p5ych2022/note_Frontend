import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useState } from 'react';
import { Flex } from "./Flex.tsx";


const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className={styles.nav}>
      <Flex preset="centered" style={{ padding: '1rem' }}>
        <ul className={styles.navElements}>
          {!isLoggedIn ? (
            <>
              <li className={styles.clickable}>
                <Link to="/notes">Notes</Link>
              </li>
              <li className={styles.clickable}>
                <Link to="/create">Create Note</Link>
              </li>
              <li className={styles.clickable} onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.clickable}>
                <Link to="/login">Login</Link>
              </li>
              <li className={styles.clickable}>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </Flex>
    </nav>
  );
};

export default Navbar;

