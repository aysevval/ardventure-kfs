"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Shield, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function KayitPage() {
  const [userType, setUserType] = useState("bireysel")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call would go here
      toast({
        title: "Kayıt başarılı!",
        description: "Hesabınız oluşturuldu. Giriş yapabilirsiniz.",
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
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
            <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
            <CardDescription>Hızlı ve güvenli bir şekilde kayıt olun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Hesap Türü</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Hesap türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bireysel">Bireysel Yatırımcı</SelectItem>
                    <SelectItem value="kurumsal">Kurumsal Yatırımcı</SelectItem>
                    <SelectItem value="girisimci">Girişimci</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" placeholder="ornek@email.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-confirm">Şifre Tekrar</Label>
                <Input id="password-confirm" type="password" required />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Kaydediliyor..." : "Kayıt Ol"}
              </Button>

              <div className="text-center text-sm">
                Zaten hesabınız var mı?{" "}
                <Link href="/giris" className="text-primary hover:underline">
                  Giriş yapın
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

