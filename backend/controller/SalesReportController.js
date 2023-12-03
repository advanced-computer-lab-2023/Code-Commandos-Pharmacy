const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const SalesReport = require("../model/SalesReport")


// View All
const viewAllReport = asyncHandler(async (req,res)=>{
    try{
        const salesReport = await SalesReport.findOne();
        if(salesReport){
            res.status(200).json({salesReport})
        }
        else {
            res.status(404).json
            throw new Error("SalesReport not found")
        }
    }catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})
// View Sales Report By Month
const viewSalesReportByMonth = asyncHandler(async (req,res)=>{
    const {month} = req.params // Februaury
    // Loop over the salesReport array and return the sales of this month
    try{
        const salesReport = await SalesReport.findOne();
        if(salesReport){
            let salesOfMonth = 0;

            for(const entry of salesReport.salesMonth){
                if(entry.month === month){
                    salesOfMonth = entry.sales
                    break;
                }
            }
            res.json({ month, sales: salesOfMonth });
        } else {
            res.status(404).json({ error: 'SalesReport not found' });
        }
    }catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Filter Sales By Medicine Name. 1) display the medicines and cancelled arrays that contain this medicine name
// 2) total sales = amount of medicines - amount of cancelled
const filterReportBasedOnName = asyncHandler(async (req, res) => {
    try {
        const {name} = req.params; // Uriage
        const salesReport = await SalesReport.findOne();
        const filteredMedicinesPurchase = salesReport.medicinePurchase.filter((medicine) => medicine.medicineName === name);
        const filteredCancelledMedicines = salesReport.cancelledMedicines.filter((medicine) => medicine.medicineName === name);
        let salesPurchase = 0;
        filteredMedicinesPurchase.forEach((medicine) => {
            salesPurchase += medicine.amount;
        });
        let salesCancelled = 0;
        filteredCancelledMedicines.forEach((medicine) => {
            salesCancelled += medicine.amount;
        });
        const netSales = salesPurchase - salesCancelled;

        res.json({filteredMedicinesPurchase, filteredCancelledMedicines, salesPurchase, salesCancelled, netSales});

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

// Filter Report based on a Date (orderDate in medicinePurchase array and cancelledMedicines array
// 1) display the medicines and cancelled arrays that contain
// this date  2) total sales = amount of medicines - amount of cancelled
const filterReportBasedOnDate = asyncHandler(async (req, res) => {
    try {
        const { start, end } = req.params;
        const salesReport = await SalesReport.findOne();

        const filteredMedicinesPurchase = salesReport.medicinePurchase.filter(
            (medicine) => {
                const orderDate = new Date(medicine.orderDate);
                const startDate = new Date(start);
                const endDate = new Date(end);
                endDate.setDate(endDate.getDate() + 1); // to include the end date
                return orderDate >= startDate && orderDate < endDate;
            }
        );

        const filteredCancelledMedicines = salesReport.cancelledMedicines.filter(
            (medicine) => {
                const orderDate = new Date(medicine.orderDate);
                const startDate = new Date(start);
                const endDate = new Date(end);
                endDate.setDate(endDate.getDate() + 1); // to include the end date
                return orderDate >= startDate && orderDate < endDate;
            }
        );

        let salesPurchase = 0;
        filteredMedicinesPurchase.forEach((medicine) => {
            salesPurchase += medicine.amount;
        });

        let salesCancelled = 0;
        filteredCancelledMedicines.forEach((medicine) => {
            salesCancelled += medicine.amount;
        });

        const netSales = salesPurchase - salesCancelled;

        res.json({
            filteredMedicinesPurchase,
            filteredCancelledMedicines,
            salesPurchase,
            salesCancelled,
            netSales,
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


module.exports = {
    viewSalesReportByMonth,
    filterReportBasedOnName,
    filterReportBasedOnDate,
    viewAllReport
}
