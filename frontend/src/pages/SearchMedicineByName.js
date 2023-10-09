import {useState,useEffect} from "react";
import axios from "axios";
import MedicineDetails from "../components/MedicineDetails";


const SearchMedicineByName = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedMedicine, setSearchedMedicine] = useState(null);
    const [medicines, setMedicines] = useState(null)

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/medicine/viewAvailableMedicines')
            const json = await response.json()
            if (response.ok) {
                setMedicines(json)
            }
        }
        fetchMedicines()
    }, [])

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/medicine/searchMedicineByName/${searchQuery}`)
            // Get the medicine from the response
            const foundMedicine = response.data
            console.log(foundMedicine)

            setSearchedMedicine(foundMedicine)
            setMedicines(null)
        }catch (error){
            console.error("No such medicine", error)
            setSearchedMedicine(null)
        }
    }

    return(
        <body>
        <div className="filter col-3" >
            <div className="container">
                <div className="row">
                    <div className="search-form">
                        {/*OnChange: event to update the search query*/}
                        <input type="text" id="searchInput" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" placeholder="What are you looking for?"/>
                        <button type="submit" className="btn btn-primary search-btn" onClick={handleSearch} >Search</button>
                    </div>
                </div>

                <div className="row">
                    <p className="mt-4 fw-bold">Category</p>
                    <p>Medicinal Use</p>
                    <ul className="medicinal-use-list">
                        <li>Pain-Relief</li>
                        <li>Anti-Inflammatory</li>
                        <li>Vitamin</li>
                        <li>Muscle Relaxant</li>
                        <li>Sedative</li>
                        <li>Antidiabetic</li>
                        <li>Antiemetic</li>
                        <li>Antidepressant</li>
                        <li>Antipyretic</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="container available-medicines col-9">
            <div className="row">
                {searchedMedicine && searchedMedicine.map((medicine) => (
                    <MedicineDetails key={medicine._id} medicine={medicine}/>
                ))}
                {medicines && medicines.map((medicine) => (
                    <MedicineDetails key={medicine._id} medicine={medicine}/>
                ))}
            </div>
        </div>
        </body>
    )
}
export default SearchMedicineByName