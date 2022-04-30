import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './poemIt.module.scss';

function SideNav () {
    const location = useLocation()

    return (
        <div className={`${styles.sideNav}`}>
            <hr />
            {
                location.pathname !== "/profile" ? <Link to="/profile" style={{ textDecoration: "none" }}><p>Profile</p></Link> : <Link to="/landing" style={{ textDecoration: "none" }}><p>Main</p></Link>
            }
            <hr />
            <Link to="/" style={{ textDecoration: "none" }}><p>Intro</p></Link>
            <hr />
            <p>Project Config</p>
            <hr />
        </div>
    )
}

export default SideNav;