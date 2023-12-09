import React, { useState} from "react";
import "../css/style.css"
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    const handlePatientChoice = ()=>{
        navigate('/PatientRegistration')
        window.location.reload()
    }
    const handlePharmacistChoice = ()=>{
        navigate('/PharmacistRegistration')
        window.location.reload()
    }
    return (
        <body className="my-patient-background">
        <div className="container">
            <div className="row justify-content-center">
                {/*<div className="col-md-6">*/}
                {/*    <div className="card mt-5 border-danger box">*/}
                {/*        <h1 className="text-center">Register</h1>*/}
                {/*        <div className="card-body">*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    <a href="#" onClick={handlePatientChoice}>Register as a patient</a>*/}
                {/*                </p>*/}
                {/*                <p>*/}
                {/*                    <a href="#" onClick={handlePharmacistChoice}>Submit a request to register as a pharmacist</a>*/}
                {/*                </p>*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="col-6">
                    <img src={require('../images/register.gif')} alt="Sold Out" className="width-adjust-register" />
                    <div className="row display-edit-register">
                        <div className="col-6">
                            <p>
                                <a className="margin-right link-edit-register" href="#" onClick={handlePatientChoice}>Register as a patient</a>
                            </p>
                        </div>
                        <div className="col-6">
                            <p>
                                <a className="link-edit-register" href="#" onClick={handlePharmacistChoice}>Submit a request to register as a pharmacist</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>

    );
};

export default Register;
