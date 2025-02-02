import type { NextApiRequest, NextApiResponse } from "next"

// Mock kullanıcı veritabanı
const users = [{ id: 1, email: "user@example.com", password: "password123", mfaEnabled: false }]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { email, password } = req.body

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Gerçek bir JWT yerine basit bir token oluşturuyoruz
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64")
    res.status(200).json({ token, mfaRequired: user.mfaEnabled })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
}

