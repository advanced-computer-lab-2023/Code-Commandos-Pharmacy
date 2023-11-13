import {Link} from "react-router-dom";

const PlaceOrder = () => {
    const handlePlaceOrder = async () => {
        try {
            const response = await fetch("/api/order/placeOrder", {
                method: "POST"
            });
            if (response.ok) {
                alert("Order placed successfully!");
            } else {
                alert("Failed to place the order");
            }
        }catch (error){
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
                                <button className="payment-details">
                                    Pay with Credit/Debit Card
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="middle-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details">
                                    Wallet
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right-payment-option">
                    <div className="row">
                        <div className="column">
                            <p>
                                <button className="payment-details-cash">
                                    Cash on Delivery
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <Link to="#">
                <button type="button" className="btn btn-primary btn-lg placeOrder-btn" onClick={handlePlaceOrder}>Place Order</button>
            </Link>
        </div>
        </body>
    );
}

export default PlaceOrder