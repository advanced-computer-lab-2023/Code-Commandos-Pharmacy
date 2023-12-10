import React, { useEffect, useState } from 'react';
import salesReportImage from '../images/sales (2).png';

const SalesReport = () => {
    const [salesMonth, setSalesMonth] = useState([]);
    const [medicinePurchase, setMedicinePurchase] = useState([]);
    const [cancelledMedicines, setCancelledMedicines] = useState([]);


    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/sales/viewAll`);
                if(response.ok){
                    const result = await response.json()
                    setSalesMonth(result.salesReport.salesMonth);
                    setMedicinePurchase(result.salesReport.medicinePurchase);
                    setCancelledMedicines(result.salesReport.cancelledMedicines);
                }
                else {
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        };
        fetchReport();
    }, []);

    return (
        <body>
        <div className="sales-component">
            <div className="header">
                <h5>Report</h5>
            </div>

            <div className="header">
                <h5>Months and Sales:</h5>
                {salesMonth && salesMonth.map(({ month, sales }) => (
                    <p className="report-margin" key={month}>
                        {month} - Sales: {sales}
                    </p>
                ))}
            </div>

            <div className="header">
                <h5>Purchased Medicines:</h5>
                {medicinePurchase && medicinePurchase.map(({medicineName, amount, orderDate}) => (
                    <p className="report-margin" key={orderDate}>
                        {amount} {medicineName}(s) purchased on {orderDate}.
                    </p>
                ))}
            </div>

            <div className="header">
                <h5>Cancelled Medicines:</h5>
                {cancelledMedicines && cancelledMedicines.map(({medicineName, amount, orderDate}) => (
                    <p className="report-margin" key={orderDate}>
                        {amount} {medicineName}(s) cancelled on {orderDate}.
                    </p>
                ))}
            </div>

        </div>
        <div className="sales-image">
            <img src={salesReportImage} alt="Sales Report" />
        </div>
        </body>
    );
}

export default SalesReport;