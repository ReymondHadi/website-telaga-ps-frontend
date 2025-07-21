import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);  
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body: "",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
        if(cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            // Add null check here
            if (itemInfo) {
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
    }
    return totalAmount;
}

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const clearCart = async () => {
    try {
        // Reset keranjang di state
        const newCart = getDefaultCart();
        setCartItems(newCart);
        
        if(localStorage.getItem('auth-token')) {
            // Panggil endpoint /clearcart
            const response = await fetch('http://localhost:4000/clearcart', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log("Cart cleared successfully in database");
                // Paksa reload halaman untuk sinkronisasi
                window.location.reload();
            } else {
                console.error("Failed to clear cart in database");
            }
        }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }

// Add fetchCartData function
const fetchCartData = async () => {
    if(localStorage.getItem('auth-token')){
        const response = await fetch('http://localhost:4000/getcart', {
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body: "",
        });
        const data = await response.json();
        setCartItems(data);
    }
}

// Update useEffect to use fetchCartData
useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_product(data))

    fetchCartData(); // Use the new function here
}, [])

    const fetchUserTransactions = async () => {
    if (localStorage.getItem('auth-token')) {
        try {
            const response = await fetch('http://localhost:4000/get-transactions', {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                return data.transactions;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return [];
        }
    }
    return [];
};

    const cancelTransaction = async (transactionId) => {
    if (localStorage.getItem('auth-token')) {
        try {
            const response = await fetch('http://localhost:4000/cancel-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ transactionId })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error cancelling transaction:", error);
            return { success: false, message: "Terjadi kesalahan" };
        }
    }
    return { success: false, message: "User tidak terautentikasi" };
};

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, clearCart, fetchUserTransactions, cancelTransaction};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider