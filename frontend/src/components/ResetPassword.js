import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";

const ResetPassword = () => {
    const [otp, setOtp] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate()
    const {email} = useParams();


    const handleSubmit = async () => {
        const body = {otp:otp,email:email,newPassword:newPassword}
        try{
            const response = await fetch('/api/user/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if(response.ok){
                alert("Your password has been reset")
                navigate('/Login')
            }
            else {
                alert(await response.text())
                navigate('/EnterEmailReset')
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 border-danger box login-card">
                        <h1 className="text-center">An OTP has been sent to your mail</h1>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="otp">Enter the OTP</label>
                                    <input
                                        required={true}
                                        type="text"
                                        className="form-control input-danger fontMed"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="otp">New password</label>
                                    <input
                                        required={true}
                                        type="password"
                                        className="form-control input-danger fontMed"
                                        id="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <br />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block buttons"
                                    onClick={handleSubmit}
                                >
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
