/**
 * Generates a tax checklist PDF using pdf-lib.
 * @param {Object} formData - User's input data
 * @param {Object} checkedItems - Selected checklist items
 * @param {boolean} isSpouseIncluded - Whether the spouse's information is included
 * @returns {Promise<Blob>} - The generated PDF as a Blob
 */
export const generatePDF = async (formData, checkedItems, isSpouseIncluded) => {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib'); // Lazy load
  
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  const createPage = () => {
    const newPage = pdfDoc.addPage([600, 800]); // A4 size
    return {
      page: newPage,
      width: newPage.getWidth(),
      height: newPage.getHeight(),
      yPosition: newPage.getHeight() - 50, // Start at top
    };
  };

  let { page, width, height, yPosition } = createPage();

//   const drawText = (text, x = 50, bold = false, size = fontSize) => {
//     if (yPosition < 50) {
//         ({ page, width, height, yPosition } = createPage());
//       }
//     page.drawText(text, {
//       x,
//       y: yPosition,
//       size,
//       font,
//       color: rgb(0, 0, 0),
//       maxWidth: width - x - 50,
//       wordBreaks: [" ", ","],
//     });
//     yPosition -= 20;
//   };

const drawText = (text, x = 50, bold = false, size = fontSize) => {
    const maxWidth = width - x - 50; // Ensure text fits within the page width
    const lineHeight = 20;
  
    // Function to split text into properly wrapped lines
    const splitTextIntoLines = (text, maxWidth, font, size) => {
      const words = text.split(/(\s+|,|\.)/); // Split by space, comma, or period while keeping them
      let lines = [];
      let currentLine = '';
  
      for (const word of words) {
        let testLine = currentLine + word;
        let textWidth = font.widthOfTextAtSize(testLine, size);
  
        if (textWidth < maxWidth) {
          currentLine = testLine; // Add word to current line
        } else {
          lines.push(currentLine.trim()); // Push the current line
          currentLine = word.trim(); // Start a new line
        }
      }
  
      if (currentLine) {
        lines.push(currentLine.trim());
      }
  
      return lines;
    };
  
    // Split the text into properly wrapped lines
    const wrappedLines = splitTextIntoLines(text, maxWidth, font, size);
  
    // Draw each line separately
    wrappedLines.forEach((line) => {
      if (yPosition < 50) {
        ({ page, width, height, yPosition } = createPage());
      }
  
      page.drawText(line, {
        x,
        y: yPosition,
        size,
        font,
        color: rgb(0, 0, 0),
      });
  
      yPosition -= lineHeight; // Move down for the next line
    });
    yPosition -= 5; 
  };
  


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
    businessRentalAssets: "Business Rental Assets (Provide income & expense details)",
    gstHstRegistrant: "GST/HST Registrant",
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
    firstTimeHomeBuyer: "First-Time Home Buyer's Tax Credit",
    clergyDeduction: "Clergy Residence Deduction (Attach Form T1223)",
    charitableDonations: "Charitable & Political Donations",
    alimony: "Alimony/Spousal Support Paid (Provide agreement)",
    covidRepayment: "COVID-19 Benefits Repayment",
    homeRenovationCredit: "Multigenerational Home Renovation Credit",
  };

  drawText('2024 Nova Tax Checklist', 200, true, 18);
  drawText('====================================', 200, true, 10);
  drawText('');


  // Personal Information
  drawText('Personal Information', 50, true, 16);
  drawText(`First Name: ${formData.firstName}`, 50, true);
  drawText(`Last Name: ${formData.lastName}`);
  drawText(`DOB (YYYY-MM-DD): ${formData.dob}`);
  drawText(`SIN: ${formData.sin}`);
  drawText(`Email: ${formData.email}`);
  drawText(`Phone: ${formData.phone}`);
  drawText(`Address Line 1: ${formData.address1}`);
  drawText(`Address Line 2: ${formData.address2}`);
  drawText(`City: ${formData.city}, Province: ${formData.province}, Postal Code: ${formData.postalCode}`);
  drawText('');

  // Marital Status
  drawText('');
  drawText('Marital Status', 50, true, 16);
  drawText(`Marital Status: ${formData.maritalStatus}`, 50, true);
  drawText(`Did your marital status change in 2024? ${formData.maritalStatusChange}`);
  drawText(`Date of Marital Status Change: ${formData.maritalStatusChangeDate}`);
  drawText(`Will we be preparing spouse's return as well? ${isSpouseIncluded ? 'Yes' : 'No'}`);
  drawText('');

  if (isSpouseIncluded) {
    drawText('');
    drawText(`Spouse's Information`, 50, true, 16);
    drawText(`Spouse's First Name: ${formData.spouseFirstName}`, 50, true);
    drawText(`Spouse's Last Name: ${formData.spouseLastName}`);
    drawText(`Spouse's DOB (YYYY-MM-DD): ${formData.spouseDob}`);
    drawText(`SIN: ${formData.spouseSin}`);
    drawText(`Email: ${formData.spouseEmail}`);
    drawText(`Phone: ${formData.spousePhone}`);
    drawText('');
  }

  // Dependents Section
  drawText('Dependants', 50, true, 16);
  drawText(`Did you have any dependants in 2024? ${formData.dependants}`);
  if (formData.dependants === 'Yes') {
    drawText(`Dependant's relevant information: ${formData.dependantInfo}`);
  }
  drawText('');

  // Additional Information
  drawText('Additional Information', 50, true, 16);
  drawText(`Notes: ${formData.notes}`);
  drawText(`Are you a Canadian citizen? ${formData.citizenship}`);
  drawText(`Should CRA provide your information to Elections Canada? ${formData.citizenshipElections}`);
  drawText(`Do you have US citizenship or US Green Card? ${formData.Uscitizenship}`);
  drawText(`Did you sell any Cryptocurrency in 2024? ${formData.cryptocurrency}`);
  drawText(`Did you dispose of a property for principal residence exemption? ${formData.propertyExemption}`);
  drawText(`Did you own non-Canadian property? ${formData.nonCanadianProperty}`);
  drawText(`Did you own 1%+ of any non-Canadian corporations? ${formData.ownershipNonCanadian}`);
  drawText(`Did you or your spouse open an FHSA in 2024? ${formData.fhsa}`);
  drawText(`Did you rent a property in BC? ${formData.rentalProperty}`);
  drawText(`Do you have a trust arrangement? ${formData.trustArrangement}`);
  drawText(`Are you claiming the disability tax credit? ${formData.disabilityCredit}`);
  drawText('');

  // Spouse's Additional Information
  if (isSpouseIncluded) {
    drawText(`Spouse's Additional Information`, 50, true, 16);
    drawText(`Spouse's Canadian Citizen? ${formData.spouseCitizenship}`);
    drawText(`Spouse's Elections Canada Consent: ${formData.spouseCitizenshipElections}`);
    drawText(`Spouse has US citizenship or US Green Card? ${formData.spouseUscitizenship}`);
    drawText(`Spouse sold Cryptocurrency in 2024? ${formData.spouseCryptocurrency}`);
    drawText(`Spouse disposed of a property for exemption? ${formData.spousePropertyExemption}`);
    drawText(`Spouse owned non-Canadian property? ${formData.spouseNonCanadianProperty}`);
    drawText(`Spouse owned 1%+ of non-Canadian corporations? ${formData.spouseOwnershipNonCanadian}`);
    drawText(`Spouse opened an FHSA in 2024? ${formData.spouseFhsa}`);
    drawText(`Spouse rented property in BC? ${formData.spouseRentalProperty}`);
    drawText(`Spouse has a trust arrangement? ${formData.spouseTrustArrangement}`);
    drawText(`Spouse claiming disability tax credit? ${formData.spouseDisabilityCredit}`);
    drawText('');
  }
  
    drawText('Checked Items', 50, true, 16);

     Object.entries(checkedItems).forEach(([key, value]) => {
        if (value==true) {
            const label = itemLabels[key] || key;
            drawText(`- ${label}`);
        }
    });

  drawText('');
  drawText('Thank you for submitting your tax checklist!', 150);

  // Convert PDF to Blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};