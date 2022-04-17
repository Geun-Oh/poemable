import React, { useState, useEffect, useCallback, useRef } from 'react';
import { listPoems } from './graphql/queries';
import { onCreatePoem } from './graphql/subscriptions';
import { API } from 'aws-amplify';
import PoemCard from './poemCard';
import styles from './poemIt.module.scss';
import rightArrow from './rightArrow.svg';
import leftArrow from './leftArrow.svg';

function LandingPage() {
    const [poemList, setPoemList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const slide = useRef()
    const fetchPoem = useCallback( async () => {
        try {
            const poemData = await API.graphql({
                query: listPoems
            })
            setPoemList(poemData.data.listPoems.items)
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    useEffect(() => {
        fetchPoem()
        const subscription = API.graphql({
            query: onCreatePoem
        }).subscribe({
            next: poemData => {
                const poems = poemData.value.data.onCreatePoem
                setPoemList(poems)
            }
        })
        return () => subscription.unsubscribe()
    })

    const onClick = () => {
        slide.current.style = "transform: translateX()"
    }

    return (
        <>
        <div className={`${styles.landingPage}`} style={{transform: `translateX(${100 / poemList.length}%)`}} ref={slide}>
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <>
                                <PoemCard poem={poem} key={index} />
                            </>
                        ))
            }
        </div>
        <div className={`${styles.rightScreen}`}>
            <img src={rightArrow} alt="rightArrow" />
        </div>
        <div className={`${styles.leftScreen}`}>
            <img src={leftArrow} alt="leftArrow" />
        </div>
        </>
    )
}

export default LandingPage;