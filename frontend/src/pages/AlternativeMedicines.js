import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MedicineDetails from "../components/MedicineDetails";

const AlternativeMedicines = () => {
    const { medicineName } = useParams();
    const [alternativeMedicines, setAlternativeMedicines] = useState([]);

    useEffect(() => {
        const fetchAlternativeMedicines = async () => {
            try {
                const response = await fetch(`/api/medicine/alternatives/${medicineName}`);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const { alternativeMedicines } = await response.json();
                setAlternativeMedicines(alternativeMedicines);
            } catch (error) {
                console.error("Error fetching alternative medicines:", error);
                // Handle the error condition here, such as displaying an error message
            }
        };

        fetchAlternativeMedicines();
    }, [medicineName]);

    return (
        <div>
            <h2 className="left-part">Alternatives for {medicineName}</h2>
            <div className="container">
                <div className="left-part-less container available-medicines col-9 mt-5">
                    <div className="row">
                        {alternativeMedicines.map((medicine) => (
                            <MedicineDetails key={medicine._id} medicine={medicine} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlternativeMedicines;