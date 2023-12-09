//import { useEffect, useState } from "react";

import PatientRegistrationForm from '../components/PatientRegistrationForm'
import React from "react";

const PatientRegistration = () => {

    return (
        <body className="">
        <div className="row">
            <div className="col-6">
                <div className="patient-registration width-registration margin-left">
                    <PatientRegistrationForm />
                </div>
            </div>
            <div className="col-3">
                <img src={require('../images/patient-reg.png')} alt="Sold Out" className="image-adjust-patient" />
            </div>
        </div>


        </body>

    )
}

export default PatientRegistration;