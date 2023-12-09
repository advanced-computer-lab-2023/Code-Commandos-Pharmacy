//import { useEffect, useState } from "react";

import PharmacistRegistrationForm from '../components/PharmacistRegistrationForm'
import React from "react";

const PharmacistRegistration = () => {

    return (
        <body>
        <div className="row">
            <div className="col-6">
                <div className="pharmacist-registration">
                    <PharmacistRegistrationForm />
                </div>
            </div>
            <div className="col-6">
                <img src={require('../images/apply-pharma.jpg')} alt="Sold Out" className="width-adjust" />
            </div>
        </div>
        </body>

    )
}

export default PharmacistRegistration;