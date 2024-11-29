import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refresh } = req.body;

  if (!refresh) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const response = await axios.post(
      "https://rb-playground.onrender.com/internal/api/v1/auth/logout/",
      { refresh },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.status(response.status).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout API error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to logout" });
  }
}
