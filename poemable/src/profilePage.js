import React, { useState, useContext, useCallback, useEffect } from "react";
import { currentUserContext } from "./context";
import { API } from 'aws-amplify';
import { listPoems } from './graphql/queries';
import { deletePoem } from "./graphql/mutations";
import { onUpdatePoem, onDeletePoem } from './graphql/subscriptions';
import styles from './poemIt.module.scss';

function ProfilePage () {
    const { currentUser, setCurrentUserHandler } = useContext(currentUserContext)
    const [poemList, setPoemList] = useState([])

    const fetchPoem = useCallback( async () => {
        try {
            const poemData = await API.graphql({
                query: listPoems, filter: {author: {eq: "오형근"}}
            })
            setPoemList(poemData.data.listPoems.items)
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    const deletePoem = useCallback( async ({ id }) => {
        try {
            const poemData = await API.graphql({
                query: deletePoem, input: { id }
            })
            console.log(poemData.data.listPoems.items)
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    useEffect(() => {
        fetchPoem()
    }, [])

    useEffect(() => {
        const subscription = API.graphql({
            query: onUpdatePoem
        }).subscribe({
            next: poemData => {
                const poems = poemData.value.data.onUpdatePoem
                setPoemList(poems)
            }
        })
        return () => subscription.unsubscribe()
    })

    useEffect(() => {
        const subscription = API.graphql({
            query: onDeletePoem
        }).subscribe({
            next: poemData => {
                const poems = poemData.value.data.onDeletePoem
                setPoemList(poems)
            }
        })
        return () => subscription.unsubscribe()
    })

    return(
        <div className={`${styles.profilePage}`}>
            <p>{currentUser} Profile</p>
            <hr />
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <div key={index}>
                                <p>{poem.name}</p>
                                <p>-{poem.author}-</p>
                                <p>{poem.detail}</p>
                                <button onClick={deletePoem(poem.id)}>Delete</button>
                                <hr />
                            </div>
                        ))
            }
        </div>
    )
}

export default ProfilePage;