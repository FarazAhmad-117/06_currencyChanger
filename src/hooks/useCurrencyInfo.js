import { useState } from "react"
import { useEffect } from "react"


export const useCurrencyInfo=(currency)=>{
    let [data,setData] = useState({});
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then(res=>res.json())
        .then(res=>setData(res[currency]))
        .catch(error=>console.error(error));
    },[currency]);  
    return data;
}