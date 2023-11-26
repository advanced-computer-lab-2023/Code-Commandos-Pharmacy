import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const MedicineDetails = ({medicine}) => {
    const [idFileInfo, setIdFileInfo] = useState({ fileName: '', filePath: '' });

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


    const handleAddToCart = async () => {
        try {
            const response = await fetch(`/api/cart/addToCart/${medicine.name}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to add medicine to cart');
            }
            const updatedCart = await response.json();
            alert("Medicine Added to Cart Successfully!")
            console.log(updatedCart)
        } catch (error) {
            console.error(error);
        }
    };

    const handleArchive = async () => {
        try {
            const response = await fetch(`/api/medicine/archive/${medicine.name}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to archive Medicine');
            }
            const archivedMed = await response.json();
            alert("Medicine Archived Successfully!")
            console.log(archivedMed)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="image-container ">
                <img src={`http://localhost:8090${idFileInfo.filePath}`} alt={medicine.name} className="med-img"/>
                <div className="icon-overlay logo-container">
                    <Link to={`/editMedicine/${medicine.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>
                    <button className="archive-btn" onClick={handleArchive}>
                        <img className="edit-logo" src={require(`../images/archive.png`)} alt="Archive"/>
                    </button>
                    <br/>
                <br/>
                    <button className="addToCart-btn" onClick={handleAddToCart}>
                        <img className="edit-addToCart" src={require(`../images/addToCart.png`)} alt="Cart"/>
                    </button>
                </div>
            </div>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>
            <p>{medicine.description}</p>
        </div>
    )
}

export default MedicineDetails;