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
                const response = await axios.get(`/api/sales/viewReportByMonth/${month}`);
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
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