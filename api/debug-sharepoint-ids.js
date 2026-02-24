export default async function handler(req, res) {
  try {
    const tenantId = process.env.M365_TENANT_ID;
    const clientId = process.env.M365_CLIENT_ID;
    const clientSecret = process.env.M365_CLIENT_SECRET;

    const host = process.env.SP_HOST; // netorg...sharepoint.com
    const sitePath = process.env.SP_SITE_PATH; // NovaTax-ClientFiles
    const listName = process.env.SP_LIST_NAME; // Client Intake Requests

    if (!tenantId || !clientId || !clientSecret || !host || !sitePath || !listName) {
      return res.status(500).json({ error: "Missing env vars" });
    }

    // 1) Get token (app-only)
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
    if (!tokenRes.ok) return res.status(500).json({ error: "Token error", details: tokenJson });

    const accessToken = tokenJson.access_token;

    // 2) Get site
    const siteRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${host}:/sites/${encodeURIComponent(sitePath)}?$select=id,webUrl,displayName`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const siteJson = await siteRes.json();
    if (!siteRes.ok) return res.status(siteRes.status).json({ error: "Site lookup failed", details: siteJson });

    const siteId = siteJson.id;

    // 3) Find list by name
    const listsRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists?$select=id,displayName,webUrl`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const listsJson = await listsRes.json();
    if (!listsRes.ok) return res.status(listsRes.status).json({ error: "Lists lookup failed", details: listsJson });

    const match = (listsJson.value || []).find((l) => l.displayName === listName);

    return res.status(200).json({
      site: { id: siteId, displayName: siteJson.displayName, webUrl: siteJson.webUrl },
      listsCount: (listsJson.value || []).length,
      listMatch: match || null,
      listNames: (listsJson.value || []).map((l) => l.displayName),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal error" });
  }
}