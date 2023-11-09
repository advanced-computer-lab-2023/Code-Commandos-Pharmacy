import {Link} from "react-router-dom";
import {useState} from "react";

const PlaceOrder = () => {
    const [creditPayment, setCreditPayment] = useState('')
    const [order, setOrder] = useState('')

    const handleCreditPayment = async () => {
        try{
            const response = await fetch('api/order/setCreditPayment',{
                method: 'PUT',
            });
            if (response.ok){
                const result = await response.json();
                setCreditPayment(result)
                alert("Credit Payment added")
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    const [cashPayment, setCashPayment] = useState('')
    const handleCashPayment = async () => {
        try{
            const response = await fetch('api/order/setCashPayment',{
                method: 'PUT',
            });
            if (response.ok){
                const result = await response.json();
                setCashPayment(result)
                alert("Cash Payment added")
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    const handleConfirmOrder = async () => {
        try{
            const response = await fetch('api/order/confirmOrder',{
                method: 'PUT',
            });
            if (response.ok){
                const result = await response.json();
                setOrder(result)
                alert("Order Confirmed")
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <body>
        <div className="order-body">
            <h4 className="order-text">Shipping Address</h4>
            <div className="dropdown">
                <button className="btn btn-lg btn-secondary btn-address dropdown-toggle" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Address
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Address1</a>
                    <a className="dropdown-item" href="#">Address2</a>
                    <a className="dropdown-item" href="#">Address3</a>
                </div>
                <hr/>
            </div>

            <h4 className="order-text">Payment</h4>
            <div className="payments">
                <div className="left-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details" onClick={handleCreditPayment}>
                                    Pay with Credit/Debit Card
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details-cash" onClick={handleCashPayment}>
                                    Cash on Delivery
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <Link to="/placeOrder">
                <button type="button" className="btn btn-primary btn-lg placeOrder-btn" onClick={handleConfirmOrder}>Place Order</button>
            </Link>
        </div>
        </body>
    );
};
export default PlaceOrder