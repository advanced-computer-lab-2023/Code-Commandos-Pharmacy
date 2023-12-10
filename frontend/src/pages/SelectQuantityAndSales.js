import React, {useEffect, useState} from "react";
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
        <body>
        <div className="medicines-quantity-sales margin-left">
            <div className="row">
                <div className="col-9">
                    <h2 className="margin-left">Quantity and Sales</h2>
                    {medicines && medicines.map((medicine) => (
                        <MedicineInfo
                            name={medicine.name}
                            quantity={medicine.quantity}
                            sales={medicine.sales}
                        />
                    ))}
                </div>
                <div className="col-1">
                    <img src={require('../images/standing-doc.gif')} alt="Sold Out" className="doc-edit" />
                </div>
                <div className="col-1">
                    <img src={require('../images/walking-med.gif')} alt="Sold Out" className="walking-med-edit" />
                </div>

            </div>
        </div>
        </body>
    )
}

export default SelectQuantityAndSales