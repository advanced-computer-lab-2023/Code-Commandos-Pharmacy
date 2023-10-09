import {useState} from "react";
import PharmacistDetails from "../components/pharmacistDetails";

const SearchByPharmacistId = ()=> {
    const [id, setId] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedPharmacist,setSelectedPharmacist] = useState(null)
    const fetchResults = async () => {
        try{
            let url = 'http://localhost:4000/api/pharmacistRoute/viewPharmacist';
            if (!id) {
                url += "/none";
            }
            else {
                url += `/${id}`
            }

            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setSearchResults(results)
                setSelectedPharmacist(null)
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


    return (
        <div className="container mt-4">
            <h1 className="mb-4">Search by Pharmacist ID </h1>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">
                    ID:
                </label>
                <input
                    type="text"
                    id='pharmacist._id'
                    className="form-control"
                    value={id !== null ? id : ''}
                    onChange={(e) => setId(e.target.value)}
                />
</div>
            <button className="btn btn-primary" onClick={fetchResults}>
                Search
            </button>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((pharmacist) => (
                        <button
                            key={pharmacist._id}
                            className="btn btn-link"
                            onClick={() => setSelectedPharmacist(pharmacist)}
                        >
                            {pharmacist._id}
                            <br/>
                        </button>
                    ))}
            </div>
            {selectedPharmacist && <PharmacistDetails key={selectedPharmacist._id} pharmacist={selectedPharmacist} />}
        </div>
    );
};

export default SearchByPharmacistId
