import React, { createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext()

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("VND");
    const [symbol, setSybol] = useState("");

    useEffect(() => {
        if (currency === "USD") {
            setSybol("$");
        } else if (currency === "VND") {
            setSybol("đ");
        }
    }, [])

    return <Crypto.Provider value={{ currency, setCurrency, symbol }}>
        {children}
    </Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}