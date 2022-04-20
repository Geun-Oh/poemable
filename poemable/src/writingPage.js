import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createPoem } from './graphql/mutations';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from './poemIt.module.scss';
import Button from './button';
import { currentUserContext } from './context';

function WritingPage() {
    const { currentUser, setCurrentUserHandler } = useContext(currentUserContext)
    const [poem, setPoem] = useState({
        title: "",
        detail: ""
    })

    const onClick = async () => {
        try {
            await API.graphql({
                query: createPoem,
                variables: { input: { name: poem.title, author: currentUser, detail: poem.detail } }
            })
        } catch (err) {
            console.log("error: ", err)
        }
    }

    const checkUser = async () => {
        const user = await Auth.currentUserInfo()
        setCurrentUserHandler(user.username)
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <>
        <div className={`${styles.nav}`}>
            <div>Poem.IT</div>
            <p>{currentUser}</p>
        </div> 
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
            <Link to="/">
                <Button onClick={onClick} style={{ marginTop: "30px" }}>DONE!</Button>
            </Link>
        </div>
        </>
    )
}

export default WritingPage;