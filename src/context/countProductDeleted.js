
import { createContext,  useState } from "react";

const countProductDeletedContext = createContext();

const CountProductDeletedProvider = ({ children }) => {
    const [countDeleted, setCountDeleted] = useState(0)
    return (
        <countProductDeletedContext.Provider value={{countDeleted, setCountDeleted}}>
            {children}
        </countProductDeletedContext.Provider>
    )
}
export {countProductDeletedContext}
export default CountProductDeletedProvider