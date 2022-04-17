import React from 'react';

function PoemCard({ poem }) {
    return (
        <div>
            <h1>{poem.name}</h1>
            <h3>-{poem.author}-</h3>
            <p>{poem.detail}</p>
            <hr />
    </div>
    )
}

export default PoemCard;