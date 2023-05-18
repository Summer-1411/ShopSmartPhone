
import { createContext,  useState } from "react";

const ProductFilterContext = createContext();

const ProductFilterProvider = ({ children }) => {
    const [productFilter, setProductFilter] = useState({
        category: null,
        producer: null,
    })
    //console.log(productFilter);
    return (
        <ProductFilterContext.Provider value={{productFilter, setProductFilter}}>
            {children}
        </ProductFilterContext.Provider>
    )
}

export {ProductFilterContext}
export default ProductFilterProvider