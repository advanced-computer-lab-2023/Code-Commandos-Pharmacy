import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MedicineCartDetails = ({medicine}) => {
    const [idFileInfo, setIdFileInfo] = useState({ fileName: '', filePath: '' });
    console.log("printing medicine ",medicine)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const idFileInfoResponse = await axios.get(`/api/file/getFileById/${medicine.imageUploadID}`);
                setIdFileInfo({
                    fileName: idFileInfoResponse.data.fileName,
                    filePath: idFileInfoResponse.data.filePath,
                });

            } catch (error) {
                console.error('Error fetching file names:', error.message);
            }
        };

        fetchData();
    }, [medicine.imageUploadID]);

    const handleRemove = async () => {
        try {
            const response = await fetch(`/api/cart/removeMedicine/${medicine.name}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Error removing medicine from cart');
            }
            const updatedCart = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Medicine removed from cart',
            }).then(() => {
                window.location.reload();
            });
            console.log(updatedCart);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={`http://localhost:8090${idFileInfo.filePath}`} alt={medicine.name} className="med-img"/>
                <div className="icon-overlay logo-container">
                    <Link to={`/editMedicineInCart/${medicine.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>
                    <br/>
                </div>
            </div>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>
            <p>{medicine.description}</p>
            <p>Amount: {medicine.amount}</p>
            <p><button className="remove-btn" onClick={handleRemove}>Remove</button></p>
        </div>
    )
}

export default MedicineCartDetails;