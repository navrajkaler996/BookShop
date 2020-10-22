import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../actions/cartActions"


const CartScreen = ({ match, location,  history}) => {
    
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart
    
    const dispatch = useDispatch()

    useEffect(()=>{

        console.log("pr", productId)
        if(productId){
            console.log("aaaaaaaaaaa")
            dispatch(addToCart(productId,qty))
        }

    }, [dispatch,productId,qty])
    
    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreen
