import React from 'react';

const MedicineDetails = ({ medicine }) => {
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <img src={require(`../images/${medicine.image}`)} alt={medicine.name}/>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>
            <p>{medicine.description}</p>
        </div>
    )
}

export default MedicineDetails;