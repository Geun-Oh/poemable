import React from 'react';

function PoemCard({ poem }) {
    return (
                <wrapper>
                    <p>{poem.name}</p>
                    <p style={{fontSize: "15px"}}>-{poem.author}-</p>
                    <textarea style={{fontSize: "20px", border: "none", textAlign: "center", width: "400px", height: "450px", marginTop: "20px"}}>{poem.detail}</textarea>
                </wrapper>
    )
}

export default PoemCard;