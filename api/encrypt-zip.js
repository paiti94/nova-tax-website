// api/encrypt-zip.js
import CryptoJS from 'crypto-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { zipBase64 } = req.body;
  const encryptionPassword = process.env.ENCRYPTION_PASSWORD;

  if (!zipBase64 || !encryptionPassword) {
    return res.status(400).json({ message: 'Missing zipBase64 or encryptionPassword' });
  }

  try {
    const encryptedZip = CryptoJS.AES.encrypt(zipBase64, encryptionPassword).toString();
    return res.status(200).json({ encryptedZip });
  } catch (error) {
    console.error('Encryption error:', error);
    return res.status(500).json({ message: 'Encryption failed' });
  }
}