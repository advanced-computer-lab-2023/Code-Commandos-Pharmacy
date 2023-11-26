import React from "react";

const ArchivedMedicineInfo = ({ name, price, sales }) => {

    const handleUnarchive = async () => {
        try {
            const response = await fetch(`/api/medicine/unarchive/${name}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to unarchrive medicine');
            }
            const unarchivedMed = await response.json();
            alert("Medicine Unarchived Successfully")
            console.log(unarchivedMed)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="col-sm-5">
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">Price: {price}</p>
                            <p className="card-text">Sales: {sales}</p>
                        </div>
                        <button type="button" className="btn buttonNav" onClick={handleUnarchive}>
                            Unarchive
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchivedMedicineInfo;