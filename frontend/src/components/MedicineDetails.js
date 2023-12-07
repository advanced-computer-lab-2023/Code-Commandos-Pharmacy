import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import button from "bootstrap/js/src/button";

const MedicineDetails = ({medicine}) => {
    const [idFileInfo, setIdFileInfo] = useState({fileName: '', filePath: ''});

    const navigate = useNavigate();
    const handleShowAlternatives = () => {
        navigate(`/Alternatives/${medicine.name}`);
    };

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
                {medicine.quantity === 0 ? (
                    <img src={require(`../images/sold-out.png`)} alt="Sold Out" className="med-img"/>
                ) : (
                    <img src={`http://localhost:8090${idFileInfo.filePath}`} alt={medicine.name} className="med-img"/>
                )}
                <div className="icon-overlay logo-container">


                    <Link to={`/editMedicine/${medicine.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>


                    <button className="archive-btn" onClick={handleArchive}>
                        <img className="edit-logo" src={require(`../images/archive.png`)} alt="Archive"/>
                    </button>

                    <br/>
                    <br/>
                    {medicine.quantity === 0 ? (
                        <img className="cant-add-to-cart" src={require(`../images/out-of-stock-icon.png`)} alt="Out-of-Stock"/>
                    ) : (
                        <button className="addToCart-btn" onClick={handleAddToCart}>
                            <img className="edit-addToCart" src={require(`../images/addToCart.png`)} alt="Cart"/>
                        </button>
                    )}

                </div>
            </div>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>

            {medicine.quantity === 0 ? (
                <button className="btn btn-primary search-btn-alternatives" onClick={handleShowAlternatives}>
                    Show Alternatives
                </button>
            ) : (
                <p>{medicine.description}</p>
            )}

        </div>
    )
}

export default MedicineDetails;