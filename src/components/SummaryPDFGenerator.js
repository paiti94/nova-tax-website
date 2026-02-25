/**
 * SummaryPDFGenerator.js
 * Creates a clean staff-friendly Intake Summary PDF using pdf-lib.
 */

const ITEM_GROUPS = [
  {
    title: "Income Documents (Slips & Statements)",
    keys: [
      "employmentIncome",
      "T4PS",
      "T4AOAS",
      "T4AP",
      "T4A",
      "T4E",
      "rc62",
      "t5007",
      "t5",
      "t3",
      "t5013",
      "t5008",
      "annualInvestmentPackage",
      "realEstateSale",
      "realEstateChange",
      "selfEmployedIncome",
      "rentalIncome",
      "gstHstRegistrant",
      "childSupport",
      "stockOptions",
    ],
  },
  {
    title: "Deductions & Credits (Receipts / Forms)",
    keys: [
      "rrspContributions",
      "t4fhsa",
      "unionDues",
      "movingExpenses",
      "employmentExpenses",
      "investmentLosses",
      "childCareExpenses",
      "attendantCare",
      "medicalExpenses",
      "disabilityTaxCredit",
      "adoptionExpenses",
      "tuitionFees",
      "studentLoanInterest",
      "firstTimeHomeBuyer",
      "clergyDeduction",
      "charitableDonations",
      "alimony",
      "covidRepayment",
      "homeRenovationCredit",
    ],
  },
];

const ITEM_LABELS = {
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
  realEstateSale: "Sold real estate in 2025 (Provide purchase & sale details)",
  realEstateChange: "Changed use of real estate (personal ↔ rental) in 2025",
  selfEmployedIncome: "Business / Professional / Commission / Farming Income",
  rentalIncome: "Rental / AirBnB Income",
  gstHstRegistrant: "GST/HST Registrant",
  childSupport: "Child or Spousal Support Received",
  stockOptions: "Stock Options / Scholarships / Bursaries / Research Grants",

  rrspContributions: "RRSP Contributions",
  t4fhsa: "T4FHSA - FHSA Contributions",
  unionDues: "Union or Professional Dues",
  movingExpenses: "Moving Expenses",
  employmentExpenses: "Employment / Commission Expenses (T2200 required)",
  investmentLosses: "Investment Losses & Carrying Charges",
  childCareExpenses: "Child Care Expenses",
  attendantCare: "Attendant Care Expenses",
  medicalExpenses: "Medical & Dental Expenses",
  disabilityTaxCredit: "Disability Tax Credit",
  adoptionExpenses: "Adoption Expenses",
  tuitionFees: "Tuition Fees (T2202/T2202A)",
  studentLoanInterest: "Student Loan Interest Paid",
  firstTimeHomeBuyer: "First-Time Home Buyer’s Tax Credit",
  clergyDeduction: "Clergy Residence Deduction (T1223)",
  charitableDonations: "Charitable & Political Donations",
  alimony: "Alimony / Spousal Support Paid",
  covidRepayment: "COVID-19 Benefits Repayment",
  homeRenovationCredit: "Multigenerational Home Renovation Credit",
};

const safe = (v) => (v == null ? "" : String(v));
const maskSin = (sin) => {
  const s = safe(sin).replace(/\D/g, "");
  if (!s) return "";
  if (s.length <= 4) return s;
  return `${"*".repeat(Math.max(0, s.length - 4))}${s.slice(-4)}`;
};

export async function generateIntakeSummaryPDF({
  formData,
  checkedItems,
  isSpouseIncluded,
  taxYear = "2025",
}) {
  const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const PAGE_W = 612; // US Letter width
  const PAGE_H = 792; // US Letter height
  const M = 48;
  const LINE = 16;

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - M;

  const newPage = () => {
    page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    y = PAGE_H - M;
  };

  const wrapLines = (text, maxWidth, font, size) => {
    const words = safe(text).split(/\s+/);
    const lines = [];
    let cur = "";

    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  };

  const drawText = (text, { x = M, size = 11, bold = false, maxWidth } = {}) => {
    const font = bold ? fontBold : fontRegular;
    const width = maxWidth ?? (PAGE_W - x - M);
    const lines = wrapLines(text, width, font, size);

    for (const line of lines) {
      if (y < M + LINE * 2) newPage();
      page.drawText(line, { x, y, size, font, color: rgb(0, 0, 0) });
      y -= LINE;
    }
  };

  const drawHr = () => {
    if (y < M + 20) newPage();
    page.drawLine({
      start: { x: M, y: y },
      end: { x: PAGE_W - M, y: y },
      thickness: 1,
      color: rgb(0.75, 0.75, 0.75),
    });
    y -= 14;
  };

  const sectionTitle = (title) => {
    y -= 4;
    drawText(title, { bold: true, size: 13 });
    drawHr();
  };

  const kvRow = (label, value) => {
    const labelX = M;
    const valueX = 220; // align values in a neat column
    const labelW = valueX - M - 10;
    const valueW = PAGE_W - M - valueX;

    const labelLines = wrapLines(label, labelW, fontBold, 11);
    const valueLines = wrapLines(value, valueW, fontRegular, 11);
    const rows = Math.max(labelLines.length, valueLines.length);

    for (let i = 0; i < rows; i++) {
      if (y < M + LINE * 2) newPage();
      page.drawText(labelLines[i] ?? "", {
        x: labelX,
        y,
        size: 11,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      page.drawText(valueLines[i] ?? "", {
        x: valueX,
        y,
        size: 11,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
      y -= LINE;
    }
  };

  const bullet = (text) => {
    drawText(`• ${text}`, { x: M + 10, size: 11 });
  };

  // ===== Header =====
  drawText(`${taxYear} T1 Intake Summary (Nova Tax)`, { bold: true, size: 16 });
  drawText(`Generated: ${new Date().toLocaleString()}`, { size: 10 });
  y -= 6;
  drawHr();

  // ===== Client =====
  sectionTitle("Client");
  kvRow("Name", `${safe(formData.firstName)} ${safe(formData.lastName)}`.trim());
  kvRow("Date of Birth", safe(formData.dob));
  kvRow("SIN", maskSin(formData.sin)); // masked for staff doc
  kvRow("Email", safe(formData.email));
  kvRow("Phone", safe(formData.phone));
  kvRow(
    "Address",
    [
      safe(formData.address1),
      safe(formData.address2),
      `${safe(formData.city)} ${safe(formData.province)} ${safe(formData.postalCode)}`.trim(),
    ]
      .filter(Boolean)
      .join(", ")
  );

  // ===== Household / Spouse =====
  sectionTitle("Household");
  kvRow("Marital Status", safe(formData.maritalStatus));
  kvRow("Status changed in 2025", safe(formData.maritalStatusChange));
  kvRow("Change date", safe(formData.maritalStatusChangeDate));
  kvRow("Spouse return included", isSpouseIncluded ? "Yes" : "No");

  if (isSpouseIncluded) {
    sectionTitle("Spouse");
    kvRow("Name", `${safe(formData.spouseFirstName)} ${safe(formData.spouseLastName)}`.trim());
    kvRow("Date of Birth", safe(formData.spouseDob));
    kvRow("SIN", maskSin(formData.spouseSin)); // masked
    kvRow("Email", safe(formData.spouseEmail));
    kvRow("Phone", safe(formData.spousePhone));
  }

  // ===== Dependants =====
  sectionTitle("Dependants");
  kvRow("Any dependants in 2025?", safe(formData.dependants));
  if (safe(formData.dependants).toLowerCase() === "yes") {
    kvRow("Details", safe(formData.dependantInfo));
  }

  // ===== Selected Items =====
  sectionTitle("Selected Checklist Items");
  for (const group of ITEM_GROUPS) {
    drawText(group.title, { bold: true, size: 12 });
    const selected = group.keys
      .filter((k) => checkedItems?.[k] === true)
      .map((k) => ITEM_LABELS[k] || k);

    if (!selected.length) {
      bullet("(none selected)");
    } else {
      selected.forEach(bullet);
    }
    y -= 4;
  }

  // ===== Notes =====
  sectionTitle("Notes / Extra Info");
  const notes = safe(formData.notes).trim();
  drawText(notes ? notes : "(none)");

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}