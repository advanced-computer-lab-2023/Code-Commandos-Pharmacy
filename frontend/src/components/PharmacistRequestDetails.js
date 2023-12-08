import React, {useState,useEffect} from 'react';
import axios from "axios";

const PharmacistRequestDetails = ({ pharmacistRequest }) => {
    const handleAccept = async () => {
        try {
            const response = await fetch('/api/pharmacistRequest/acceptRequest/'+pharmacistRequest._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Pharmacist request accepted successfully!');
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error accepting pharmacist request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/pharmacistRequest/rejectRequest/${pharmacistRequest._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Pharmacist request rejected successfully!');
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error rejecting pharmacist request:', error);
        }
    };

    const [idFileInfo, setIdFileInfo] = useState({ fileName: '', filePath: '' });
    const [licenseFileInfo, setLicenseFileInfo] = useState({ fileName: '', filePath: '' });
    const [degreeFileInfo, setDegreeFileInfo] = useState({ fileName: '', filePath: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idFileInfoResponse = await axios.get(`/api/file/getFileById/${pharmacistRequest.ID}`);
                const licenseFileInfoResponse = await axios.get(`/api/file/getFileById/${pharmacistRequest.workLicense}`);
                const degreeFileInfoResponse = await axios.get(`/api/file/getFileById/${pharmacistRequest.pharmacyDegree}`);
                console.log("files found")
                // Set file names in state
                setIdFileInfo({
                    fileName: idFileInfoResponse.data.fileName,
                    filePath: idFileInfoResponse.data.filePath,
                });
                setLicenseFileInfo({
                    fileName: licenseFileInfoResponse.data.fileName,
                    filePath: licenseFileInfoResponse.data.filePath,
                });
                setDegreeFileInfo({
                    fileName: degreeFileInfoResponse.data.fileName,
                    filePath: degreeFileInfoResponse.data.filePath,
                });

            } catch (error) {
                console.error('Error fetching file names:', error.message);
            }
        };

        fetchData();
    }, [pharmacistRequest.ID, pharmacistRequest.workLicense, pharmacistRequest.pharmacyDegree]);

    const createFileLink = (fileInfo) => {
        return (
            <a href={`http://localhost:8090${fileInfo.filePath}`} target="_blank" rel="noopener noreferrer">
                {fileInfo.fileName}
            </a>
        );
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{pharmacistRequest.name}</h5>
                <p className="card-text">Username: {pharmacistRequest.username}</p>
                <p className="card-text">Email: {pharmacistRequest.email}</p>
                <p className="card-text">Date of Birth: {pharmacistRequest.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${pharmacistRequest.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {pharmacistRequest.affiliation}</p>
                <p className="card-text">Educational Background: {pharmacistRequest.educationalBackground}</p>
                <p className="card-text">Status: {pharmacistRequest.status}</p>
                <p className="card-text">Medical ID: {createFileLink(idFileInfo)}</p>
                <p className="card-text">Medical License: {createFileLink(licenseFileInfo)}</p>
                <p className="card-text">Medical Degree: {createFileLink(degreeFileInfo)}</p>
                <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default PharmacistRequestDetails;
