import React, {useState,useEffect} from "react";
import PharmacistDetails from "../components/PharmacistDetails";

const ViewAndRemovePharmacists = ()=> {
    const [pharmacists, setPharmacists] = useState([]);
    const [selectedPharmacist,setSelectedPharmacist] = useState(null)

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try{
            const response = await fetch('api/pharmacist/viewAllPharmacists',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setPharmacists(results)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedPharmacist(null)
        }
    };

    const handleRemovePharmacist = async (pharmacistId) => {
        try {
            const response = await fetch(`/api/pharmacist/removePharmacist/${pharmacistId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchResults();
                setSelectedPharmacist(null)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    <h1 className="mb-4">System Pharmacists</h1>
                    <ul className="list-group width-adjust">
                        {pharmacists.map((pharmacist) => (
                            <li key={pharmacist._id} className="list-group-item">
                                <button
                                    className="btn btn-link btn-lg"
                                    onClick={() => setSelectedPharmacist(pharmacist)}
                                    style={{ textDecoration: "none" }}
                                >
                                    {pharmacist.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {selectedPharmacist &&(
                        <>
                            <PharmacistDetails pharmacist={selectedPharmacist} />
                            <button className="btn btn-danger" onClick={() => handleRemovePharmacist(selectedPharmacist._id)}>Remove</button>
                        </>
                    )}
                </div>
                <div className="col-6">
                    <img className="doc-edit-pharmacist" src={require(`../images/standing-doc.gif`)} alt="Pharmacy"/>
                </div>
            </div>

        </div>
    );
};

export default ViewAndRemovePharmacists