// api/send-email-attachment.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { to, sender, subject, text_body, html_body, attachments } = req.body;
    const apiKey = process.env.SMTP2GO_API_KEY;
    if (!apiKey || !to || !sender || !subject || !attachments) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const response = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          to,
          sender,
          subject,
          text_body,
          html_body,
          attachments,
        }),
      });
  
      const data = await response.json();
  
      if (data && data.data && data.data.succeeded) {
        return res.status(200).json({ success: true });
      } else {
        console.error('SMTP2GO response:', data);
        return res.status(500).json({ success: false, error: 'Failed to send' });
      }
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }