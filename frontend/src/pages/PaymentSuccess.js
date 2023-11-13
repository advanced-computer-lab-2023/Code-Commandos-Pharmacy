import { useEffect } from "react";

const PaymentSuccess = () => {
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
                console.log(await response.json())
            }
        }

        subscribe()
    },[])
    return (
        <div>
            <h2>Payment successful.</h2>
            <a href="/myCart">Go back .</a>
        </div>
    );
};

export default PaymentSuccess