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
                query: listPoems, filter: {author: {eq: currentUser}}
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
            <p>{currentUser.username} | {currentUser.attributes.email}</p>
            <hr />
            {
                poemList === undefined ? <p>nothing...</p> : 
                        poemList.map((poem, index) => (
                            <div key={index} className={`${styles.profilePoemList}`}>
                                <p style={{ fontSize: "20px" }}>{poem.name}</p>
                                <p style={{ fontSize: "16px" }}>{poem.detail}</p>
                                <wrapper>
                                    <button onClick={() => onUpdate(poem.id)} style={{ backgroundColor: "#6666cc" }}>수정</button>
                                    <button onClick={() => onDelete(poem.id)} style={{ backgroundColor: "#FF6565" }}>삭제</button>
                                </wrapper>
                                <hr />
                            </div>
                        ))
            }
        </div>
    )
}

export default ProfilePage;