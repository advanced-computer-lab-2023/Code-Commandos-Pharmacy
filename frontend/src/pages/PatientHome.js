import { useNavigate } from 'react-router-dom';
import PatientNavbar from "../components/PatientNavbar";
import Navbar from "../components/Navbar";
import React from "react";

const PatientHome = ({role, name}) => {

    const navigate = useNavigate();

    const handleBrowseMedications = () => {
        navigate('/viewAllAndSearchMedicineByName');
    };
    return(

        <body className="my-patient-background">
        <div>
            <Navbar />
        </div>
        <div className="row">
            <div className="col-6">
                <h2 className="margin-edit">
                    <h1 className="red-color">Welcome {role} {name}</h1>
                    <br/>
                    <br/>
                    <br/>
                    <p>Your Trusted Online Pharmacy</p>
                    <p>Buy Medications in a Click, Anytime,</p>
                    <p>Anywhere!</p>
                    {/*<img className="margin-edit-medicine" src={require(`../images/medicine-carry.gif`)} alt="Medicine"/>*/}

                    <button className="browse-btn" onClick={handleBrowseMedications}>
                        Browse Medications
                    </button>

                </h2>

            </div>
            <div className="col-6">
                <img className="patient-pic margin-edit" src={require(`../images/patient-home.jpg`)} alt="Pharmacy"/>

            </div>
        </div>

        </body>
    )
}
export default PatientHome