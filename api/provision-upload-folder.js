export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  try {
    const flowUrl = process.env.POWER_AUTOMATE_FLOW_URL;
    const flowSecret = process.env.POWER_AUTOMATE_FLOW_SECRET;

    if (!flowUrl || !flowSecret) {
      return res.status(500).send("Server not configured");
    }

    // Basic spam protection (optional, but recommended)
    // Example: require email exists
    const body = req.body;
    const email = body?.client?.email;
    if (!email) return res.status(400).send("Missing client.email");

    const flowRes = await fetch(flowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-novatax-secret": flowSecret,
      },
      body: JSON.stringify(body),
    });

    const text = await flowRes.text();

    if (!flowRes.ok) {
      return res.status(flowRes.status).send(text);
    }

    // Forward the JSON response from Flow A
    return res.status(200).json(JSON.parse(text));
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal error");
  }
}