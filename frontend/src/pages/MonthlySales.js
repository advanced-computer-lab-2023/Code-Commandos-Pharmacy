import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import salesReportImage from '../images/salesReport(1).png';

const MonthlySales = () => {
    const { month } = useParams();
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(`/api/sales/viewReportByMonth/${month}`);
                if(response.ok){
                    const result = await response.json()
                    setSalesData(result);
                }
                else {
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        };

        fetchSalesData();
    }, [month]);

    return (
        <body>
        <div className="left-part col-3">
            <h1>Report</h1>
                {salesData && (
                    <div className="sales-component">
                        <h4>{month}</h4>
                        <h4>Sales: {salesData.sales}</h4>
                    </div>
                )}
        </div>
        <div className="sales-image col-5">
            <img src={salesReportImage} alt="Sales Report" />
        </div>
        </body>
    );
}

export default MonthlySales;