import { useNavigate } from 'react-router-dom';
import React from "react";
import PatientNavbar from "../components/PatientNavbar";

const PatientHome = () => {
    const name = window.localStorage.getItem("name")

    const navigate = useNavigate();

    const handleBrowseMedications = () => {
        navigate('/viewAllAndSearchMedicineByName');
    };
    return(

        <body className="my-patient-background">
        {<PatientNavbar />}
        <div className="row">
            <div className="col-6">
                <h2 className="margin-edit">
                    <h2 className="red-color">Welcome Patient {name}</h2>
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