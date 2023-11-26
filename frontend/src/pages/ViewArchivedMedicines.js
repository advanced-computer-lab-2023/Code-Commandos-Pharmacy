import {useEffect, useState} from "react";
import ArchivedMedicineInfo from "../components/ArchivedMedicineInfo";

const ViewArchivedMedicines = () => {
    const [medicines, setMedicines] = useState(null)
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/medicine/viewArchivedMedicines')
                // We get here an array of Archived Medicine objects
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

    return(
        <div className="archived-medicines">
            <h2 className="margin-left">Archived Medicines</h2>
            {medicines && medicines.map((medicine) => (
                <ArchivedMedicineInfo
                    name={medicine.name}
                    price={medicine.price}
                    sales={medicine.sales}
                />
            ))}

        </div>
    )

}

export default ViewArchivedMedicines;