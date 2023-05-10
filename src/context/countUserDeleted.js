
import { createContext,  useState } from "react";

const CountUserDeletedContext = createContext();

const CountUserDeletedProvider = ({ children }) => {
    const [countUserDeleted, setCountUserDeleted] = useState(0)
    return (
        <CountUserDeletedContext.Provider value={{countUserDeleted, setCountUserDeleted}}>
            {children}
        </CountUserDeletedContext.Provider>
    )
}
export {CountUserDeletedContext}
export default CountUserDeletedProvider