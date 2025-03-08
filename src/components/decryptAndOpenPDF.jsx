// import CryptoJS from "crypto-js";

// const decryptAndOpenPDF = async (encryptedFile, password) => {
//     try {
//         // Step 1: Read the encrypted file as text
//         const reader = new FileReader();
//         reader.readAsText(encryptedFile);

//         reader.onload = (event) => {
//             const encryptedData = event.target.result;

//             // Step 2: Decrypt the text using the password
//             const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
//             const decryptedBytes = decrypted.toString(CryptoJS.enc.Utf8);

//             if (!decryptedBytes) throw new Error("Decryption failed");

//             // Step 3: Convert Base64 back to Blob (PDF)
//             const byteCharacters = atob(decryptedBytes);
//             const byteNumbers = new Uint8Array(byteCharacters.length);
//             for (let i = 0; i < byteCharacters.length; i++) {
//                 byteNumbers[i] = byteCharacters.charCodeAt(i);
//             }

//             const pdfBlob = new Blob([byteNumbers], { type: "application/pdf" });

//             // Step 4: Open the decrypted PDF in a new tab
//             const pdfURL = URL.createObjectURL(pdfBlob);
//             window.open(pdfURL);
//             const originalFileName = encryptedFile.name.replace('.enc', '.pdf'); // Change the extension to .pdf
//             const downloadLink = document.createElement('a');
//             downloadLink.href = pdfURL;
//             downloadLink.download = originalFileName; // Set the original file name
//             document.body.appendChild(downloadLink);
//             downloadLink.click(); // Programmatically click the link to trigger the download
//             document.body.removeChild(downloadLink); // Clean up the link element

//         };
//         reader.onerror = (error) => {
//             console.error("Error reading file:", error);
//             alert("Failed to read the file.");
//         };
//     } catch (error) {
//         console.error("Error decrypting file:", error);
//         alert("Failed to decrypt the file. Please check the password.");
//     }
// };

// export default decryptAndOpenPDF;