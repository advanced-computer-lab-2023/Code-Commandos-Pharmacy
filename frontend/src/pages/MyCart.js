import React, { useEffect, useState } from "react";
import MedicineCartDetails from "../components/MedicineCartDetails";
import { Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const MyCart = () => {
    const [medicines, setMedicines] = useState(null)
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartId, setCartId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch("/api/cart/viewMyCart");
                if (response.ok) {
                    const { medicines, subtotal, total,cartId } = await response.json();
                    setMedicines(medicines);
                    setSubtotal(subtotal);
                    setTotal(total);
                    setCartId(cartId)
                    console.log("these are the medicines",medicines)
                }
                else {
                    alert(await response.text())
                }
            }
            catch (error){
                alert(error.message)
            }
        }
        fetchMedicines()
    }, [])

   const handleCheckout = async ()=>{
        if(medicines.length != 0){
            navigate('/placeOrder?cart='+cartId)
        }
   }

    return (
        <div className="container-order">
            <div className="col-7">
                <h2 className="left-part">My Cart</h2>
                <div className="available-medicines mt-5 ">
                    <div className="row row-cols-4 left-part">
                        {medicines && medicines.map((medicine) => (
                            <MedicineCartDetails key={medicine._id} className="col-3" medicine={medicine}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="order-summary col-5">
                <h4 className="order-text">Order Summary</h4>
                <p>
                    <form className="coupon-form">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter coupon code" />
                            <button type="submit" className="btn apply-btn">Apply</button>
                        </div>
                    </form>
                </p>
                <p className="sub-total">
                    Subtotal: {subtotal} EGP
                </p>
                <p className="sub-total">
                    Shipping: 50 EGP
                </p>
                <hr/>
                <h3 className="sub-total">
                    Total: {total} EGP
                </h3>
                    <button type="button" className="btn btn-primary btn-lg checkout-btn" onClick={handleCheckout}>Checkout</button>

            </div>
        </div>


    )
};

export default MyCart;