import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const [creditPayment, setCreditPayment] = useState('')
    const [walletPayment, setWalletPayment] = useState('')
    const [order, setOrder] = useState('')
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [paymentOption, setPaymentOption] = useState(null)
    const navigate = useNavigate()
    const [cashPayment, setCashPayment] = useState('')
   
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        // const familyMember = urlParams.get('familyMember');
        const order = urlParams.get('order')
        setSelectedOrder(order)
        
        // Fetch addresses when the component mounts
        const fetchAddresses = async () => {
          try {
            const response = await fetch('/api/patient/viewAvailableAddresses');
            if (response.ok) {
              const data = await response.json();
              setAddresses(data.newaddresses);
            } else {
              throw new Error('Error fetching addresses');
            }
          } catch (error) {
            console.error(error.message);
            // Handle error, show error message to the user, etc.
          }
        };
        fetchAddresses();
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  
    const handleAddressChange = (selectedAddress) => {
      setSelectedAddress(selectedAddress.street+" "+selectedAddress.city+" "+selectedAddress.country);
    };


    //handle credit card
    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3000/api/order/payForOrder/${selectedOrder}/CreditCard`)
        
        if(response.ok){
            const session = await response.json()
            window.location.href = session.url
        }
    }
    const handleCashOnDeliveryPayment = async () => {
        const response = await fetch(`http://localhost:3000/api/order/payForOrder/${selectedOrder}/CashOnDelivery`)
        if (response.ok) {
            const result = await response.json();
            alert("Order successfully placed.");
            navigate('/paymentSuccess')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
            throw new Error(errorMessage);
        }
    }
    const handleWalletPayment = async () => {
        try {
            const response = await fetch(`/api/order/payForOrder/${selectedOrder}/Wallet`, {
                method: 'GET',
            });
    
            if (response.ok) {
                const result = await response.json();
                //setWalletPayment(result);
                alert("Order successfully placed.");
                navigate('/paymentSuccess')
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    
      //not working well with me but i dont know if arwa needs it or not- woaod
    /*const handleCreditPayment = async () => {
        try {
            const response = await fetch(`/api/order/payForOrder/${selectedOrder}/CreditCard`, {
                method: 'GET',
            });
            if (response.ok) {
                const result = await response.json();
                setCreditPayment(result);
                alert("Credit Payment added");
                const response = await fetch(`http://localhost:3000/api/order/payForOrder/${selectedOrder}/${paymentOption}`)
                const session = await response.json()
                window.location.href = session.url
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message);
        }
    };*/
    

   
    /*const handleCashPayment = async (orderId) => {
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
        let url = "/paymentSuccess"
        navigate(url)
    };*/

    const handleConfirmOrder = async () => {
        try{
            const response = await fetch(`api/order/confirmOrder/${selectedOrder}/${paymentOption}/${selectedAddress}`,{
                method: 'PUT',
            });
            if (response.ok){
                const result = await response.json();
                setOrder(result)
                //alert("Order Confirmed")
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
        if(paymentOption==="CreditCard")
            handleSubmit()
        else if(paymentOption==="Wallet")
            handleWalletPayment()
        else
            handleCashOnDeliveryPayment()
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
            {addresses.map((address, index) => (
              <a key={index} className="dropdown-item" onClick={() => handleAddressChange(address)}>
                {address.street}, {address.city}, {address.country}
              </a>
            ))}
          </div>
          {selectedAddress && <div className="card" style={{textAlign: "center", left:"10%",width:"80%"}}>Selected Address: {selectedAddress}</div>}
          <hr />
        </div>
        

            <h4 className="order-text">Payment</h4>
            <div className="payments">
                <div className="left-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details" onClick={() => setPaymentOption("CreditCard")}>
                                    Credit Card  {paymentOption==="CreditCard" && <span>(selected)</span>}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="middle-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details" onClick={() => setPaymentOption("Wallet")}>
                                    Wallet {paymentOption==="Wallet" && <span>(selected)</span>}
                                </button>
                                </p>
                        </div>
                    </div>
                </div>
                <div className="right-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details" onClick={() => setPaymentOption("CashOnDelivery")}>
                                    Cash on Delivery {paymentOption==="CashOnDelivery" && <span>(selected)</span>}
                                </button>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            
            <button type="button" className="btn btn-primary btn-lg placeOrder-btn" onClick={handleConfirmOrder} disabled={!(selectedAddress&&paymentOption)}>Place Order</button>
            
        </div>
        </body>
    );
};
export default PlaceOrder