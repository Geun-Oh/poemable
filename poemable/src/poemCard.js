import React from 'react';

function PoemCard({ poem }) {
    return (
            <wrapper>
                <p>{poem.name}</p>
                <p>-{poem.author}-</p>
                <span>{poem.detail}</span>
            </wrapper>
    )
}

export default PoemCard;