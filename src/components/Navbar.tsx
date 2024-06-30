import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useState } from 'react';
import { Flex } from "./Flex.tsx";



interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className={styles.nav}>
      <Flex preset="centered" style={{ padding: '1rem' }}>
        <ul className={styles.navElements}>
          {isLoggedIn ? (
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

