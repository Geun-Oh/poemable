import React, { useState, useEffect } from 'react';
import { createPoem } from './graphql/mutations';
import { listPoems } from './graphql/queries';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';

function WritePoem() {
    const [poem, setPoem] = useState({
        title: "",
        detail: ""
    })
    const [userInfo, setUserInfo] = useState({})
    const [poemList, setPoemList] = useState([])
    const checkUser = async () => {
        const user = await Auth.currentUserInfo()
        setUserInfo(user)
    }
    const onClick = async () => {
        try {
            await API.graphql({
                query: createPoem,
                variables: { input: { name: poem.title, author: userInfo.username, detail: poem.detail } }
            })
        } catch (err) {
            console.log("error: ", err)
        }
    }
    
    const onChange = async () => {
        try {
            const poemData = await API.graphql({
                query: listPoems
            })
            const poems = poemData.data.listPoems.items
            setPoemList(poemData.data.listPoems.items)
            console.log(poems)
        } catch (err) {
            console.log("error: ", err)
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
        onChange()
    }, [poem])

    return (
        <>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={poem.title}
                onChange={(event) => setPoem({ ...poem, title: event.target.value})}
            />
            <input
                type="text"
                name="detail"
                placeholder="detail"
                value={poem.detail}
                onChange={(event) => setPoem({ ...poem, detail: event.target.value})}
            />
            <button
                onClick={onClick}
            >Done!</button>
            {/* {
                poemList && poemList.product.map((poem, index) => (
                    <div>
                        <h1>{poem.name}</h1>
                        <h3>-{poem.author}-</h3>
                        <hr />
                        <p>{poem.detail}</p>
                    </div>
                ))
            } */}
        </>
    )
}

export default WritePoem;