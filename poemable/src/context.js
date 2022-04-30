import { createContext, useState } from 'react';

const currentUserContext = createContext({
    currentUser: "",
    setCurrentUserHandler: () => {}
});

const UpdateCurrentUser = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    const setCurrentUserHandler = (user) => setCurrentUser(user)

    return (
        <currentUserContext.Provider value={{ currentUser, setCurrentUserHandler }}>{children}</currentUserContext.Provider>
    )
};

export default UpdateCurrentUser;
export { currentUserContext };