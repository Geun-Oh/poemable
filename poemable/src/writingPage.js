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

    const onClick = async () => { // 왜 다른 useCallback을 쓴 함수들과 다르게 여기서는 props를 전달하지 않아도 되는건가?
        if (poem.title === "" || poem.detail === "") {
            return;
        }
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
            <p>{currentUser.username}</p>
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
            <Link to="/landing" onClick={onClick}>
                <Button style={{ marginTop: "30px" }}>
                    {
                        poem.title === "" || poem.detail === "" ? "CLOSE" : "DONE!"
                    }
                </Button>
            </Link>
        </div>
        </>
    )
}

export default WritingPage;