import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PlaceOrder = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null)
    const [paymentOption, setPaymentOption] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const cartId = urlParams.get('cart')
        setCart(cartId)
        
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
          }
        };
        fetchAddresses();
    }, []);
  
    const handleAddressChange = (selectedAddress) => {
      setSelectedAddress(selectedAddress.street+" "+selectedAddress.city+" "+selectedAddress.country);
    };


    //handle credit card
    const handleSubmit = async () => {
        const response = await fetch(`/api/order/payForOrder/${cart}/CreditCard`)
        
        if(response.ok){
            const session = await response.json()
            window.location.href = session.url
        }
    }
    const handleCashOnDeliveryPayment = async () => {
        const response = await fetch(`/api/order/payForOrder/${cart}/CashOnDelivery`)
        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Order successfully placed.',
            });            navigate('/viewMyOrders')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
            throw new Error(errorMessage);
        }
    }
    const handleWalletPayment = async () => {
        try {
            const response = await fetch(`/api/order/payForOrder/${cart}/Wallet`, {
                method: 'GET',
            });
    
            if (response.ok) {
                const result = await response.json();
                //setWalletPayment(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Order successfully placed.',
                });                navigate('/viewMyOrders')
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleConfirmOrder = async () => {
        if(paymentOption==="CreditCard")
            await handleSubmit()
        else if(paymentOption==="Wallet")
            await handleWalletPayment()
        else
            await handleCashOnDeliveryPayment()
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
}

export default PlaceOrder