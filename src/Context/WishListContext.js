import axios from "axios";
import { createContext, useState } from "react";



export let WishListContext = createContext();


export function WishListContextProvider(props) {

    let headers = { token: localStorage.getItem('userToken') }

    function getLoggedUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function addToWishList(productId) {
        console.log(headers)
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);

    }

    function removeFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((response) => response)
            .catch((error) => error);
    }

    return <WishListContext.Provider value={{ getLoggedUserWishList, addToWishList, removeFromWishList }}>
        {props.children}
    </WishListContext.Provider>
}