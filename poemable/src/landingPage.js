import React, { useState, useEffect, useCallback } from 'react';
import { listPoems } from './graphql/queries';
import { onCreatePoem } from './graphql/subscriptions';
import { API } from 'aws-amplify';
import PoemCard from './poemCard';

function LandingPage() {
    const [poemList, setPoemList] = useState([])

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

    // useEffect(() => {
    //     fetchPoem()
    // }, [fetchPoem]) // 함수를 밖으로 빼서 useCallback을 입히고 싶은데...

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

    return (
        <>
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <div key={index}>
                                <PoemCard poem={poem} />
                            </div>
                        ))
            }
        </>
    )
}

export default LandingPage;