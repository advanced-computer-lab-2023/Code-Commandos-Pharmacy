import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        const subscribe = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionID = urlParams.get('sessionID');
            if(sessionID){
                const response = await fetch(`/api/order/completeCreditPayment/${sessionID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                navigate('/viewMyOrders')
                console.log(await response.json())
            }
        }

        subscribe()
    },[])

};

export default PaymentSuccess