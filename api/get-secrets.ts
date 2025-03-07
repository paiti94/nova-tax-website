   // api/get-secrets.js
   export default function handler(req, res) {
    try {
        console.log("API called: /api/get-secrets"); // Debug log

        const apiKey = process.env.VITE_SMTP2GO_API_KEY; // Use VITE_ prefix for Vite
        const encryptionPassword = process.env.VITE_ENCRYPTION_PASSWORD;

        if (!apiKey || !encryptionPassword) {
            console.error("Missing API keys in environment variables!");
            return res.status(500).json({ error: "Missing secrets" });
        }

        console.log("Returning secrets successfully."); // Debug log
        return res.status(200).json({ apiKey, encryptionPassword });
    } catch (error) {
        console.error("Error in API:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}