import {useEffect, useState} from "react";
import MedicineDetails from "../components/MedicineDetails";

// View AvailableMedicines
const ViewAvailableMedicines = () => {
    const [medicines, setMedicines] = useState(null)
    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/medicine/viewAvailableMedicines')
            // We get here an array of Medicine objects
            const json = await response.json()
            if (response.ok) {
                setMedicines(json)
            }
        }
        fetchMedicines()
    }, [])

    return (
        <div className="container">
        <div className="container available-medicines col-9 mt-5">
            <div className="row">
                {medicines && medicines.map((medicine) => (
                    <MedicineDetails key={medicine._id} medicine={medicine}/>
                ))}
            </div>
        </div>
        </div>

    )
}


export default ViewAvailableMedicines