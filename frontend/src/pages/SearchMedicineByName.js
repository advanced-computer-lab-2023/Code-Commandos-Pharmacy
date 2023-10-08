import {useState} from "react";
import axios from "axios";


const SearchMedicineByName = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedMedicine, setSearchedMedicine] = useState(null);
    const [isMedicineNotFound, setIsMedicineNotFound] = useState(false)

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/medicine/viewMedicineByName/${searchQuery}`)
            // Get the medicine from the response
            const foundMedicine = response.data
            setSearchedMedicine(foundMedicine)
        }catch (error){
            console.error("No such medicine", error)
            setSearchedMedicine(null)
            setIsMedicineNotFound(true)
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
                {searchedMedicine ? (
                    <div className="col-lg-4 col-md-4 col-sm-6" key={searchedMedicine._id}>
                        <img src={require(`../images/${searchedMedicine.image}`)} alt={searchedMedicine.name} />
                        <p>{searchedMedicine.name}</p>
                        <p>{searchedMedicine.price} EGP</p>
                        <p>{searchedMedicine.description}</p>
                    </div>
                )
                    :isMedicineNotFound ? (
                        <div className="m-3"><h2>Medicine Not Found</h2></div>
                    ) : null
                }

            </div>
        </div>
        </body>
    )
}
export default SearchMedicineByName