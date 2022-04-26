import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import { currentUserContext } from "./context";
import { API, graphqlOperation } from 'aws-amplify';
import { listPoems } from './graphql/queries';
import { deletePoem } from "./graphql/mutations";
import { onUpdatePoem, onDeletePoem } from './graphql/subscriptions';
import styles from './poemIt.module.scss';
import ForwardUpdateModal from "./updateModal";

function ProfilePage () {
    const { currentUser } = useContext(currentUserContext)
    const [poemList, setPoemList] = useState([])
    const [updateId, setUpdateId] = useState("")
    const updateModalRef = useRef()

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

    const onDelete = useCallback( async (id) => {
        try {
            await API.graphql(graphqlOperation(deletePoem, { input: { id: id } }))
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    const onUpdate = useCallback( async ( id ) => {
        setUpdateId(id)
        updateModalRef.current.style = "z-index: 999; opacity: 1;"
    }, [])

    useEffect(() => {
        fetchPoem()
    }, [])

    useEffect(() => {
        const subscription = API.graphql({
            query: onUpdatePoem
        }).subscribe({
            next: () => fetchPoem()
        })
        return () => subscription.unsubscribe()
    })

    useEffect(() => {
        const subscription = API.graphql({
            query: onDeletePoem
        }).subscribe({
            next: () => fetchPoem()
        })
        return () => subscription.unsubscribe()
    })

    return(
        <div className={`${styles.profilePage}`}>
            <ForwardUpdateModal id={updateId} ref={updateModalRef} />
            <p>{currentUser} Profile</p>
            <hr />
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <div key={index}>
                                <p>{poem.name}</p>
                                <p>-{poem.author}-</p>
                                <p>{poem.detail}</p>
                                <button onClick={() => onDelete(poem.id)}>Delete</button>
                                <button onClick={() => onUpdate(poem.id)}>Update</button>
                                <hr />
                            </div>
                        ))
            }
        </div>
    )
}

export default ProfilePage;