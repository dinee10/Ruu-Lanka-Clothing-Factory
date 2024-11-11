import React from 'react'


export const totalItem = (cart) => {
    return cart.reduce((sum, product) => sum + product.quantity, 0)
}

export const totalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0)
}

const CartReducer = (state, action) => {
    switch(action.type) {
        case "Add":
            const existingProduct = state.find(p => p._id === action.product._id);
            if (existingProduct) {
                // If the product already exists in the cart, increase its quantity
                return state.map(p => 
                    p._id === action.product._id 
                    ? { ...p, quantity: p.quantity + 1 } 
                    : p
                );
            } else {
                // Add new product with quantity initialized to 1
                return [...state, { ...action.product, quantity: 1 }];
            }

        case "Remove":
            return state.filter(p => p._id !== action._id)

        case "Increase":
            const IndexI = state.findIndex( p => p._id === action._id)
            state[IndexI].quantity += 1
            return [...state]

        case "Decrease":
            const IndexD = state.findIndex( p => p._id === action._id)
            state[IndexD].quantity -= 1
            return [...state]

        default:
            state
    }
  
}

export default CartReducer