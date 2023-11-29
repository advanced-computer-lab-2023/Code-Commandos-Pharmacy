import {useState,useEffect} from "react";
import axios from "axios";
import MedicineDetails from "../components/MedicineDetails";
import {Link} from "react-router-dom";


const SearchMedicineByName = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedMedicine, setSearchedMedicine] = useState([]);
    const [medicines, setMedicines] = useState([])
    // const [salesReport, setSalesReport] = useState([])


    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('/api/medicine/viewAvailableMedicines')
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

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/medicine/searchMedicineByName/${searchQuery}`)
            // Get the medicine from the response
            const foundMedicine = response.data
            console.log(foundMedicine)

            setSearchedMedicine(foundMedicine)
            setMedicines([])
        }catch (error){
            console.error("No such medicine", error)
            alert("No such medicine")
            setSearchedMedicine(null)
        }
    }
    // const handleSalesReport = async (month) => {
    //     try {
    //         const response = await axios.get(`/api/sales/viewReportByMonth/${month}`);
    //         const salesOfMonth =  response.data;
    //         setSalesReport(salesOfMonth);
    //     } catch (error) {
    //         console.error("Error fetching report:", error);
    //         alert(error.message)
    //         setSalesReport([]);
    //     }
    // };


    const handleCategory = async (category) => {
        try {
            const response = await axios.get(`/api/medicine/filterMedicines/${category}`);
            const filteredMedicines =  response.data;
            setMedicines(filteredMedicines);
        } catch (error) {
            console.error("Error filtering medicines:", error);
            alert(error.message)
            setMedicines([]);
        }
    };


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
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('PAIN-RELIEF', e)}>Pain-Relief</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('ANTI-INFLAMMATORY',e)}>Anti-inflammatory</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('VITAMIN',e)}>Vitamin</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('MUSCLE RELAXANT',e)}>Muscle Relaxant</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('SEDATIVE',e)}>Sedative</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('ANTIDIABETIC',e)}>Antidiabetic</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('ANTIEMETIC',e)}>Antiemetic</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('ANTIDEPRESSANT',e)}>Antidepressant</a></li>
                        <li><a href="#" className="list-font" onClick={(e) => handleCategory('ANTIPYRETIC',e)}>Antipyretic</a></li>
                    </ul>
                </div>
                <div className="row">
                    <p className="mt-4 fw-bold">Sales Report</p>
                    <ul className="medicinal-use-list">
                        <li>
                            <Link to="/MonthlySales/January" className="no-underline">
                                <a href="#" className="list-font">January</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/February" className="no-underline" >
                                <a href="#" className="list-font">February</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/March" className="no-underline" >
                                <a href="#" className="list-font">March</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/April" className="no-underline" >
                                <a href="#" className="list-font">April</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/May" className="no-underline" >
                                <a href="#" className="list-font">May</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/June" className="no-underline" >
                                <a href="#" className="list-font">June</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/July"className="no-underline" >
                                <a href="#" className="list-font">July</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/August" className="no-underline" >
                                <a href="#" className="list-font">August</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/September" className="no-underline" >
                                <a href="#" className="list-font">September</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/October" className="no-underline" >
                                <a href="#" className="list-font">October</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/November"className="no-underline" >
                                <a href="#" className="list-font">November</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/December" className="no-underline" >
                                <a href="#" className="list-font">December</a>
                            </Link>
                        </li>

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