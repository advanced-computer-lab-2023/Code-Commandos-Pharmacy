import {Link, useNavigate} from "react-router-dom";
import React from "react";
import PharmacistNavbar from "../components/PharmacistNavbar";
import AdminNavbar from "../components/AdminNavbar";

const AdminHome = ({role,name}) => {
    const navigate = useNavigate();

    return(
        <body className="my-patient-background">
        {<AdminNavbar/>}
        <div className="row">
            <div className="col-6">
                <h2 className="margin-edit">
                    <h2 className="red-color">Welcome {role} {name}</h2>
                    <br/>
                    <br/>
                    <p><Link className="link-editt" to="/AdminReport/December" onClick={()=> navigate('/MonthlySales/December')}>
                        Total Sales Report
                    </Link></p>
                    <p><Link className="link-editt" to="/viewAllAndSearchMedicineByName" onClick={()=> navigate('/viewAllAndSearchMedicineByName')}>
                        Browse Medications
                    </Link></p>
                    <p><Link className="link-editt" to="/ViewAndRemovePatients" onClick={()=> navigate('/ViewAndRemovePatients')}>
                        View/Remove Patients
                    </Link></p>
                    <p><Link className="link-editt" to="/ViewAndRemovePharmacists" onClick={()=> navigate('/ViewAndRemovePharmacists')}>
                        View/Remove Pharmacists
                    </Link></p>
                    <p><Link className="link-editt" to="/ViewAllPharmacistRequests" onClick={()=> navigate('/ViewAllPharmacistRequests')}>
                        View Pharmacists' Requests
                    </Link></p>
                </h2>
            </div>
            <div className="col-6">
                <img className="admin-gif margin-edit" src={require(`../images/admin-gif.gif`)} alt="Pharmacy"/>
            </div>
        </div>
        </body>
    )
}
export default AdminHome