import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import salesReportImage from '../images/sales (2).png';

const AdminReport = () => {
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


    return (
        <body>
        <div className="row margin-left col-2">
            <div className="container">
                <div className="row">
                    <button className="all-btn" onClick={fetchReport}>
                        All
                    </button>
                </div>
                <div className="row">
                    <p className="mt-4 fw-bold">Month</p>
                    <ul className="medicinal-use-list">
                        <li>
                            <Link to="/AdminReport/January" className="no-underline">
                                <a href="#" className="list-font">January</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/February" className="no-underline">
                                <a href="#" className="list-font">February</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/March" className="no-underline">
                                <a href="#" className="list-font">March</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/April" className="no-underline">
                                <a href="#" className="list-font">April</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/May" className="no-underline">
                                <a href="#" className="list-font">May</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/June" className="no-underline">
                                <a href="#" className="list-font">June</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/July" className="no-underline">
                                <a href="#" className="list-font">July</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/August" className="no-underline">
                                <a href="#" className="list-font">August</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/September" className="no-underline">
                                <a href="#" className="list-font">September</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/October" className="no-underline">
                                <a href="#" className="list-font">October</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/November" className="no-underline">
                                <a href="#" className="list-font">November</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/AdminReport/December" className="no-underline">
                                <a href="#" className="list-font">December</a>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div className="sales-component-admin">
            {showMonthSales && salesData && !showFilteredReportByDate && (
                <div>
                    <h4 className="blue-color">{month}</h4>
                    <h4 className="blue-color">Sales:
                        <span className="span-margin">
                          {salesData.sales}
                    </span></h4>
                </div>
            )}
            <div>
                {showAllReport && (
                    <div>
                        <h5 className="blue-color">Report</h5>
                    </div>
                )
                }

                {showAllReport && (
                    <div className="header">
                        <h5 className="blue-color">Months and Sales:</h5>
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
                        <h5 className="blue-color">Purchased Medicines:</h5></div>

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
                        <h5 className="blue-color">Cancelled Medicines:</h5>
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

        <div className="row">
            <div className="sales-image-admin">
                <img src={salesReportImage} alt="Sales Report"/>
            </div>
        </div>

        </body>


    );
}

export default AdminReport;