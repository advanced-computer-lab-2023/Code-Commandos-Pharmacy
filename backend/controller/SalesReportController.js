const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const SalesReport = require("../model/SalesReport")

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
module.exports = {viewSalesReportByMonth}
