import {Link, useNavigate} from "react-router-dom";
import React from "react";
import PharmacistNavbar from "../components/PharmacistNavbar";

const PharmacistHome = ({role,name}) => {
    const navigate = useNavigate();

    return(
        <body className="my-patient-background">
        {<PharmacistNavbar />}
        <div className="row">
            <div className="col-6">
                <h2 className="margin-edit">
                    <h2 className="red-color">Welcome {role} {name}</h2>
                    <br/>
                    <br/>
                    <p><Link className="link-editt" to="/MonthlySales/December" onClick={()=> navigate('/MonthlySales/December')}>
                        Total Sales Report
                    </Link></p>
                    <p><Link className="link-editt" to="/viewAllAndSearchMedicineByName" onClick={()=> navigate('/viewAllAndSearchMedicineByName')}>
                        Browse Medications
                    </Link></p>
                    <p><Link className="link-editt" to="/quantityAndSales" onClick={()=> navigate('/quantityAndSales')}>
                            Medicine's Quantity and Sales
                    </Link></p>
                    <p><Link className="link-editt" to="/addMedicine" onClick={()=> navigate('/addMedicine')}>
                        Add Medicine
                    </Link></p>
                    <p><Link className="link-editt" to="/viewArchivedMedicines" onClick={()=> navigate('/viewArchivedMedicines')}>
                        Unarchive a Medicine
                    </Link></p>
                </h2>
            </div>
            <div className="col-6">
                <img className="doctor-gif" src={require(`../images/doctorr.gif`)} alt="Pharmacy"/>
            </div>
        </div>
        </body>
    )
}
export default PharmacistHome