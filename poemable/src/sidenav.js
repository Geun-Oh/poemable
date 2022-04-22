import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './poemIt.module.scss';

function SideNav () {
    const location = useLocation()

    return (
        <div className={`${styles.sideNav}`}>
            <hr />
            {
                location.pathname !== "/profile" ? <Link to="/profile"><p>Profile</p></Link> : <Link to="/"><p>Main</p></Link>
            }
            <hr />
            <p>How?</p>
            <hr />
            <p>Project Config</p>
            <hr />
        </div>
    )
}

export default SideNav;