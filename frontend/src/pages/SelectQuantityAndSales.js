import {useEffect, useState} from "react";
import MedicineInfo from "../components/MedicineInfo";
import medicineInfo from "../components/MedicineInfo";
const SelectQuantityAndSales = () => {
    const [medicines,setMedicines] = useState(null)
    useEffect( () => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/medicine/viewQuantityAndSales')
                if (response.ok) {
                    const json = await response.json()
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
    }, []
    )
    return(
        <div className="medicines-quantity-sales">
            {medicines && medicines.map((medicine) => (
                <MedicineInfo
                    name={medicine.name}
                    quantity={medicine.quantity}
                    sales={medicine.sales}
                />
            ))}
        </div>
    )
}

export default SelectQuantityAndSales