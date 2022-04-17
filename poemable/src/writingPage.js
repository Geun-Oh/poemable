import React, { useState, useEffect } from 'react';
import { createPoem } from './graphql/mutations';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from './poemIt.module.scss';

function WritingPage() {
    const [poem, setPoem] = useState({
        title: "",
        detail: ""
    })
    const [userInfo, setUserInfo] = useState({})
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

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <div className={`${styles.writingPage}`}>
            <wrapper>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={poem.title}
                    onChange={(event) => setPoem({ ...poem, title: event.target.value})}
                />
                <div>
                    <textarea
                        type="text"
                        name="detail"
                        placeholder="detail"
                        value={poem.detail}
                        onChange={(event) => setPoem({ ...poem, detail: event.target.value})}
                    />
                </div>
            </wrapper>
            <button
                onClick={onClick}
            >POEM IT NOW!</button>
        </div>
    )
}

export default WritingPage;