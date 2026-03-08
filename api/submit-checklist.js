export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  try {
    const tenantId = process.env.M365_TENANT_ID;
    const clientId = process.env.M365_CLIENT_ID;
    const clientSecret = process.env.M365_CLIENT_SECRET;
    const siteId = process.env.SP_SITE_ID;
    const listId = process.env.SP_LIST_ID;

    if (!tenantId || !clientId || !clientSecret || !siteId || !listId) {
      return res.status(500).send("Server not configured");
    }

    const payload = req.body;

    // ---- Basic validation ----
    const firstName = payload?.client?.firstName?.trim();
    const lastName = payload?.client?.lastName?.trim();
    const email = payload?.client?.email?.trim()?.toLowerCase();
    const taxYear = String(payload?.meta?.taxYear || "").trim();
    const taxTemplate = payload?.client?.taxTemplate || false;

    if (!firstName || !lastName || !email || !taxYear) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Optional fields
    const summaryText = typeof payload?.summaryText === "string" ? payload.summaryText : "";
    // Expect base64 PDF in one of these keys:
    // - payload.summaryPdfBase64: "JVBERi0xLjcKJ..." (raw base64)
    // - payload.summaryPdfDataUrl: "data:application/pdf;base64,JVBERi0xLjcKJ..."
    const summaryPdfBase64 =
      (typeof payload?.summaryPdfBase64 === "string" && payload.summaryPdfBase64) ||
      (typeof payload?.summaryPdfDataUrl === "string" && payload.summaryPdfDataUrl) ||
      "";

    const folderName = makeFolderName({ firstName, lastName });
    const clientKey = makeClientKey({ firstName, lastName, email });
    const intakeKey = `${clientKey}-${taxYear}`;
    const paymentReference = `${email.trim().toLowerCase()}-${taxYear}`;
    // ---- Get app-only token ----
    const accessToken = await getAppToken({ tenantId, clientId, clientSecret });

    // ---- 1) Create SharePoint list item ----
    const title = `${lastName}, ${firstName} - ${taxYear}`;

    const existingItem = await findListItemByIntakeKey({
      accessToken,
      siteId,
      listId,
      intakeKey,
    });

    if (existingItem) {
      return res.status(409).json({
        error: "Checklist already submitted",
        message:
          "You have already submitted your checklist. Please contact 'admin@novatax.ca' if you need to make changes.",
      });
    }

    const createItemRes = await graphFetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Title: title,
            TaxYear: taxYear,
            ClientEmail: email,
            ClientFirstName: firstName,
            ClientLastName: lastName,
            ClientKey: clientKey,
            folderName: folderName,
            IntakeKey: intakeKey,
            PaymentReference: paymentReference,
            PayloadJson: JSON.stringify(payload),
            SummaryText: summaryText, 
            Status: "Pending",
            TaxTemplate: taxTemplate
          },
        }),
      }
    );

    const itemJson = await createItemRes.json();

    if (!createItemRes.ok) {
      return res.status(500).json({
        error: "Create item failed",
        details: itemJson,
      });
    }

    let uploadedSummaryPdf = null;

    if (summaryPdfBase64) {
      const driveRes = await graphFetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drive`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const driveJson = await driveRes.json();
      if (!driveRes.ok || !driveJson?.id) {
        console.error("Could not resolve site drive:", driveJson);
      } else {
        const driveId = driveJson.id;
        const folderPath = `Clients_internal/${taxYear}/${clientKey}/02_Working_Internal`;
        await ensureFolderPath({ accessToken, driveId, folderPath });

        const pdfBuffer = decodePdfBase64(summaryPdfBase64);
        const safeName = sanitizeFileName(`T1 Intake Summary - ${lastName}, ${firstName} - ${taxYear}.pdf`);

        const uploadUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${encodePath(
          folderPath
        )}/${encodeURIComponent(safeName)}:/content`;

        const uploadRes = await graphFetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/pdf",
          },
          body: pdfBuffer,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          console.error("Upload summary PDF failed:", uploadJson);
        } else {
          uploadedSummaryPdf = {
            id: uploadJson?.id,
            name: uploadJson?.name,
            webUrl: uploadJson?.webUrl,
            folderPath,
          };
        }
      }
    }

    return res.status(200).json({
      ok: true,
      listItemId: itemJson?.id,
      clientKey,
      uploadedSummaryPdf,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal error" });
  }
}

/* ---------------- helpers ---------------- */

async function getAppToken({ tenantId, clientId, clientSecret }) {
  const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok || !tokenJson?.access_token) {
    throw new Error(`Token error: ${JSON.stringify(tokenJson)}`);
  }
  return tokenJson.access_token;
}

async function graphFetch(url, options) {
  return fetch(url, options);
}

// Matches your observed format: Jinny_Bouhamya__paiti94_at_gmail_com
// function makeClientKey({ firstName, lastName, email }) {
//   const safeFirst = (firstName || "").trim().replace(/\s+/g, "_");
//   const safeLast = (lastName || "").trim().replace(/\s+/g, "_");

//   const safeEmail = (email || "")
//     .trim()
//     .toLowerCase()
//     .replace(/@/g, "_at_")
//     .replace(/\./g, "_")
//     .replace(/\s+/g, "_");

//   // return `${safeFirst}_${safeLast}__${safeEmail}`;
//   return `${safeFirst}_${safeLast}_${safeEmail}`;
// }
function makeClientKey({ firstName, lastName, email }) {
  const folderName = makeFolderName({ firstName, lastName });
  const safeEmail = sanitizeEmailForKey(email);
  return `${folderName}_${safeEmail}`;
}

function makeFolderName({ firstName, lastName }) {
  return `${sanitizeName(firstName)}_${sanitizeName(lastName)}`;
}
function sanitizeEmailForKey(email) {
  return (email || "")
    .trim()
    .toLowerCase()
    .replace(/@/g, "_at_")
    .replace(/\./g, "_")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "");
}
function sanitizeName(value) {
  return (value || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "");
}

// Accepts either raw base64 OR a data URL
function decodePdfBase64(input) {
  const raw = input.startsWith("data:") ? input.split("base64,")[1] : input;
  return Buffer.from(raw, "base64");
}

function sanitizeFileName(name) {
  // remove characters SharePoint hates
  return name.replace(/[~"#%&*:<>?/\\{|}]+/g, "-").replace(/\s+/g, " ").trim();
}

function escapeODataString(value) {
  return String(value).replace(/'/g, "''");
}

// Graph path encoding: keep slashes but encode segments properly
function encodePath(path) {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

async function findListItemByIntakeKey({ accessToken, siteId, listId, intakeKey }) {
  const filter = encodeURIComponent(`fields/IntakeKey eq '${escapeODataString(intakeKey)}'`);
  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?$expand=fields&$filter=${filter}`;

  const res = await graphFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Find IntakeKey failed: ${JSON.stringify(json)}`);
  }

  return json?.value?.[0] || null;
}

async function createListItem({ accessToken, siteId, listId, fields }) {
  const res = await graphFetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Create item failed: ${JSON.stringify(json)}`);
  }

  return json;
}

async function updateListItemFields({ accessToken, siteId, listId, itemId, fields }) {
  const res = await graphFetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}/fields`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }
  );

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(`Update item failed: ${JSON.stringify(json)}`);
  }
}
/**
 * Ensures folder path exists in the drive by creating missing folders.
 * Uses GET to check each level, and POST to create when missing.
 */
async function ensureFolderPath({ accessToken, driveId, folderPath }) {
  const parts = folderPath.split("/").filter(Boolean);
  let currentPath = "";

  for (const part of parts) {
    currentPath = currentPath ? `${currentPath}/${part}` : part;

    // 1) Check if folder exists
    const getUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${encodePath(
      currentPath
    )}`;

    const getRes = await graphFetch(getUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (getRes.ok) continue;

    // 2) Create it under parent
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    const parentUrl = parentPath
      ? `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${encodePath(parentPath)}:/children`
      : `https://graph.microsoft.com/v1.0/drives/${driveId}/root/children`;

    const createRes = await graphFetch(parentUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: part,
        folder: {},
        "@microsoft.graph.conflictBehavior": "fail",
      }),
    });

    if (!createRes.ok) {
      const createJson = await createRes.json().catch(() => ({}));
      // If it already exists due to race, ignore; otherwise throw
      const msg = JSON.stringify(createJson);
      if (!msg.includes("nameAlreadyExists") && !msg.includes("already exists")) {
        throw new Error(`Failed creating folder "${currentPath}": ${msg}`);
      }
    }
  }
}