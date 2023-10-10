import {useEffect, useState} from "react";

const SelectQuantityAndSales = () => {
    const [medicines,setMedicines] = useState(null)
    useEffect( () => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/medicine/viewQuantityAndSales')
            const json = await response.json()
            if(response.ok){
                setMedicines(json)
            }
        }
        fetchMedicines()
    }, []
    )
    return(
        <div className="medicines-quantity-sales">
            {medicines && medicines.map((medicine) => (
                <div key={medicine._id}>
                    <p>{medicine.name}</p>
                    <p>Quantity: {medicine.quantity}</p>
                    <p>Sales: {medicine.sales}</p>
                </div>
            ))}
        </div>
    )
}

export default SelectQuantityAndSales