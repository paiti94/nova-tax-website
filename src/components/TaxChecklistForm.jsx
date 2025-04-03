// src/components/TaxChecklistForm.jsx
import React, { useState } from 'react';
import '../styles/TaxChecklistForm.css'; // Import the CSS file
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputMask from 'react-input-mask';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon


const CustomAlert = ({ message, onClose, onDownload, onUpload }) => {
    return (
        <div className="custom-alert">
          <button onClick={onClose} className="close-button">
                <CloseIcon /> {/* Use the Close icon here */}
            </button> {/* X icon */}
            <p>{message}</p>
            <div className="button-container-submit">
               
                <button onClick={onUpload} className="upload-button">Upload to Client Portal</button>
            </div>
        </div>
    );
};
 const TaxChecklistForm =  () => {
  const [isSpouseIncluded, setIsSpouseIncluded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null); // State to hold the PDF blob
  const [loading, setLoading] = useState(false);
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
    Uscitizenship: '',
    cryptocurrency: '',
    propertyExemption: '',
    nonCanadianProperty: '',
    ownershipNonCanadian: '',
    fhsa: '',
    rentalProperty: '',
    spouseCitizenship: '',
    spouseCitizenshipElections: '',
    spouseUscitizenship: '',
    spouseUscitizenshipName: '',
    spouseCryptocurrency: '',
    spousePropertyExemption: '',
    spouseNonCanadianProperty: '',
    spouseOwnershipNonCanadian: '',
    spouseDisabilityCredit: '',
    spouseTrustArrangement: '',
    spouseRentalProperty: '',
    spouseFhsa: '',
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
    gstHstRegistrant: false,
    childSupport: false,
    stockOptions: false,
    rrspContributions: false,
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
    t4fhsa: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckedItems({ ...checkedItems, [name]: checked });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { generatePDF } = await import('./PDFGenerator');
      const blob = await generatePDF(formData, checkedItems, isSpouseIncluded);
        setPdfBlob(blob);
        if (blob) { // Use the blob variable directly
          const url = URL.createObjectURL(blob); // Create a Blob URL
          const link = document.createElement('a'); // Create an anchor element
          link.href = url; // Set the href to the Blob URL
          link.download = `TaxChecklist-${formData.firstName}.pdf`; // Set the download filename
          document.body.appendChild(link); // Append the link to the document

          link.click(); // Programmatically click the link to trigger the download

          document.body.removeChild(link); // Remove the link after download
          URL.revokeObjectURL(url); // Clean up the URL object
      } else {
          alert("No PDF available for download."); // Alert if no PDF blob is available
      }
        setShowAlert(true);   
    } catch (error) {
      console.error('Error generating or sending the PDF:', error);
      alert('Error sending email! Please try again later.');
    } finally {
      setLoading(false); // Stop loading after completion
    }
  };

// Handle PDF download
const handleDownloadPDF = async () => {
    if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TaxChecklist-${formData.firstName}.pdf`; 
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
        URL.revokeObjectURL(url); 
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    window.location.href = '/';
};

const openClientPortal = () =>{
    window.open('https://use.clienthub.app/#/login', '_blank');
}

  return (
    <div className="form-container">
      <h1>2024 Tax Checklist</h1>
      <form onSubmit={handleSubmit} className="tax-checklist-form"  
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); 
        }
      }}>
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
                name="dob"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                InputProps={{
                    inputComponent: InputMask,
                    inputProps: {
                      mask: "9999-99-99", // Enforces YYYY-MM-DD format
                      maskChar: "_", // Shows _ for missing values
                    },
                  }}
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
                inputProps={{
                    pattern: "\\d{4}-\\d{2}-\\d{2}", // Regex pattern for date format
                    min: "2024-01-01",
                    max: "2024-12-31",
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
                  <label>Spouse's Date of Birth (YYYY-MM-DD):</label>
                  <TextField
                    name="spouseDob"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        inputComponent: InputMask,
                        inputProps: {
                          mask: "9999-99-99", // Enforces YYYY-MM-DD format
                          maskChar: "_", // Shows _ for missing values
                        },
                      }}
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
                  <label>If yes, please include the each dependant's relevant information: (Name, Date of Birth (YYYY-MM-DD), SIN, Relationship to you)</label>
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
                          required
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
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>If yes, do you authorize CRA to provide your name, address, date of birth, and citizenship information to Elections Canada?</td>
                  <td>
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="citizenshipElections"
                          onChange={handleChange}
                          defaultValue=""
                          row
                          required
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
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Are you a US Citizen (or a US Green Card holder)?</td>
                  <td>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="Uscitizenship"
                      onChange={handleChange}
                      defaultValue=""
                      row
                      required
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
                          name="spouseUscitizenship"
                          onChange={handleChange}
                          defaultValue=""
                          row
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
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
                      required
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
                          required
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
                          required
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
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>In 2024, did you own non-Canadian property (cash, shares, loans, trusts, real property, cryptocurrency, etc.) with an aggregate cost in excess of $100,000?</td>
                  <td>
                  <FormControl component="fieldset">
                        <RadioGroup
                          name="nonCanadianProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                          required
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
                          required
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
                          required
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
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
            </FormControl>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Did you (or your spouse) open a First Home Savings Account ("FHSA) in 2024?</td>
                  <td>
                    <FormControl component="fieldset">
                        <RadioGroup
                          name="fhsa"
                          onChange={handleChange}
                          defaultValue=""
                          row
                          required
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
                          required
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                {formData.province === 'BC' && (
                <tr>
                  <td>In 2024, did you rent a property (which you resided in) in BC under a tenancy agreement, licence, sublease agreement?</td>
                  <td>
                    <FormControl component="fieldset">
                        <RadioGroup
                          name="rentalProperty"
                          onChange={handleChange}
                          defaultValue=""
                          row
                          required
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
                          required
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  )}
                </tr>
                )}
                <tr>
                  <td>Do you have a bare trust or another trust arrangement?</td>
                  <td>
                    <FormControl component="fieldset">
                          <RadioGroup
                              name="trustArrangement"
                             onChange={handleChange}
                            defaultValue=""
                              row
                              required
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
                          required
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
                          required
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
                          required
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
                checked={checkedItems.annualInvestmentPackage}
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
              Business, Professional, Commission, or Farming Income (📍Please download and fill out 2024 Business Schedule located in the Resources section of the Client Portal)
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
              Rental or AirBnB Income (📍Please download and fill out 2024 Rental Schedule located in the Resources section of the Client Portal)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="gstHstRegistrant"
                checked={checkedItems.gstHstRegistrant}
                onChange={handleCheckboxChange}
              />
              Are you registered for GST/HST for your business income? If so, please provide your GST/HST number on the 2024 Business Schedule.
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
                name="t4fhsa"
                checked={checkedItems.t4fhsa}
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
                name="employmentExpenses"
                checked={checkedItems.employmentExpenses}
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
                name="attendantCare"
                checked={checkedItems.attendantCare}
                onChange={handleCheckboxChange}
              />
              Attendant Care Expenses (for disabilities)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="medicalExpenses"
                checked={checkedItems.medicalExpenses}
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
              First-Time Home Buyer's Tax Credit
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="clergyDeduction"
                checked={checkedItems.clergyDeduction}
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
                name="alimony"
                checked={checkedItems.alimony}
                onChange={handleCheckboxChange}
              />
              Alimony/Spousal Support Paid (Provide agreement)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="covidRepayment"
                checked={checkedItems.covidRepayment}
                onChange={handleCheckboxChange}
              />
              COVID-19 Benefits Repayment
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input   className="checkbox-input"
                type="checkbox"
                name="homeRenovationCredit"
                checked={checkedItems.homeRenovationCredit}
                onChange={handleCheckboxChange}
              />
              Multigenerational Home Renovation Credit
            </label>
          </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Downloading..." : "Download"}
          </button>
      </div>
      </form>
      {/* Show loading spinner when submitting */}
      {loading && <div className="spinner"></div>}
      {showAlert && (
        <>
        <div className="overlay" onClick={handleCloseAlert}></div>
        <CustomAlert
            message="Please Upload the Checklist to your Client Shared Folder on the Client Portal."
            onClose={handleCloseAlert}
            onDownload={handleDownloadPDF}
            onUpload={openClientPortal}
        />
        </>
    )}
    </div>
  );
};

export default TaxChecklistForm;