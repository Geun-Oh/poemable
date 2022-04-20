import React, { useState, useEffect, useCallback, useContext } from 'react';
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

function LandingPage() {
    const [poemList, setPoemList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const { currentUser, setCurrentUserHandler } = useContext(currentUserContext)
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

    const checkUser = async () => {
        const user = await Auth.currentUserInfo()
        setCurrentUserHandler(user.username)
    }

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
        fetchPoem()
        const subscription = API.graphql({
            query: onCreatePoem
        }).subscribe({
            next: poemData => {
                const poems = poemData.value.data.onCreatePoem
                setPoemList(poems)
                setCurrentIndex(parseInt(poems.length / 2))
                console.log(currentIndex)
            }
        })
        return () => subscription.unsubscribe()
    })

    return (
        <>
        <div className={`${styles.nav}`}>
            <div>Poem.IT</div>
            <p>{currentUser}</p>
        </div>
        <div className={`${styles.landingPage}`} style={{ width: `${poemList.length * 440}px`, transform: `translateX(${currentIndex * 440}px)` }}>
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
            <img src={rightArrow} alt="rightArrow" onClick={() => setCurrentIndex((prev => prev - 1))} />
        </div>
        <div className={`${styles.leftScreen}`}>
            <img src={leftArrow} alt="leftArrow" onClick={() => setCurrentIndex((prev => prev + 1))} />
        </div>
        <Link to="/writedown">
            <Button 
                style={{ position: "absolute", bottom: "40px", left: "calc(50vw - 120px)" }}
            >POEM IT NOW!</Button>
        </Link>
        </>
    )
}

export default LandingPage;