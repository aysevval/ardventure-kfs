"use client"

import { Button } from "@/components/ui/button"
import { Shield, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isInvestorOpen, setIsInvestorOpen] = useState(false)
  const [isEntrepreneurOpen, setIsEntrepreneurOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <nav className="container mx-auto flex h-16 items-center px-4">
          <div className="flex-1">
            <Link href="/" className="text-xl font-bold">
              Ardventure KFS
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <>
              <div 
                className="relative"
                onMouseEnter={() => setIsInvestorOpen(true)}
                onMouseLeave={() => setIsInvestorOpen(false)}
              >
                <button
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-xss"
                >
                  YATIRIMCI ▼
                </button>

                {isInvestorOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white border rounded-md shadow-lg z-50">
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      YATIRIM YAP
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      YARDIM MERKEZI
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      NASIL YATIRIMCI OLUNUR?
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      NASIL KAZANC SAGLARIM?
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      FUIP - IKINCIL ISLEMLER
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      LIC (LEAD INVESTOR CLUB)
                    </Link>
                  </div>
                )}
              </div>

              <div 
                className="relative"
                onMouseEnter={() => setIsEntrepreneurOpen(true)}
                onMouseLeave={() => setIsEntrepreneurOpen(false)}
              >
                <button
                  className="px-2 py-2 bg-white hover:bg-gray-50"
                >
                  GIRISIMCI ▼
                </button>

                {isEntrepreneurOpen && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white border rounded-md shadow-lg z-50 text-sm">
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      KAMPANYA BASLAT
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      YARDIM MERKEZI
                    </Link>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      FINANSMANA NASIL ULASIRIM?
                    </Link>
                  </div>
                )}
              </div>
            </>

            <Link href="/giris">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/kayit">
              <Button>Kayıt Ol</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Kitle Fonlama Sistemine Hoş Geldiniz</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Girişimciler ve yatırımcılar arasında güvenli, hızlı ve modern bir köprü. Projelerinizi hayata geçirin
              veya geleceğin başarılı girişimlerine yatırım yapın.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kayit">
                <Button size="lg" variant="secondary">
                  Hemen Başla
                </Button>
              </Link>
              <Link href="/projeler">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10">
                  Projeleri Keşfet
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Neden Ardventure KFS?</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Güvenli Yatırım</h3>
                <p className="text-muted-foreground">
                  SPK düzenlemelerine tam uyumluluk ve KVKK standartlarında veri güvenliği
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Şeffaf Süreçler</h3>
                <p className="text-muted-foreground">
                  Kampanya ve yatırım süreçlerinde tam şeffaflık ve gerçek zamanlı raporlama
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Geniş Ağ</h3>
                <p className="text-muted-foreground">Binlerce yatırımcı ve girişimciyi buluşturan güçlü bir platform</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2024 Ardventure KFS. Tüm hakları saklıdır.</p>
            <nav className="flex gap-4">
              <Link href="/hakkimizda" className="text-sm text-muted-foreground hover:text-primary">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-sm text-muted-foreground hover:text-primary">
                İletişim
              </Link>
              <Link href="/kvkk" className="text-sm text-muted-foreground hover:text-primary">
                KVKK
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

