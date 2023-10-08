import {useEffect, useState} from "react";

// View AvailableMedicines
const ViewAvailableMedicines = () => {
    const [medicines, setMedicines] = useState(null)

    // const [searchQuery, setSearchQuery] = useState('');
    // const [filteredMedicines, setFilteredMedicines] = useState([]);
    //
    // const handleSearch = () => {
    //     const filtered = SearchMedicineByName(medicines, searchQuery);
    //     setFilteredMedicines(filtered);
    // };

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
        <body>

        <div className="row">

        </div>
        <div className="filter col-3" >
            <div className="container">
                <div className="row">
                    <div className="search-form">
                        {/*OnChange: event to update the search query*/}
                        <input type="text"  id="searchInput" class="form-control" placeholder="What are you looking for?"/>
                        <button type="submit" class="btn btn-primary search-btn" onclick="" >Search</button>
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
                {medicines && medicines.map((medicine) => (
                    <div className="col-lg-4 col-md-4 col-sm-6" key={medicine._id}>
                        <img src={require(`../images/${medicine.image}`)} alt={medicine.name} />
                        <p>{medicine.name}</p>
                        <p>{medicine.price} EGP</p>
                        <p>{medicine.description}</p>
                    </div>
                ))}
            </div>
        </div>
        </body>

    )
}


export default ViewAvailableMedicines