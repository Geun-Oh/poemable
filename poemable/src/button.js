import React from "react";
import styles from './poemIt.module.scss';

function Button ({ children, onClick, style }) {
    return (
        <button className={`${styles.button}`} onClick={onClick} style={style}>
            {children}
        </button>
    )
}

export default Button;