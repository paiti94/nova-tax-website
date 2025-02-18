// src/components/TaxChecklistForm.jsx
import React, { useState } from 'react';
import { FormControl, FormLabel, InputLabel, Select, MenuItem, TextField, RadioGroup, FormControlLabel, Radio, InputAdornment, IconButton } from '@mui/material';
import { pdf, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; 
import '../styles/TaxChecklistForm.css'; // Import the CSS file
import CountrySelect from './CountrySelect';


const TaxChecklistForm = () => {
    
  const [isSpouseIncluded, setIsSpouseIncluded] = useState(false);
  const [isDependants, setIsDependants] = useState(false);
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

  const itemLabels = {
    employmentIncome: "T4 - Employment Income",
    T4PS: "T4PS - Employee Profit-Sharing Plan",
    T4AOAS: "T4A(OAS) - Old Age Security",
    T4AP: "T4A(P) - Canada Pension Plan (CPP) Benefits",
    T4A: "T4A, T4RSP, T4RIF - Retirement or Other Pension Income",
    T4E: "T4E - Employment Insurance (EI) Benefits",
    rc62: "RC62 - Universal Child Care Benefits",
    t5007: "T5007 - Workers' Compensation or Social Assistance",
    t5: "T5 - Interest, Dividends, or Investment Income",
    t3: "T3 - Mutual Funds & Trust Income",
    t5013: "T5013 - Partnership Income/Losses",
    t5008: "T5008 - Capital Gains/Losses from Investment Sales",
    annualInvestmentPackage: "Annual Investment Package",
    realEstateSale: "Did you sell any real estate in 2024? (Provide purchase & sale details)",
    realEstateChange: "Did you change the use of any real estate (personal-use to rental or vice versa) in 2024?",
    selfEmployedIncome: "Business, Professional, Commission, or Farming Income (Provide income & expense details)",
    rentalIncome: "Rental Income (Provide income & expense details)",
    childSupport: "Child or Spousal Support Received (Provide separation/divorce agreement)",
    stockOptions: "Stock Options, Annuities, Scholarships, Bursaries, or Research Grants",
    rrspContributions: "RRSP Contributions (Provide receipts)",
    t4fhsa: "T4FHSA - First Home Savings Account (FHSA) Contributions",
    unionDues: "Union or Professional Dues",
    movingExpenses: "Moving Expenses (If moved 40km closer to work)",
    employmentExpenses: "Employment or Commission Expenses (T2200 signed by employer is mandatory)",
    investmentLosses: "Investment Losses & Carrying Charges (Interest, Investment Management Fees, Accounting Fees)",
    childCareExpenses: "Child Care Expenses",
    attendantCare: "Attendant Care Expenses (for disabilities)",
    medicalExpenses: "Medical & Dental Expenses (Including private health insurance premiums)",
    disabilityTaxCredit: "Disability Tax Credit (For you or a dependant)",
    adoptionExpenses: "Adoption Expenses",
    tuitionFees: "Tuition Fees (Provide T2202/T2202A)",
    studentLoanInterest: "Student Loan Interest Paid",
    firstTimeHomeBuyer: "First-Time Home Buyer’s Tax Credit",
    clergyDeduction: "Clergy Residence Deduction (Attach Form T1223)",
    charitableDonations: "Charitable & Political Donations",
    alimony: "Alimony/Spousal Support Paid (Provide agreement)",
    covidRepayment: "COVID-19 Benefits Repayment",
    homeRenovationCredit: "Multigenerational Home Renovation Credit",
    toolCosts: "Tool Costs for Tradespersons",
  };
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    sin: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseDob: '',
    spouseEmail: '',
    spousePhone: '',
    spouseSin: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    maritalStatus: '',
    maritalStatusChange: '',
    maritalStatusChangeDate: '',
    dependants: '',
    trustArrangement: '',
    disabilityCredit: '',
    countries: '',
    notes: '',
    citizenship: '',
    citizenshipElections: '',
    citizenshipCountry: '',
    cryptocurrency: '',
    propertyExemption: '',
    nonCanadianProperty: '',
    ownershipNonCanadian: '',
    fhsa: '',
    rentalProperty: '',
  });

  const [checkedItems, setCheckedItems] = useState({
    employmentIncome: false,
    T4PS: false,
    T4AOAS: false,
    T4AP: false,
    T4A: false,
    T4E: false,
    rc62: false,
    t5007: false,
    t5: false,
    t3: false,
    t5013: false,
    t5008: false,
    annualInvestmentPackage: false,
    realEstateSale: false,
    realEstateChange: false,
    selfEmployedIncome: false,
    rentalIncome: false,
    otherIncome: false,
    childSupport: false,
    stockOptions: false,
    rrspContributions: false,
    t4fhsa: false,
    unionDues: false,
    movingExpenses: false,
    employmentExpenses: false,
    investmentLosses: false,
    childCareExpenses: false,
    attendantCare: false,
    medicalExpenses: false,
    disabilityTaxCredit: false,
    adoptionExpenses: false,
    tuitionFees: false,
    studentLoanInterest: false,
    firstTimeHomeBuyer: false,
    clergyDeduction: false,
    charitableDonations: false,
    alimony: false,
    covidRepayment: false,
    homeRenovationCredit: false,
    toolCosts: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const MyDocument = ({ formData, isSpouseIncluded,  checkedItems }) => (
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = <MyDocument formData={formData} checkedItems={checkedItems} isSpouseIncluded={isSpouseIncluded} />;
    const asPdf = pdf(doc);
    
    // Convert to Blob
    const blob = await asPdf.toBlob();

    // Prepare the email data
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = reader.result;

      // Prepare the email data
      const emailData = {
        api_key: import.meta.env.VITE_SMTP2GO_API_KEY,
        to: ["ali@novatax.ca"], // Replace with your recipient email
        sender: "support@novatax.ca", // Replace with your sender email
        subject: `New Tax Checklist Submission -${formData.firstName} ${formData.lastName}`,
        text_body: "Please find the attached Tax Checklist.",
        html_body: "<h2>New Tax Checklist Submission</h2><p>Please find the attached Tax Checklist.</p>",
        attachments: [
          {
            fileblob: base64data.split(',')[1], // Get the base64 string without the prefix
            filename: `TaxChecklist-${formData.firstName} ${formData.lastName}.pdf`, // Use the full name for the filename
          },
        ],
      };

      try {
        const response = await fetch('https://api.smtp2go.com/v3/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Email sent successfully!', data);
        alert('Email sent successfully! We will get back to you shortly. Please download the checklist for your records.');
        // Optionally reset the form or show a success message
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending email! Please try again later. If the issue persists, please contact us at ali@novatax.ca');
        // Handle error (e.g., show an error message)
      }
    };
  };

  return (
    <div className="form-container">
      <h1>2024 Tax Checklist</h1>
      <form onSubmit={handleSubmit} className="tax-checklist-form">
        <div className="checklist-container">
          <div className="existing-checklist">
            <div className="form-group">
              <label>Your First Name:</label>
              <TextField
                type="text"
                name="firstName"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Your Last Name:</label>
              <TextField
                type="text"
                name="lastName"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Date of Birth (YYYY-MM-DD):</label>
              <TextField
                type="date"
                name="dob"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Your Email:</label>
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Your Phone:</label>
              <TextField
                type="tel"
                name="phone"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Your SIN:</label>
              <TextField
                type="text"
                name="sin"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 9 }}
              />
            </div>
            <div className="form-group">
              <label>Address Line 1:</label>
              <TextField
                type="text"
                name="address1"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <TextField
                type="text"
                name="address2"
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <TextField
                type="text"
                name="city"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Province:</label>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="province-label">Select a province</InputLabel>
                <Select
                  labelId="province-label"
                  name="province"
                  onChange={handleChange}
                  required
                  defaultValue=""
                  label="Province"
                >
                  <MenuItem value=""><em>Select a province</em></MenuItem>
                  <MenuItem value="AB">Alberta</MenuItem>
                  <MenuItem value="BC">British Columbia</MenuItem>
                  <MenuItem value="MB">Manitoba</MenuItem>
                  <MenuItem value="NB">New Brunswick</MenuItem>
                  <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
                  <MenuItem value="NS">Nova Scotia</MenuItem>
                  <MenuItem value="NT">Northwest Territories</MenuItem>
                  <MenuItem value="NU">Nunavut</MenuItem>
                  <MenuItem value="ON">Ontario</MenuItem>
                  <MenuItem value="PE">Prince Edward Island</MenuItem>
                  <MenuItem value="QC">Quebec</MenuItem>
                  <MenuItem value="SK">Saskatchewan</MenuItem>
                  <MenuItem value="YT">Yukon</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <label>Postal Code:</label>
              <TextField
                type="text"
                name="postalCode"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group">
              <label>Marital Status:</label>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="marital-status-label">Marital Status</InputLabel>
                <Select
                  labelId="marital-status-label"
                  name="maritalStatus"
                  onChange={handleChange}
                  defaultValue=""
                  label="Marital Status"
                >
                  <MenuItem value=""><em>Select your marital status</em></MenuItem>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Common-law">Common-law</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Separated">Separated</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="marital-status-change-label">Did your marital status change in 2024?</InputLabel>
                <Select
                  labelId="marital-status-change-label"
                  name="maritalStatusChange"
                  onChange={handleChange}
                  defaultValue=""
                  label="Did your marital status change in 2024?"
                >
                  <MenuItem value=""><em>Select</em></MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {formData.maritalStatusChange === 'Yes' && (
            <div className="form-group">
              <label>Date of Marital Status Change:</label>
              <TextField
                type="date"
                name="maritalStatusChangeDate"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    min: "2024-01-01",
                    max: "2024-12-31",
                  },
                }}
              />
            </div>
            )}
            {(formData.maritalStatus === 'Married' || formData.maritalStatus === 'Common-law') && (
              <div className="form-group">
                <label>Will we be preparing spouse's return as well?</label>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', marginTop: '8px' }}>
                  <label style={{ marginRight: '16px' }}>
                    <input
                      type="radio"
                      name="spouseReturn"
                      value="Yes"
                      checked={isSpouseIncluded}
                      onChange={() => setIsSpouseIncluded(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="spouseReturn"
                      value="No"
                      checked={!isSpouseIncluded}
                      onChange={() => setIsSpouseIncluded(false)}
                    />
                    No
                  </label>
                </div>
              </div>
            )}
            {isSpouseIncluded && (
              <>
              <div className="form-group">
                  <label>Spouse's First Name:</label>
                  <TextField
                    type="text"
                    name="spouseFirstName"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <label>Spouse's Last Name:</label>
                  <TextField
                    type="text"
                    name="spouseLastName"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                
                <div className="form-group">
                  <label>Spouse's DOB (YYYY-MM-DD):</label>
                  <TextField
                    type="date"
                    name="spouseDob"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <label>Spouse's Email:</label>
                  <TextField
                    type="email"
                    name="spouseEmail"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <label>Spouse's Phone:</label>
                  <TextField
                    type="tel"
                    name="spousePhone"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <label>Spouse's SIN:</label>
                  <TextField
                    type="text"
                    name="spouseSin"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 9 }}
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="dependants-label">Did you have any dependants in 2024?</InputLabel>
                <Select
                  labelId="dependants-label"
                  name="dependants"
                  onChange={handleChange}
                  defaultValue=""
                  label="Did you have any dependants in 2024?"
                >
                  <MenuItem value=""><em>Select</em></MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {formData.dependants === 'Yes' && (
                <>
                <div className="form-group">
                  <label>If yes, please include the each dependant’s relevant information: (Name, Date of Birth (YYYY-MM-DD), SIN, Relationship to you)</label>
                  <TextField
                    name="dependantInfo"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Additional Notes:</label>
              <TextField
                name="notes"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </div>

            <table className="questions-table">
              <tbody>
                <tr>
                  <td><b>Please select a response to the following questions:</b></td>
                  <td>Yourself</td>
                  {isSpouseIncluded && <td>Spouse</td>}
                </tr>
                <tr>
                  <td>Are you a Canadian citizen?</td>
                  <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="citizenship"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  {isSpouseIncluded && (
                   <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseCitizenship"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>If yes, Do you authorize CRA to provide your name, address, date of birth, and citizenship information to Elections Canada?</td>
                  <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="citizenshipElections"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                       <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseCitizenshipElections"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Do you have citizenship or residence in a country other than Canada (or a US Green Card)?</td>
                  <td>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="citizenshipCountry"
                      onChange={handleChange}
                      defaultValue=""
                      row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseCitizenshipCountry"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>If yes, please indicate the country:</td>
                  <td>
                  <CountrySelect
                      name="citizenshipCountryName"
                      onChange={handleChange}
                    />
                  </td>
                  {isSpouseIncluded && (
                    <td>
                       <CountrySelect
                        name="spouseCitizenshipCountryName"
                        onChange={handleChange}
                      />
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Did you sell/trade any Cryptocurrency in 2024?</td>
                  <td>
                  <FormControl component="fieldset">
                        <RadioGroup
                      name="cryptocurrency"
                      onChange={handleChange}
                      defaultValue=""
                      row
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseCryptocurrency"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Did you dispose of a property (or properties) in 2024 for which you are claiming a principal residence exemption?</td>
                  <td>
                  <FormControl component="fieldset">
                        <RadioGroup
                          name="propertyExemption"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spousePropertyExemption"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>In 2024, in total did you own non-Canadian property (cash, shares, loans, trusts, real property held personally or through a Canadian securities dealer or Canadian trust company) with an aggregate cost in excess of CAD$100,000?</td>
                  <td>
                  <FormControl component="fieldset">
                        <RadioGroup
                          name="nonCanadianProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseNonCanadianProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>In 2024, did you have an ownership of 1% or greater in any non-Canadian corporations?</td>
                  <td>
                    <FormControl component="fieldset">
                        <RadioGroup
                          name="ownershipNonCanadian"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                     <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseOwnershipNonCanadian"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
            </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Did you (or your spouse) open a First Home Savings Account (“FHSA) in 2024?</td>
                  <td>
                    <FormControl component="fieldset">
                        <RadioGroup
                          name="fhsa"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                       <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseFhsa"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>In 2024, did you rent a property (which you resided in) in BC under a tenancy agreement, licence, sublease agreement?</td>
                  <td>
                    <FormControl component="fieldset">
                        <RadioGroup
                          name="rentalProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                     <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseRentalProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Do you have a bare trust or another trust arrangement?</td>
                  <td>
                    <FormControl component="fieldset">
                          <RadioGroup
                              name="trustArrangement"
                             onChange={handleChange}
                            defaultValue=""
                              row
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseTrustArrangement"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Are you claiming the disability tax credit for any family member?</td>
                  <td>
                  <FormControl component="fieldset">
                        <RadioGroup
                          name="disabilityCredit"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                  </td>
                  {isSpouseIncluded && (
                    <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="spouseDisabilityCredit"
                          onChange={handleChange}
                          defaultValue=""
                          row
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
           </div>   
           <div className="new-checklist">
            <h2>Income Documents (Tax Slips) 📝</h2>
            <p>📌 Check the boxes that apply to your situation and upload the relevant tax slips.</p>

            <h3>✅ Employment & Pension Income</h3>
            <div className="checkbox-group">
              <label>
                <input   className="checkbox-input"
                  type="checkbox"
                  name="employmentIncome"
                  checked={checkedItems.employmentIncome}
                  onChange={handleCheckboxChange}
                />
                T4 - Employment Income
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input   className="checkbox-input"
                  type="checkbox"
                  name="T4PS"
                  checked={checkedItems.T4PS}
                  onChange={handleCheckboxChange}
                />
                T4PS - Employee Profit-Sharing Plan
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input   className="checkbox-input"
                  type="checkbox"
                  name="T4AOAS"
                  checked={checkedItems.T4AOAS}
                  onChange={handleCheckboxChange}
              />
              T4A(OAS) - Old Age Security
            </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input   className="checkbox-input"
                  type="checkbox"
                name="T4AP"
                checked={checkedItems.T4AP}
                onChange={handleCheckboxChange}
              />
              T4A(P) - Canada Pension Plan (CPP) Benefits
            </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input   className="checkbox-input"
                  type="checkbox"
                name="T4A"
                checked={checkedItems.T4A}
                onChange={handleCheckboxChange}
              />
              T4A, T4RSP, T4RIF - Retirement or Other Pension Income
            </label>
            </div>
            <h3>✅ Government Benefits & Assistance</h3>
            <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="T4E"
                checked={checkedItems.T4E}
                onChange={handleCheckboxChange}
              />
              T4E - Employment Insurance (EI) Benefits
            </label>
            </div>
            <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="rc62"
                checked={checkedItems.rc62}
                onChange={handleCheckboxChange}
              />
              RC62 - Universal Child Care Benefits
            </label>
            </div>
            <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t5007"
                checked={checkedItems.t5007}
                onChange={handleCheckboxChange}
              />
              T5007 - Workers' Compensation or Social Assistance
            </label>
            </div>
          <h3>✅ Investments & Dividends</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t5"
                checked={checkedItems.t5}
                onChange={handleCheckboxChange}
              />
              T5 - Interest, Dividends, or Investment Income
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t3"
                checked={checkedItems.t3}
                onChange={handleCheckboxChange}
              />
              T3 - Mutual Funds & Trust Income
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t5013"
                checked={checkedItems.t5013}
                onChange={handleCheckboxChange}
              />
              T5013 - Partnership Income/Losses
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t5008"
                checked={checkedItems.t5008}
                onChange={handleCheckboxChange}
              />
              T5008 - Capital Gains/Losses from Investment Sales
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="annualInvestmentPackage"
                checked={checkedItems.t5008}
                onChange={handleCheckboxChange}
              />
                Annual Investment Package 
            </label>
          </div>
        <h3>✅ Property & Real Estate</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="realEstateSale"
                checked={checkedItems.realEstateSale}
                onChange={handleCheckboxChange}
              />
              Did you sell any real estate in 2024? (Provide purchase & sale details)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="realEstateChange"
                checked={checkedItems.realEstateChange}
                onChange={handleCheckboxChange}
              />
              Did you change the use of any real estate (personal-use to rental or vice versa) in 2024?
            </label>
          </div>
          <h3>✅ Self-Employed & Rental Income</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="selfEmployedIncome"
                checked={checkedItems.selfEmployedIncome}
                onChange={handleCheckboxChange}
              />
              Business, Professional, Commission, or Farming Income (Provide income & expense details)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="rentalIncome"
                checked={checkedItems.rentalIncome}
                onChange={handleCheckboxChange}
              />
              Rental Income (Provide income & expense details)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="businessRentalAssets"
                checked={checkedItems.businessRentalAssets}
                onChange={handleCheckboxChange}
              />
              If business or rental assets were purchased, attach supporting documents
            </label>
          </div>
          <h3>✅ Other Income</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="childSupport"
                checked={checkedItems.childSupport}
                onChange={handleCheckboxChange}
              />
              Child or Spousal Support Received (Provide separation/divorce agreement)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="stockOptions"
                checked={checkedItems.stockOptions}
                onChange={handleCheckboxChange}
              />
              Stock Options, Annuities, Scholarships, Bursaries, or Research Grants
            </label>
          </div>
        <hr/>
          <h2>Deductions & Credits (Save on Taxes!) 📝</h2>
          <p>📌 Check the boxes that apply to your situation and upload the supporting documents for these deductions in the Client Portal.</p>
          <h3>✅ Retirement & Savings</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="rrspContributions"
                checked={checkedItems.rrspContributions}
                onChange={handleCheckboxChange}
              />
              RRSP Contributions (Provide receipts)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="t4fhSA"
                checked={checkedItems.t4fhSA}
                onChange={handleCheckboxChange}
              />
              T4FHSA - First Home Savings Account (FHSA) Contributions
            </label>
          </div>

          <h3>✅ Employment & Business Expenses</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="unionDues"
                checked={checkedItems.unionDues}
                onChange={handleCheckboxChange}
              />
              Union or Professional Dues
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="movingExpenses"
                checked={checkedItems.movingExpenses}
                onChange={handleCheckboxChange}
              />
              Moving Expenses (If moved 40km closer to work)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="employmentCommissionExpenses"
                checked={checkedItems.employmentCommissionExpenses}
                onChange={handleCheckboxChange}
              />
              Employment or Commission Expenses (T2200 signed by employer is mandatory)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="investmentLosses"
                checked={checkedItems.investmentLosses}
                onChange={handleCheckboxChange}
              />
              Investment Losses & Carrying Charges (Interest, Investment Management Fees, Accounting Fees)
            </label>
          </div>

          <h3>✅ Family & Health-Related Deductions</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="childCareExpenses"
                checked={checkedItems.childCareExpenses}
                onChange={handleCheckboxChange}
              />
              Child Care Expenses
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="attendantCareExpenses"
                checked={checkedItems.attendantCareExpenses}
                onChange={handleCheckboxChange}
              />
              Attendant Care Expenses (for disabilities)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="medicalDentalExpenses"
                checked={checkedItems.medicalDentalExpenses}
                onChange={handleCheckboxChange}
              />
              Medical & Dental Expenses (Including private health insurance premiums)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="disabilityTaxCredit"
                checked={checkedItems.disabilityTaxCredit}
                onChange={handleCheckboxChange}
              />
              Disability Tax Credit (For you or a dependant)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="adoptionExpenses"
                checked={checkedItems.adoptionExpenses}
                onChange={handleCheckboxChange}
              />
              Adoption Expenses
            </label>
          </div>

          <h3>✅ Education & Housing Benefits</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="tuitionFees"
                checked={checkedItems.tuitionFees}
                onChange={handleCheckboxChange}
              />
              Tuition Fees (Provide T2202/T2202A)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="studentLoanInterest"
                checked={checkedItems.studentLoanInterest}
                onChange={handleCheckboxChange}
              />
              Student Loan Interest Paid
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="firstTimeHomeBuyer"
                checked={checkedItems.firstTimeHomeBuyer}
                onChange={handleCheckboxChange}
              />
              First-Time Home Buyer’s Tax Credit
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="clergyResidenceDeduction"
                checked={checkedItems.clergyResidenceDeduction}
                onChange={handleCheckboxChange}
              />
              Clergy Residence Deduction (Attach Form T1223)
            </label>
          </div>

          <h3>✅ Donations & Other Deductions</h3>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="charitableDonations"
                checked={checkedItems.charitableDonations}
                onChange={handleCheckboxChange}
              />
              Charitable & Political Donations
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="alimonySupportPaid"
                checked={checkedItems.alimonySupportPaid}
                onChange={handleCheckboxChange}
              />
              Alimony/Spousal Support Paid (Provide agreement)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="covidBenefitsRepayment"
                checked={checkedItems.covidBenefitsRepayment}
                onChange={handleCheckboxChange}
              />
              COVID-19 Benefits Repayment
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="multigenerationalHomeRenovation"
                checked={checkedItems.multigenerationalHomeRenovation}
                onChange={handleCheckboxChange}
              />
              Multigenerational Home Renovation Credit
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="toolCostsTradespersons"
                checked={checkedItems.toolCostsTradespersons}
                onChange={handleCheckboxChange}
              />
              Tool Costs for Tradespersons
            </label>
          </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>

      <PDFDownloadLink document={ <MyDocument formData={formData} isSpouseIncluded={isSpouseIncluded} checkedItems={checkedItems} />} fileName="tax_checklist.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
       
    </div>
  );
};

export default TaxChecklistForm;