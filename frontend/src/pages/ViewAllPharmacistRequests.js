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
        }
    };



    return (
        <div className="container mt-4">
            <h1 className="mb-4">Pharmacists Requests</h1>
            <ul className="list-group">
                {requests.map((request) => (
                    <li key={request._id} className="list-group-item">
                        <button
                            className="btn btn-link btn-lg"
                            onClick={() => setSelectedRequest(request)}
                            style={{ textDecoration: "none" }}
                        >
                            {request.name}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedRequest && <PharmacistRequestDetails pharmacistRequest={selectedRequest} />}
        </div>
    );
};

export default ViewAllPharmacistRequests