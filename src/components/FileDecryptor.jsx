import React, { useState } from "react";
import decryptAndOpenPDF from "./decryptAndOpenPDF";
import '../styles/FileDecryptor.css';

const FileDecryptor = () => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setErrorMessage(""); // Clear error message on file change
    };

    const handleDecrypt = () => {
        if (!file || !password) {
            setErrorMessage("Please select a file and enter the password!");
            return;
        }
        decryptAndOpenPDF(file, password)
            .then(() => {
                setSuccessMessage("PDF decrypted successfully!");
                setErrorMessage(""); // Clear any previous error messages
            })
            .catch((error) => {
                setErrorMessage("Failed to decrypt the file. Please check the password.");
                setSuccessMessage(""); // Clear any previous success messages
            });
    };

    return (
        <div className="form-container">
            <h1>Decrypt and Open PDF</h1>
            <input
                type="file"
                accept=".enc"
                onChange={handleFileChange}
                className="file-input"
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
            />
            <button onClick={handleDecrypt} className="decrypt-button">Decrypt & Download</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default FileDecryptor;