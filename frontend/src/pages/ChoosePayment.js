import { useEffect, useState } from "react";
const ChoosePayment = () => {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [paymentOption, setPaymentOption] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
       // const familyMember = urlParams.get('familyMember');
        const order = urlParams.get('order')
        setSelectedOrder(order)
        
    }, [])

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3000/api/order/payForOrder/${selectedOrder}/${paymentOption}`)
        const session = await response.json()
        window.location.href = session.url
    }

    return (
        <div className="healthPackages m-5">
            <h2>Select Payment Method:</h2>
            <ul className="list-group">
                <li className="list-group-item">
                  <button
                    className="btn btn-link"
                    onClick={() => setPaymentOption("wallet")} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    Pay with Wallet (Current balance: {}) {paymentOption==="wallet" && <span>(selected)</span>}
                </button>
                </li>
                <li className="list-group-item">
                <button
                    className="btn btn-link"
                    onClick={() => setPaymentOption("credit_card")} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    Pay with Credit Card (Stripe) {paymentOption==="credit_card" && <span>(selected)</span>}
                </button>
                </li>
            </ul>
            <br/>
            {paymentOption &&
                <button className="btn btn-success" onClick={() => handleSubmit()}>
                    Continue
                </button>
            }
        </div>
    )
}

export default ChoosePayment;