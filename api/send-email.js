export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { name, email, phone, message } = req.body;
    const apiKey = process.env.SMTP2GO_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ message: 'Missing SMTP2GO API key' });
    }
  
    try {
      const smtpResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: apiKey,
          to: ['ali@novatax.ca'],
          sender: 'contact@novatax.ca',
          subject: `New Contact Form Submission from ${name}`,
          text_body: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
          `,
          html_body: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
          custom_headers: [
            {
              header: "Reply-To",
              value: email
            }
          ]
        })
      });
  
      const data = await smtpResponse.json();
  
      if (data && data.data && data.data.succeeded) {
        return res.status(200).json({ message: 'Message sent successfully' });
      } else {
        console.error('SMTP2GO failed:', data);
        return res.status(500).json({ message: 'SMTP2GO failed to send email' });
      }
  
    } catch (err) {
      console.error('Server error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  