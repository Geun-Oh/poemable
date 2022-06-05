import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { listPoems } from './graphql/queries';
import { onCreatePoem } from './graphql/subscriptions';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import PoemCard from './poemCard';
import styles from './poemIt.module.scss';
import rightArrow from './rightArrow.svg';
import leftArrow from './leftArrow.svg';
import Button from './button';
import { currentUserContext } from './context';
import styled from 'styled-components';

function LandingPage() {
    const [poemList, setPoemList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(-1)
    const { currentUser, setCurrentUserHandler } = useContext(currentUserContext)
    const leftRef = useRef();
    const rightRef = useRef();
    const fetchPoem = useCallback( async () => {
        try {
            const poemData = await API.graphql({
                query: listPoems
            })
            setPoemList(() => poemData.data.listPoems.items)
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    const checkUser = async () => {
        const user = await Auth.currentUserInfo()
        setCurrentUserHandler(user)
    }

    useEffect(() => {
        checkUser()
        fetchPoem()

        const subscription = API.graphql({
            query: onCreatePoem
        }).subscribe({
            next: poemData => {
                const poems = poemData.value.data.onCreatePoem
                setPoemList(poems)
                setCurrentIndex(() => parseInt(poems.length / 2 * -1))
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    // if (currentIndex > 0) {
    //     setCurrentIndex(prev => prev - 1)
    //     console.log(currentIndex)
    // }
    
    // if (currentIndex < 1 - poemList.length) {
    //     setCurrentIndex(prev => prev + 1)
    //     console.log(currentIndex)
    // }
    
    if(currentIndex === 0) {
        leftRef.current.style = "display: none;"
    } else if(currentIndex < 0 && currentIndex > -(poemList.length - 1)) {
        leftRef.current.style = "display: flex;"
        rightRef.current.style = "display: flex;"
    } else if(currentIndex === -(poemList.length - 1)) {
        rightRef.current.style = "display: none;"
    }

    return (
        <div style={{ overflow: "hidden" }}>
        <div className={`${styles.nav}`}>
            <div>Poem.IT</div>
            <Link to="/profile" style={{ textDecoration: "none" }}><p>{currentUser.username}</p></Link>
        </div>
        <StyledCard className={`${styles.landingPage}`} poemList={poemList} currentIndex={currentIndex}>
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <>
                                <PoemCard poem={poem} key={index} />
                            </>
                        ))
            }
        </StyledCard>
        <div className={`${styles.rightScreen}`} ref={rightRef}>
            <img src={rightArrow} alt="rightArrow" onClick={() => setCurrentIndex((prev => prev - 1))} />
        </div>
        <div className={`${styles.leftScreen}`} ref={leftRef}>
            <img src={leftArrow} alt="leftArrow" onClick={() => setCurrentIndex((prev => prev + 1))} />
        </div>
        <Link to="/writedown">
            <Button 
                style={{ position: "absolute", bottom: "10px", left: "calc(50vw - 120px)" }}
            >POEM IT NOW!</Button>
        </Link>
        </div>
    )
}

export default LandingPage;

const StyledCard = styled.div`
width: ${({poemList}) => poemList.length * 440}px;
transform: translateX(${({currentIndex}) => currentIndex * 440}px);
@media screen and (max-width: 768px) {
    width: ${({poemList}) => poemList.length * 340}px;
    transform: translateX(${({currentIndex}) => currentIndex * 340}px);
}
`