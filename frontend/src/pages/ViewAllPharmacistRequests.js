import {useState,useEffect} from "react";
import PharmacistRequestDetails from "../components/PharmacistRequestDetails";

const ViewAllPharmacistRequests = ()=> {
    const [requests, setRequests] = useState([]);
    const [selectedRequest,setSelectedRequest] = useState(null)

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try{
            const response = await fetch('api/pharmacistRequest/viewAllPharmacistRequests',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setRequests(results)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedRequest(null)
            alert(error.message)
        }
    };



    return (
        <div className="container mt-4">
            <h1 className="mb-4">Pharmacists Requests</h1>
            <ul className="list-group">
                {requests && requests.map((request) => (
                    <PharmacistRequestDetails pharmacistRequest={request} />
                ))}
            </ul>
        </div>
    );
};

export default ViewAllPharmacistRequests