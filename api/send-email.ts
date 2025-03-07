export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const apiKey = process.env.SMTP2GO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing SMTP API Key" });
    }
  
    const { to, sender, subject, text_body, html_body, attachments } = req.body;
  
    if (!to || !sender || !subject || !text_body || !html_body) {
      return res.status(400).json({ error: "Missing required email fields" });
    }
  
    try {
      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey, // ✅ The frontend NEVER sees this key!
          to,
          sender,
          subject,
          text_body,
          html_body,
          attachments,
        }),
      });
  
      const data = await response.json();
      if (data.data && data.data.succeeded) {
        return res.status(200).json({ message: "Email sent successfully" });
      } else {
        return res.status(500).json({ error: "Failed to send email", details: data });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  