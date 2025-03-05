import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

if (!pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs; // 🔥 Fixes "vfs is undefined"
}
export const generateSecurePDF = async (formData, checkedItems, isSpouseIncluded) => {
    return new Promise((resolve, reject) => {
        try {
            const password = 'SecurePass123!';

            const docDefinition = {
                info: {
                    title: '2024 Nova Tax Checklist',
                    author: 'NovaTax',
                    subject: 'Secure Tax Checklist',
                },
                content: [
                    { text: '2024 Nova Tax Checklist', style: 'header' },
                    { text: `First Name: ${formData.firstName}`, style: 'subheader' },
                    { text: `Last Name: ${formData.lastName}` },
                    { text: `SIN: ${formData.sin}` },
                    { text: `Email: ${formData.email}` },
                    { text: `Phone: ${formData.phone}` },
                    { text: `Address: ${formData.address1}, ${formData.city}, ${formData.province} ${formData.postalCode}` },
                    { text: 'Checked Items:', style: 'subheader' },
                    ...Object.entries(checkedItems)
                        .filter(([key, value]) => value)
                        .map(([key]) => ({ text: `- ${key.replace(/([A-Z])/g, ' $1')}` })),
                    { text: 'Thank you for submitting your tax checklist!', style: 'footer' }
                ],
                styles: {
                    header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
                    subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
                    footer: { fontSize: 12, italics: true, margin: [0, 20, 0, 0] },
                },
                pageSize: 'A4',
                pageMargins: [40, 60, 40, 60],
                userPassword: password, // 🔐 Password protection
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                }
            };

            const pdfDoc = pdfMake.createPdf(docDefinition);

            pdfDoc.getBlob((pdfBlob) => {
                if (!pdfBlob || !(pdfBlob instanceof Blob)) {
                    reject(new Error("Failed to generate a valid Blob."));
                    return;
                }
                resolve({ pdfBlob, password });
            });

        } catch (error) {
            reject(error);
        }
    });
};
