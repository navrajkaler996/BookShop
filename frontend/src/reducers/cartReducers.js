import { CART_ADD_ITEM } from "../constants/cartConstants"
import { CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartReducer = ( state = { cartItems: [] }, action) => {

    switch(action.type){

        case CART_ADD_ITEM:

            const items = action.payload


            const existItem = state.cartItems.find((x) => x.product === items.product)

            if(existItem) {
                
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? items : x)
                }
            } 
            else{
        
                return {
                    ...state,
                    cartItems: [...state.cartItems, items]

                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        default:
            return state

    }


}