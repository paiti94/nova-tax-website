import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      fontSize: 12,
      color: '#333',
    },

    section: {
      marginBottom: 10,
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subHeader: {
      fontSize: 14,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    text: {
      marginBottom: 5,
    },
    bold: {
      fontWeight: 'bold',
      color: 'grey',
    },
    footer: {
      marginTop: 40,
      fontSize: 10,
      textAlign: 'center',
      color: '#777',
    },
    table: {
      display: 'table',
      width: '100%',
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '1px solid #000', // Border between rows
    },
    tableCell: {
      flex: 1, // Each cell takes equal space
      padding: 10, // Increased padding for better spacing
      fontSize: 12,
      borderRight: '1px solid #000', // Right border for each cell
    },
    tableHeader: {
      fontWeight: 'bold',
      fontSize: 14,
      padding: 10,
      backgroundColor: '#f2f2f2', // Light gray background for header
    },
    alternatingRow: {
      backgroundColor: '#f9f9f9', // Light background for alternating rows
    },
  });

// PDF Document Component
const PDFGenerator = ({ formData, checkedItems, isSpouseIncluded }) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>2024 Nova Tax Checklist</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Personal Information</Text>
        <Text style={styles.text}><Text style={styles.bold}>First Name:</Text> {formData.firstName}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Last Name:</Text> {formData.lastName}</Text>
        <Text style={styles.text}><Text style={styles.bold}>DOB (YYYY-MM-DD):</Text> {formData.dob}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Email:</Text> {formData.email}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Phone:</Text> {formData.phone}</Text>
        <Text style={styles.text}><Text style={styles.bold}>SIN:</Text> {formData.sin}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Address Line 1:</Text> {formData.address1}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Address Line 2:</Text> {formData.address2}</Text>
        <Text style={styles.text}><Text style={styles.bold}>City:</Text> {formData.city}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Province:</Text> {formData.province}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Postal Code:</Text> {formData.postalCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Marital Status</Text>
        <Text style={styles.text}><Text style={styles.bold}>Marital Status:</Text> {formData.maritalStatus}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Date of Marital Status Change:</Text> {formData.maritalStatusChangeDate}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Did your marital status change in 2024?</Text> {formData.maritalStatusChange}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Will we be preparing spouse's return as well?</Text> {isSpouseIncluded ? 'Yes' : 'No'}</Text>
      </View>

      {isSpouseIncluded && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Spouse's Information</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's First Name:</Text> {formData.spouseFirstName}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's Last Name:</Text> {formData.spouseLastName}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's Date of Birth (YYYY-MM-DD):</Text> {formData.spouseDob}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's Email:</Text> {formData.spouseEmail}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's Phone:</Text> {formData.spousePhone}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's SIN:</Text> {formData.spouseSin}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.subHeader}>Dependants</Text>
        <Text style={styles.text}><Text style={styles.bold}>Did you have any dependants in 2024?</Text> {formData.dependants}</Text>
        {formData.dependants === 'Yes' && (
          <Text style={styles.text}><Text style={styles.bold}>If yes, please include the dependant’s relevant information:</Text> {formData.dependantInfo}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Additional Information</Text>
        <Text style={styles.text}><Text style={styles.bold}>Notes:</Text> {formData.notes}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Are you a Canadian citizen?</Text> {formData.citizenship}</Text>
        <Text style={styles.text}><Text style={styles.bold}>If yes, should your name, address, date of birth, and citizenship information be supplied to Elections Canada?</Text> {formData.citizenshipElections}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Do you have citizenship or residence in a country other than Canada (or a US Green Card)?</Text> {formData.citizenshipCountry}</Text>
        <Text style={styles.text}><Text style={styles.bold}>If yes, please indicate the country:</Text> {formData.citizenshipCountryName}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Did you sell any Cryptocurrency in 2024?</Text> {formData.cryptocurrency}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Did you dispose of a property (or properties) in 2024 for which you are claiming a principal residence exemption?</Text> {formData.propertyExemption}</Text>
        <Text style={styles.text}><Text style={styles.bold}>In 2024, in total did you own non-Canadian property?</Text> {formData.nonCanadianProperty}</Text>
        <Text style={styles.text}><Text style={styles.bold}>In 2024, did you have an ownership of 1% or greater in any non-Canadian corporations?</Text> {formData.ownershipNonCanadian}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Did you or your spouse open a First Home Savings Account (“FHSA) in 2024?</Text> {formData.fhsa}</Text>
        <Text style={styles.text}><Text style={styles.bold}>In 2024, did you rent a property in BC?</Text> {formData.rentalProperty}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Do you have a bare trust or another trust arrangement?</Text> {formData.trustArrangement}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Are you claiming the disability tax credit for any family member?</Text> {formData.disabilityCredit}</Text>
      </View>

      {isSpouseIncluded && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Spouse's Additional Information</Text>
          <Text style={styles.text}><Text style={styles.bold}>Spouse's Canadian citizen?</Text> {formData.spouseCitizenship}</Text>
          <Text style={styles.text}><Text style={styles.bold}>If yes, should your spouse's name, address, date of birth, and citizenship information be supplied to Elections Canada?</Text> {formData.spouseCitizenshipElections}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Does your spouse have citizenship or residence in a country other than Canada (or a US Green Card)?</Text> {formData.spouseCitizenshipCountry}</Text>
          <Text style={styles.text}><Text style={styles.bold}>If yes, please indicate the country:</Text> {formData.spouseCitizenshipCountryName}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Did your spouse sell any Cryptocurrency in 2024?</Text> {formData.spouseCryptocurrency}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Did your spouse dispose of a property (or properties) in 2024 for which they are claiming a principal residence exemption?</Text> {formData.spousePropertyExemption}</Text>
          <Text style={styles.text}><Text style={styles.bold}>In 2024, did your spouse own non-Canadian property?</Text> {formData.spouseNonCanadianProperty}</Text>
          <Text style={styles.text}><Text style={styles.bold}>In 2024, did your spouse have an ownership of 1% or greater in any non-Canadian corporations?</Text> {formData.spouseOwnershipNonCanadian}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Did your spouse open a First Home Savings Account (“FHSA) in 2024?</Text> {formData.spouseFhsa}</Text>
          <Text style={styles.text}><Text style={styles.bold}>In 2024, did your spouse rent a property in BC?</Text> {formData.spouseRentalProperty}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Does your spouse have a bare trust or another trust arrangement?</Text> {formData.spouseTrustArrangement}</Text>
          <Text style={styles.text}><Text style={styles.bold}>Is your spouse claiming the disability tax credit for any family member?</Text> {formData.spouseDisabilityCredit}</Text>
        </View>
      )}

      {/* <Text style={styles.subHeader}>Checked Items to be included in return:</Text> */}
      <Text style={styles.subHeader}>Checked Items</Text>
      {Object.entries(checkedItems).map(([key, value], index) => {
        if (value) {
          return (
            <Text style={styles.text}key={key}> {itemLabels[key]}</Text>
          );
        }
        return null;
      })}
      
      <Text style={styles.footer}>This document is generated for your records.</Text>
    </Page>
  </Document>
);

// Function to generate the PDF
export const generatePDF = async (formData, checkedItems, isSpouseIncluded) => {
  const doc = <PDFGenerator formData={formData} checkedItems={checkedItems} isSpouseIncluded={isSpouseIncluded} />;
  return pdf(doc).toBlob(); // Convert to Blob
};

export default PDFGenerator;
