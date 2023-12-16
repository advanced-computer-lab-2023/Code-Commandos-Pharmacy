import React, { useEffect, useState } from "react";
import "../css/ViewMyWalletAsPatient.css";
import wallett from '../images/wallet.jpg';
import swal from 'sweetalert';

const ViewMyWalletAsPharmacist = () => {
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                const response = await fetch('/api/pharmacist/getAmount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });


                if (response.ok) {
                    const result = await response.json()
                    setWallet(result);
                }
                else {
                    swal(await response.text())
                }
            } catch (error) {
                swal(error.message)
            }
        };

        fetchAmount();

        
    }, []);
    return (
        <div className="bodyy">
            <div className ="bodyyy2">
                <div className ="walletcon">
                    <img className="wallett" src={require(`../images/wallet.gif`)} alt="Wallet"/>
                    {/*<img src={wallett} className="wallett" alt="wallet" />*/}
                    <h4 className="ammouunt">Amount of Money in Your Wallet:  {wallet} <span className ="dollar">$ </span></h4>
                </div>
            </div>
        </div>

    );
}

export default ViewMyWalletAsPharmacist;
