import React, { useEffect, useState } from "react";
import MedicineCartDetails from "../components/MedicineCartDetails";

const MyCart = () => {
    const [medicines, setMedicines] = useState(null)
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/cart/viewMyCart')
                // the return of viewMyCart is in this form on postman. i debugged and it always goes to the else part. how to fix it? means that the response.ok is false
                if (response.ok) {
                    const data = await response.json()
                    setMedicines(data)
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
    return (
        <div className="container">
            <h2>My Cart</h2>
            <div className="container available-medicines col-12 mt-5">
                <div className="row">
                    {medicines && medicines.map((medicine) => (
                        <MedicineCartDetails key={medicine._id} medicine={medicine}/>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default MyCart;