import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import salesReportImage from '../images/sales (2).png';

const FilterReport = () => {
    const {month} = useParams();
    const [salesData, setSalesData] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicinesPurchase, setFilteredMedicinesPurchase] = useState([]);
    const [filteredCancelledMedicines, setFilteredCancelledMedicines] = useState([]);
    const [netSales, setNetSales] = useState(0);
    const [showMonthSales, setShowMonthSales] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredMedicinesPurchaseByDate, setFilteredMedicinesPurchaseByDate] = useState('');
    const [filteredCancelledMedicinesByDate, setFilteredCancelledMedicinesByDate] = useState('');
    const [salesPurchase, setSalesPurchase] = useState(0);
    const [salesCancelled, setSalesCancelled] = useState(0);
    const [netSalesByDate, setNetSalesByDate] = useState(0);
    const [showFilteredReportByDate, setShowFilteredReportByDate] = useState(false);

    // View All Report
    const [allSalesMonth, setAllSalesMonth] = useState([]);
    const [allMedicinePurchase, setAllMedicinePurchase] = useState([]);
    const [allCancelledMedicines, setAllCancelledMedicines] = useState([]);
    const [showAllReport, setShowAllReport] = useState(false);

    const fetchReport = async () => {
        try {
            const response = await fetch(`/api/sales/viewAll`);
            if (response.ok) {
                const result = await response.json()
                setAllSalesMonth(result.salesReport.salesMonth);
                setAllMedicinePurchase(result.salesReport.medicinePurchase);
                setAllCancelledMedicines(result.salesReport.cancelledMedicines);
                setShowAllReport(true);
                setShowMonthSales(false);

            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error.message)
        }
    };
    useEffect(() => {
        fetchReport();
    }, []);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('/api/medicine/viewAvailableMedicines');
                setMedicines(response.data.map(medicine => medicine.name));
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        fetchMedicines();
    }, []);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`/api/sales/viewReportByMonth/${month}`);
                setSalesData(response.data);
                setShowMonthSales(true);
                setShowAllReport(false);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [month]);

    const handleSubmitDates = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`/api/sales/filterReportBasedOnDate/${startDate}/${endDate}`);
            setFilteredMedicinesPurchaseByDate(response.data.filteredMedicinesPurchase);
            setFilteredCancelledMedicinesByDate(response.data.filteredCancelledMedicines);
            setSalesPurchase(response.data.salesPurchase);
            setSalesCancelled(response.data.salesCancelled);
            setNetSalesByDate(response.data.netSales);
            setShowFilteredReportByDate(true);
        } catch (error) {
            console.error('Error filtering the report by date', error);
        }
    };

    const fetchFilteredData = async (selectedMedicine) => {
        try {
            const response = await fetch(
                `/api/sales/filterReportBasedOnName/${selectedMedicine}`
            );
            const data = await response.json();
            setFilteredMedicinesPurchase(data.filteredMedicinesPurchase);
            setFilteredCancelledMedicines(data.filteredCancelledMedicines);
            setNetSales(data.netSales);
            setShowMonthSales(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleMedicineChange = (e) => {
        const medicineName = e.target.value;
        setSelectedMedicine(medicineName);
        fetchFilteredData(medicineName);
    };

    return (
        <body>
        <div className="row margin-left col-2">
            <div className="container">
                <div className="row">
                    <button onClick={fetchReport}>
                        All
                    </button>
                </div>
                <div className="row">
                    <p className="mt-4 fw-bold">Month</p>
                    <ul className="medicinal-use-list">
                        <li>
                            <Link to="/MonthlySales/January" className="no-underline">
                                <a href="#" className="list-font">January</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/February" className="no-underline">
                                <a href="#" className="list-font">February</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/March" className="no-underline">
                                <a href="#" className="list-font">March</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/April" className="no-underline">
                                <a href="#" className="list-font">April</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/May" className="no-underline">
                                <a href="#" className="list-font">May</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/June" className="no-underline">
                                <a href="#" className="list-font">June</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/July" className="no-underline">
                                <a href="#" className="list-font">July</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/August" className="no-underline">
                                <a href="#" className="list-font">August</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/September" className="no-underline">
                                <a href="#" className="list-font">September</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/October" className="no-underline">
                                <a href="#" className="list-font">October</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/November" className="no-underline">
                                <a href="#" className="list-font">November</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/MonthlySales/December" className="no-underline">
                                <a href="#" className="list-font">December</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <select
                        className="form-control"
                        value={selectedMedicine}
                        onChange={handleMedicineChange}
                    >
                        <option value="">Medicine</option>
                        {medicines && medicines.map((medicine, index) => (
                            <option key={index} value={medicine}>
                                {medicine}
                            </option>
                        ))}
                    </select>

                    {filteredMedicinesPurchase.length > 0 && !showFilteredReportByDate && !showAllReport&& (
                        <div className="sales-component">
                            <h4>Purchased Medicines:</h4>
                            <ul>
                                {filteredMedicinesPurchase.map((medicine) => (
                                    <li key={medicine.orderDate}>
                                        {medicine.amount} {medicine.medicineName} purchased on {medicine.orderDate}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {filteredCancelledMedicines.length > 0 && !showFilteredReportByDate && !showAllReport&&(
                        <div className="sales-component">
                            <h4>Cancelled Medicines:</h4>
                            <ul>
                                {filteredCancelledMedicines.map((medicine) => (
                                    <li key={medicine.orderDate}>
                                        {medicine.amount} {medicine.medicineName} cancelled on {medicine.orderDate}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {netSales !== null && !showMonthSales && !showFilteredReportByDate &&!showAllReport&& (
                        <div className="sales-component">
                            <h4>Net Sales: {netSales}</h4>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div>
                        <form onSubmit={handleSubmitDates}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">
                                        Start Date:
                                    </label>
                                    <input
                                        required={true}
                                        type="date"
                                        id="startDate"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endDate" className="form-label">
                                        End Date:
                                    </label>
                                    <input
                                        required={true}
                                        type="date"
                                        id="endDate"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

                {filteredMedicinesPurchaseByDate.length > 0 && showFilteredReportByDate && (
                    <div className="sales-component">
                        <h4>Purchased Medicines:</h4>
                        <ul>
                            {filteredMedicinesPurchaseByDate.map((medicine) => (
                                <li key={medicine.orderDate}>
                                    {medicine.amount} {medicine.medicineName} purchased on {medicine.orderDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {filteredCancelledMedicinesByDate.length > 0 && showFilteredReportByDate && (
                    <div className="sales-component">
                        <h4>Cancelled Medicines:</h4>
                        <ul>
                            {filteredCancelledMedicinesByDate.map((medicine) => (
                                <li key={medicine.orderDate}>
                                    {medicine.amount} {medicine.medicineName} cancelled on {medicine.orderDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {salesPurchase !== null && showFilteredReportByDate && (
                    <div className="sales-component">
                        <h4>Sales Purchase: {salesPurchase}</h4>
                    </div>
                )}

                {salesCancelled !== null && showFilteredReportByDate && (
                    <div className="sales-component">
                        <h4>Sales Cancelled: {salesCancelled}</h4>
                    </div>
                )}

                {netSalesByDate !== null && showFilteredReportByDate && (
                    <div className="sales-component">
                        <h4>Net Sales: {netSalesByDate}</h4>
                    </div>
                )}


                <div className="sales-component">
                    {showAllReport && (
                        <div className="header">
                            <h5>Report</h5>
                        </div>
                    )
                    }

                    {showAllReport && (
                        <div className="header">
                            <h5>Months and Sales:</h5>
                        </div>

                    )
                    }


                    {showAllReport && allSalesMonth && allSalesMonth.map(({month, sales}) => (
                        <p className="report-margin" key={month}>
                            {month} - Sales: {sales}
                        </p>
                    ))}

                    {showAllReport && (
                        <div className="header">
                            <h5>Purchased Medicines:</h5></div>

                    )
                    }
                    {showAllReport && allMedicinePurchase && allMedicinePurchase.map(({
                                                                                          medicineName,
                                                                                          amount,
                                                                                          orderDate
                                                                                      }) => (
                        <p className="report-margin" key={orderDate}>
                            {amount} {medicineName}(s) purchased on {orderDate}.
                        </p>
                    ))}

                    {showAllReport && (
                        <div className="header">
                            <h5>Cancelled Medicines:</h5>
                        </div>

                    )

                    }

                    {showAllReport && allCancelledMedicines && allCancelledMedicines.map(({
                                                                                              medicineName,
                                                                                              amount,
                                                                                              orderDate
                                                                                          }) => (
                        <p className="report-margin" key={orderDate}>
                            {amount} {medicineName}(s) cancelled on {orderDate}.
                        </p>
                    ))}

                </div>


            </div>

            {/*<div className="row">*/}
            {/*    <div className="sales-image">*/}
            {/*        <img src={salesReportImage} alt="Sales Report" />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

        <div className="left-part col-2">
            {showMonthSales && salesData && !showFilteredReportByDate && (
                <div className="sales-component">
                    <h4>{month}</h4>
                    <h4>Sales: {salesData.sales}</h4>
                </div>
            )}
        </div>

        </body>


    );
}

export default FilterReport;