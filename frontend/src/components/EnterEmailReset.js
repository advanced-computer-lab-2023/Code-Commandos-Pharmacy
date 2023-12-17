import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const EnterEmailReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('api/user/generateOTP',{email:email})
            if(response.status == 200){
                navigate(`/ResetPassword/${email}`)
            }
        }
        catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Logout Error',
                text: "No user found for such an email",
            })
        }
    };

    return (
        <body className="">
        {<Navbar />}
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <img src={require('../images/authentication.png')} height={350} alt="Sold Out" className="width-adjust-auth" />
                        <div className=" mt-5 border-danger box">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email"></label>
                                        <input
                                            required={true}
                                            type="email"
                                            className="form-control input-danger fontMed"
                                            id="email"
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block buttons btn-auth"
                                        onClick={handleSubmit}
                                    >
                                        Send OTP
                                    </button>
                                </form>
                        </div>
                </div>

            </div>
        </div>
        </body>

    );
};

export default EnterEmailReset;
