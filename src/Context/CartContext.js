import axios from "axios";
import { createContext, useState } from "react";



export let CartContext = createContext();


export function CartContextProvider(props) {
    
    const [cartDetails, setCartDetails] = useState(null);

    let headers = { token: localStorage.getItem('userToken') }

    function addToCart(productId) {
        console.log(headers)
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);

    }

    function getLoggedUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers:headers})
       .then((response) => response)
            .catch((error) => error);
    }

    function Remove(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers})
        .then((response) => response)
        .catch((error) => error);
    }

    function Update(productId , count){

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {count} , {headers})
       .then((response) => response)
            .catch((error) => error);

    }

    function OnlinePayment(cartId , url ,values){

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}/?url=${url}` , {shippingAddress:values} , {headers})
       .then((response) => response)
            .catch((error) => error);

    }

    function Clear(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((response) => response)
        .catch((error) => error);
    }

    return <CartContext.Provider value={{ addToCart , OnlinePayment ,  getLoggedUserCart , Remove , Update , Clear, cartDetails, setCartDetails}}>
        {props.children}
    </CartContext.Provider>
}