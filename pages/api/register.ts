import type { NextApiRequest, NextApiResponse } from "next"

// Mock kullanıcı veritabanı
const users = [{ id: 1, email: "user@example.com", password: "password123", mfaEnabled: false }]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { email, password, userType } = req.body

  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" })
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    mfaEnabled: false,
    userType,
  }

  users.push(newUser)

  res.status(201).json({ message: "User created successfully", userId: newUser.id })
}

