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
  const lineHeight = 20;
  const paragraphGap = 5;

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

  const splitTextIntoLines = (text = '', maxWidth, fontRef, size) => {
    const safeText = text == null ? '' : String(text);
    if (safeText.length === 0) {
      return [''];
    }

    const words = safeText.split(/(\s+|,|\.)/);
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + word;
      const textWidth = fontRef.widthOfTextAtSize(testLine, size);

      if (textWidth < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine.trim());
        currentLine = word.trim();
      }
    }

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines.length ? lines : [''];
  };

  const ensurePageSpace = (requiredHeight = lineHeight) => {
    if (yPosition - requiredHeight < 50) {
      ({ page, width, height, yPosition } = createPage());
    }
  };

  const drawLines = (lines, x = 50, size = fontSize) => {
    lines.forEach((line) => {
      ensurePageSpace(lineHeight);
      page.drawText(line, {
        x,
        y: yPosition,
        size,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;
    });
    yPosition -= paragraphGap;
  };

  const drawText = (text, x = 50, bold = false, size = fontSize) => {
    const maxWidth = width - x - 50;
    const wrappedLines = splitTextIntoLines(text, maxWidth, font, size);
    drawLines(wrappedLines, x, size);
  };

  const drawChecklistItem = (label, instructions) => {
    const checkboxSize = 10;
    const labelLines = splitTextIntoLines(label, width - 80, font, fontSize);
    const instructionText = instructions ? `What to upload: ${instructions}` : '';
    const instructionLines = instructions
      ? splitTextIntoLines(instructionText, width - 80, font, fontSize)
      : [];
    const estimatedHeight = (labelLines.length + instructionLines.length || 1) * lineHeight + paragraphGap * 2;

    ensurePageSpace(Math.max(estimatedHeight, checkboxSize + 10));

    page.drawRectangle({
      x: 50,
      y: yPosition - checkboxSize + 4,
      width: checkboxSize,
      height: checkboxSize,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    drawLines(labelLines, 70);
    if (instructionLines.length) {
      drawLines(instructionLines, 70);
    }
  };
  


  const checklistGuides = {
    employmentIncome: {
      label: "T4 - Employment Income",
      instructions:
        "Upload each 2025 T4 slip issued by every employer, including part-time or terminated roles, and include final pay stubs if a slip is missing.",
    },
    T4PS: {
      label: "T4PS - Employee Profit-Sharing Plan",
      instructions:
        "Provide the CRA-issued T4PS showing profit-sharing allocations and any related employer statements.",
    },
    T4AOAS: {
      label: "T4A(OAS) - Old Age Security",
      instructions:
        "Attach the Service Canada T4A(OAS) slip and note any clawback repayments.",
    },
    T4AP: {
      label: "T4A(P) - Canada Pension Plan (CPP) Benefits",
      instructions:
        "Upload the T4A(P) plus Service Canada correspondence showing monthly CPP benefit changes.",
    },
    T4A: {
      label: "T4A/T4RSP/T4RIF - Retirement or Other Pension Income",
      instructions:
        "Provide every T4A, T4RSP, and T4RIF slip outlining pension, annuity, or withdrawal amounts and taxes withheld.",
    },
    T4E: {
      label: "T4E - Employment Insurance (EI) Benefits",
      instructions:
        "Upload the 2025 T4E statement, including any COVID-benefit repayments noted on the slip.",
    },
    rc62: {
      label: "RC62 - Universal Child Care Benefits",
      instructions:
        "Provide the RC62 statement for Universal Child Care Benefit payments received in 2025.",
    },
    t5007: {
      label: "T5007 - Workers' Compensation or Social Assistance",
      instructions:
        "Attach each T5007 showing workers' compensation or social assistance benefits received.",
    },
    t5: {
      label: "T5 - Interest, Dividends, or Investment Income",
      instructions:
        "Provide all T5 slips from banks and brokers (interest, dividends, foreign income) and note how to split joint slips.",
    },
    t3: {
      label: "T3 - Mutual Funds & Trust Income",
      instructions:
        "Upload every T3 slip and the mutual fund statements showing trust allocations for 2025.",
    },
    t5013: {
      label: "T5013 - Partnership Income/Losses",
      instructions:
        "Provide each T5013 and the partnership package showing adjusted cost base changes.",
    },
    t5008: {
      label: "T5008 - Capital Gains/Losses from Investment Sales",
      instructions:
        "Attach T5008 slips and a realized gains report showing adjusted cost base for every sale.",
    },
    annualInvestmentPackage: {
      label: "Annual Investment Package",
      instructions:
        "Upload your advisor or broker annual gain/loss report, December 31 statements, and any foreign asset summaries.",
    },
    realEstateSale: {
      label: "Real Estate Sale in 2025",
      instructions:
        "Provide purchase and sale agreements, statements of adjustments, and details on property use and key dates for each sale.",
    },
    realEstateChange: {
      label: "Change of Use of Real Estate",
      instructions:
        "Document the effective date, fair market value at that date, and any appraisals or elections related to the change of use.",
    },
    selfEmployedIncome: {
      label: "Business, Professional, Commission, or Farming Income",
      instructions:
        "Complete the 2025 Business Schedule from the client portal and attach your income/expense ledger plus receipts for major purchases.",
    },
    rentalIncome: {
      label: "Rental or AirBnB Income",
      instructions:
        "Complete the 2025 Rental Schedule and provide rent collected, expense receipts, mortgage, insurance, and property tax statements for each property.",
    },
    gstHstRegistrant: {
      label: "GST/HST Registrant",
      instructions:
        "Provide your GST/HST account number, filing frequency, and a summary of 2025 GST/HST collected and paid.",
    },
    childSupport: {
      label: "Child or Spousal Support Received",
      instructions:
        "Upload the separation or divorce agreement and a 2025 summary of support payments received, with payer details.",
    },
    stockOptions: {
      label: "Stock Options, Annuities, Scholarships, Bursaries, or Research Grants",
      instructions:
        "Provide employer or payer statements showing grant/exercise dates, fair market value at exercise, and any related T4/T4A slips.",
    },
    rrspContributions: {
      label: "RRSP Contributions",
      instructions:
        "Upload all official RRSP receipts for contributions made between March 2, 2025 and March 1, 2026, including any transfer confirmations.",
    },
    t4fhsa: {
      label: "T4FHSA - First Home Savings Account (FHSA) Contributions",
      instructions:
        "Attach T4FHSA slips plus December 31 statements for each FHSA that you or your spouse hold.",
    },
    unionDues: {
      label: "Union or Professional Dues",
      instructions:
        "Provide annual dues statements or receipts issued by the union or association for 2025.",
    },
    movingExpenses: {
      label: "Moving Expenses",
      instructions:
        "Provide a log of dates and addresses, proof the move was at least 40 km closer to work or school, and receipts for transportation, storage, and related costs.",
    },
    employmentExpenses: {
      label: "Employment or Commission Expenses",
      instructions:
        "Upload a signed 2025 T2200 or T2200S plus mileage logs, home office calculations, and receipts for deductible supplies.",
    },
    investmentLosses: {
      label: "Investment Losses & Carrying Charges",
      instructions:
        "Provide realized loss reports, interest statements, and invoices for investment counsel or accounting fees.",
    },
    childCareExpenses: {
      label: "Child Care Expenses",
      instructions:
        "Upload receipts that show the provider's name, SIN/BN, the child covered, and the total paid in 2025.",
    },
    attendantCare: {
      label: "Attendant Care Expenses",
      instructions:
        "Provide detailed invoices plus any required medical certification (T2201 or doctor letter) supporting the claim.",
    },
    medicalExpenses: {
      label: "Medical & Dental Expenses",
      instructions:
        "Summarize 2025 out-of-pocket medical receipts and include insurance statements showing reimbursements.",
    },
    disabilityTaxCredit: {
      label: "Disability Tax Credit",
      instructions:
        "Provide a copy of the approved T2201 (or status letter) and note any new impairments or caregiver changes.",
    },
    adoptionExpenses: {
      label: "Adoption Expenses",
      instructions:
        "Upload agency invoices, legal fee statements, and travel receipts tied to the adoption.",
    },
    tuitionFees: {
      label: "Tuition Fees",
      instructions:
        "Provide T2202 or TL11 slips along with the student's name, SIN, and months enrolled.",
    },
    studentLoanInterest: {
      label: "Student Loan Interest Paid",
      instructions:
        "Attach the annual interest statement from the lender for eligible government student loans.",
    },
    firstTimeHomeBuyer: {
      label: "First-Time Home Buyer's Tax Credit",
      instructions:
        "Provide the purchase agreement, closing statement, and confirmation that neither spouse owned a home in the prior four years.",
    },
    clergyDeduction: {
      label: "Clergy Residence Deduction (Attach Form T1223)",
      instructions:
        "Upload a completed and signed T1223 plus housing allowance or fair rental value support.",
    },
    charitableDonations: {
      label: "Charitable & Political Donations",
      instructions:
        "Provide official donation receipts issued in 2025 (include CRA registration numbers) and any political contribution slips.",
    },
    alimony: {
      label: "Alimony/Spousal Support Paid",
      instructions:
        "Upload the separation or divorce agreement plus proof of payments (bank statements or cheques) with recipient information.",
    },
    covidRepayment: {
      label: "COVID-19 Benefits Repayment",
      instructions:
        "Provide CRA statements showing which benefits were repaid in 2025 and payment confirmations.",
    },
    homeRenovationCredit: {
      label: "Multigenerational Home Renovation Credit",
      instructions:
        "Provide contracts, receipts, and proof of qualifying relatives residing in the renovated home.",
    },
    toolCosts: {
      label: "Tool Costs for Tradespersons",
      instructions:
        "Upload receipts for eligible tools purchased in 2025 and the signed employer certification (T2200/T2200S) confirming that the tools are required.",
    },
  };

  const drawChecklistGuideSection = () => {
    drawText('Checked Items & 2025 T1 Preparation Guide', 50, true, 16);
    drawText('Gather the slips or records below for every option you selected:');

    const selectedGuides = Object.entries(checkedItems || {}).filter(([, value]) => value === true);

    if (selectedGuides.length === 0) {
      drawText('* No checklist items were selected.');
    } else {
      selectedGuides.forEach(([key]) => {
        const guide = checklistGuides[key] || {
          label: key,
          instructions: 'Please provide supporting documents for this selection.',
        };
        drawChecklistItem(guide.label || key, guide.instructions);
      });
    }
    drawText('');
  };

  drawText('2025 T1 Nova Tax Checklist', 200, true, 18);
  drawText('====================================', 200, true, 10);
  drawText('');
  drawText('Personal Information', 50, true, 16);
  drawText(`First Name: ${formData.firstName}`, 50, true);
  drawText(`Last Name: ${formData.lastName}`);
  drawText(`DOB (YYYY-MM-DD): ${formData.dob}`);
  drawText(`Email: ${formData.email}`);
  drawText(`Phone: ${formData.phone}`);
  drawText('');
  drawChecklistGuideSection();


  // Personal Information
  // drawText('Personal Information', 50, true, 16);
  // drawText(`First Name: ${formData.firstName}`, 50, true);
  // drawText(`Last Name: ${formData.lastName}`);
  // drawText(`DOB (YYYY-MM-DD): ${formData.dob}`);
  // drawText(`SIN: ${formData.sin}`);
  // drawText(`Email: ${formData.email}`);
  // drawText(`Phone: ${formData.phone}`);
  // drawText(`Address Line 1: ${formData.address1}`);
  // drawText(`Address Line 2: ${formData.address2}`);
  // drawText(`City: ${formData.city}, Province: ${formData.province}, Postal Code: ${formData.postalCode}`);
  // drawText('');

  // // Marital Status
  // drawText('');
  // drawText('Marital Status', 50, true, 16);
  // drawText(`Marital Status: ${formData.maritalStatus}`, 50, true);
  // drawText(`Did your marital status change in 2025? ${formData.maritalStatusChange}`);
  // drawText(`Date of Marital Status Change: ${formData.maritalStatusChangeDate}`);
  // drawText(`Will we be preparing spouse's return as well? ${isSpouseIncluded ? 'Yes' : 'No'}`);
  // drawText('');

  // if (isSpouseIncluded) {
  //   drawText('');
  //   drawText(`Spouse's Information`, 50, true, 16);
  //   drawText(`Spouse's First Name: ${formData.spouseFirstName}`, 50, true);
  //   drawText(`Spouse's Last Name: ${formData.spouseLastName}`);
  //   drawText(`Spouse's DOB (YYYY-MM-DD): ${formData.spouseDob}`);
  //   drawText(`SIN: ${formData.spouseSin}`);
  //   drawText(`Email: ${formData.spouseEmail}`);
  //   drawText(`Phone: ${formData.spousePhone}`);
  //   drawText('');
  // }

  // Dependents Section
  // drawText('Dependants', 50, true, 16);
  // drawText(`Did you have any dependants in 2025? ${formData.dependants}`);
  // if (formData.dependants === 'Yes') {
  //   drawText(`Dependant's relevant information: ${formData.dependantInfo}`);
  // }
  // drawText('');

  // // Additional Information
  // drawText('Additional Information', 50, true, 16);
  // drawText(`Notes: ${formData.notes}`);
  // drawText(`Are you a Canadian citizen? ${formData.citizenship}`);
  // drawText(`Should CRA provide your information to Elections Canada? ${formData.citizenshipElections}`);
  // drawText(`Do you have US citizenship or US Green Card? ${formData.Uscitizenship}`);
  // drawText(`Did you sell or trade any Cryptocurrency in 2025? ${formData.cryptocurrency}`);
  // drawText(`In 2025, did you dispose of a property for the principal residence exemption? ${formData.propertyExemption}`);
  // drawText(`In 2025, did you own non-Canadian property with a total cost above $100,000? ${formData.nonCanadianProperty}`);
  // drawText(`In 2025, did you own 1% or more of any non-Canadian corporations? ${formData.ownershipNonCanadian}`);
  // drawText(`In 2025, did you or your spouse open an FHSA? ${formData.fhsa}`);
  // drawText(`In 2025, did you rent a property in BC? ${formData.rentalProperty}`);
  // drawText(`Do you have a trust arrangement? ${formData.trustArrangement}`);
  // drawText(`Are you claiming the disability tax credit? ${formData.disabilityCredit}`);
  // drawText('');

  // // Spouse's Additional Information
  // if (isSpouseIncluded) {
  //   drawText(`Spouse's Additional Information`, 50, true, 16);
  //   drawText(`Spouse's Canadian Citizen? ${formData.spouseCitizenship}`);
  //   drawText(`Spouse's Elections Canada Consent: ${formData.spouseCitizenshipElections}`);
  //   drawText(`Spouse has US citizenship or US Green Card? ${formData.spouseUscitizenship}`);
  //   drawText(`Spouse sold or traded Cryptocurrency in 2025? ${formData.spouseCryptocurrency}`);
  //   drawText(`Spouse disposed of a property for exemption in 2025? ${formData.spousePropertyExemption}`);
  //   drawText(`Spouse owned non-Canadian property in 2025? ${formData.spouseNonCanadianProperty}`);
  //   drawText(`Spouse owned 1% or more of non-Canadian corporations in 2025? ${formData.spouseOwnershipNonCanadian}`);
  //   drawText(`Spouse opened an FHSA in 2025? ${formData.spouseFhsa}`);
  //   drawText(`Spouse rented property in BC in 2025? ${formData.spouseRentalProperty}`);
  //   drawText(`Spouse has a trust arrangement? ${formData.spouseTrustArrangement}`);
  //   drawText(`Spouse claiming disability tax credit? ${formData.spouseDisabilityCredit}`);
  //   drawText('');
  // }
  drawText('Thank you for submitting your tax checklist!', 150);

  // Convert PDF to Blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};
