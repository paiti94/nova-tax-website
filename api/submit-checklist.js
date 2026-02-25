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

    // Basic validation
    const firstName = payload?.client?.firstName?.trim();
    const lastName = payload?.client?.lastName?.trim();
    const email = payload?.client?.email?.trim()?.toLowerCase();
    const taxYear = payload?.meta?.taxYear;

    if (!firstName || !lastName || !email || !taxYear) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get app-only token (client credentials)
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          scope: "https://graph.microsoft.com/.default",
          grant_type: "client_credentials",
        }),
      }
    );

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) return res.status(500).json({ error: "Token error", details: tokenJson });

    const accessToken = tokenJson.access_token;

    // Create SharePoint list item
    const title = `${lastName}, ${firstName} - ${taxYear}`;

    const createItemRes = await fetch(
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
            PayloadJson: JSON.stringify(payload),
            SummaryText: payload.summaryText,
            Status: "Pending",
          },
        }),
      }
    );

    const itemJson = await createItemRes.json();
    if (!createItemRes.ok) return res.status(500).json({ error: "Create item failed", details: itemJson });

    return res.status(200).json({ ok: true, listItemId: itemJson?.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal error" });
  }
}