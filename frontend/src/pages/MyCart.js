import {useEffect, useState} from "react";
import MedicineDetails from "../components/MedicineDetails";
import MedicineCartDetails from "../components/MedicineCartDetails";

// View AvailableMedicines
const MyCart = () => {
    const [medicines, setMedicines] = useState(null)
    const [subtotalPrice, setSubtotalPrice] = useState(0);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/medicine/viewMedicineCart')
                // We get here an array of Medicine objects
                const json = await response.json()
                if (response.ok) {
                    setMedicines(json)
                } else {
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        }
        fetchMedicines()
    }, [])

    useEffect(() => {
        // Calculate subtotal price
        const calculateSubtotalPrice = () => {
            let subtotal = 0;
            if (medicines) {
                subtotal = medicines.reduce((total, medicine) => {
                    return total + medicine.price * medicine.amount;
                }, 0);
            }
            setSubtotalPrice(subtotal);
        };

        calculateSubtotalPrice();
    }, [medicines]);
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
                    Subtotal: {subtotalPrice} EGP
                </p>
                <p className="sub-total">
                    Shipping: 50 EGP
                </p>
                <hr/>
                <h3 className="sub-total">
                    Total: {subtotalPrice + 50} EGP
                </h3>
                <button type="button" className="btn btn-primary btn-lg checkout-btn">Checkout</button>

            </div>
        </div>


    )
}


export default MyCart