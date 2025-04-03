import { Zip } from 'zip-lib';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { pdfBase64, filename } = req.body;
    const password = process.env.ENCRYPTION_PASSWORD;

    if (!pdfBase64 || !filename || !password) {
      return res.status(400).json({ error: 'Missing required fields or env password' });
    }

    const buffer = Buffer.from(pdfBase64, 'base64');

    const zip = new Zip();
    await zip.addBuffer(buffer, `${filename}.pdf`, { password });

    const zipBuffer = await zip.archiveBuffer();
    const zipBase64 = zipBuffer.toString('base64');

    return res.status(200).json({ zipBase64 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'ZIP encryption failed' });
  }
}
