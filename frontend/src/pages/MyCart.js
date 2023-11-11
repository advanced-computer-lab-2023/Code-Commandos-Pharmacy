import React, { useEffect, useState } from "react";
import MedicineCartDetails from "../components/MedicineCartDetails";

const MyCart = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch("/api/cart/viewMyCart");
                const data = await response.json();

                if (response.ok) {
                    setMedicines(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartData();
    }, []);

    return (
        <div className="container">
            <h2>My Cart</h2>
            <div className="container available-medicines col-12 mt-5">
                <div className="row">
                    {medicines.map((medicine) => (
                        <MedicineCartDetails key={medicine._id} medicine={medicine} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCart;