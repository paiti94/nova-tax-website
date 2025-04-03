// api/encrypt-zip.js
export default async function handler(req, res) {
    // Allow only GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    // Retrieve the encryption password from environment variables
    const encryptionPassword = process.env.ENCRYPTION_PASSWORD;
  
    // Check if the password is set
    if (!encryptionPassword) {
      return res.status(500).json({ message: 'Encryption password not set' });
    }
  
    // Respond with the encryption password
    return res.status(200).json({ encryptionPassword });
  }