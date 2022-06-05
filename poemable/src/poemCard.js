import React from 'react';
import styles from './poemIt.module.scss';

function PoemCard({ poem }) {
    return (
                <wrapper>
                    <p>{poem.name}</p>
                    <p style={{fontSize: "15px"}}>-{poem.author}-</p>
                    <textarea className={`${styles.poemCard}`} disabled>{poem.detail}</textarea>
                </wrapper>
    )
}

export default PoemCard;