"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MFASetupProps {
  userId: string
  onSetupComplete: () => void
}

export function MFASetup({ userId, onSetupComplete }: MFASetupProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSetup = async () => {
    try {
      const response = await fetch("/api/mfa/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      const data = await response.json()
      setQrCode(data.qrCode)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("MFA kurulumu başlatılırken bir hata oluştu.")
    }
  }

  const handleVerify = async () => {
    try {
      const response = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token }),
      })
      if (response.ok) {
        onSetupComplete()
      } else {
        setError("Geçersiz token. Lütfen tekrar deneyin.")
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Token doğrulanırken bir hata oluştu.")
    }
  }

  return (
    <div className="space-y-4">
      {!qrCode ? (
        <Button onClick={handleSetup}>MFA Kurulumunu Başlat</Button>
      ) : (
        <>
          <img src={qrCode || "/placeholder.svg"} alt="MFA QR Code" className="mx-auto" />
          <p>Lütfen Google Authenticator veya benzer bir uygulama kullanarak QR kodunu tarayın.</p>
          <Input
            type="text"
            placeholder="6 haneli kodu girin"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button onClick={handleVerify}>Doğrula ve Kurulumu Tamamla</Button>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

