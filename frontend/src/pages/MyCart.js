import {useEffect, useState} from "react";
import MedicineDetails from "../components/MedicineDetails";
import MedicineCartDetails from "../components/MedicineCartDetails";

// View AvailableMedicines
const MyCart = () => {
    const [medicines, setMedicines] = useState(null)
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/medicine/viewMedicineCart')
                // We get here an array of Medicine objects
                const json = await response.json()
                if (response.ok) {
                    setMedicines(json)
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
}


export default MyCart