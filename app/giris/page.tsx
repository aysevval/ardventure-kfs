"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Shield, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GirisPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call would go here
      toast({
        title: "Giriş başarılı!",
        description: "Hoş geldiniz.",
      })
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-blue-600 lg:block">
        <div className="flex h-full flex-col justify-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Kitle Fonlama Sistemine Hoş Geldiniz</h1>
          <p className="text-xl mb-8">Girişimciler ve yatırımcılar arasında güvenli, hızlı ve modern bir köprü.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <span>SPK düzenlemelerine tam uyumluluk</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6" />
              <span>KVKK ve GDPR standartlarında veri güvenliği</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              <span>Şeffaf ve verimli yatırım süreçleri</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            <CardDescription>Ardventure KFS hesabınıza giriş yapın.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" placeholder="ornek@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center justify-between">
                <Link href="/sifremi-unuttum" className="text-sm text-primary hover:underline">
                  Şifremi Unuttum
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>

              <div className="text-center text-sm">
                Hesabınız yok mu?{" "}
                <Link href="/kayit" className="text-primary hover:underline">
                  Hemen kayıt olun
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

