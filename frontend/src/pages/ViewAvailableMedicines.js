import {useEffect, useState} from "react";


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
        <div className="available-medicines">
            {medicines && medicines.map((medicine) => (
                <div key={medicine._id}>
                    <img src={require(`../images/${medicine.image}`)} alt={medicine.name} />
                    <p>{medicine.name}</p>
                    <p>{medicine.price}</p>
                    <p>{medicine.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ViewAvailableMedicines