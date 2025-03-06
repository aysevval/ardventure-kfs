"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define an interface for the Campaign type
interface Campaign {
  _id: string
  title: string
  description: string
  image?: string
  status: string
  sector: string
  // Add other properties as needed
}

const fetchCampaigns = async () => {
  const res = await fetch("/api/campaigns")
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns")
  }
  return res.json()
}

export default function Home() {
  const [isInvestorOpen, setIsInvestorOpen] = useState(false)
  const [isEntrepreneurOpen, setIsEntrepreneurOpen] = useState(false)
  // Properly type the campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetchCampaigns()
      .then((data) => {
        setCampaigns(data)
        setFilteredCampaigns(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = campaigns
    if (statusFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter)
    }
    if (sectorFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.sector === sectorFilter)
    }
    setFilteredCampaigns(filtered)
  }, [statusFilter, sectorFilter, campaigns])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Existing header code */}
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Ardventure KFS
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={() => setIsInvestorOpen(!isInvestorOpen)} className="text-white hover:text-gray-300">
                Yatırımcı
              </button>
              {isInvestorOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48">
                  <Link href="/yatirim-yap" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    YATIRIM YAP
                  </Link>
                  <Link href="/yardim-merkezi/yatirimci" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    YARDIM MERKEZI
                  </Link>
                  <Link href="/nasil-yatirimci-olunur" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    NASIL YATIRIMCI OLUNUR?
                  </Link>
                  <Link href="/yatirimci-kazanc-rehberi" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    NASIL KAZANC SAGLARIM?
                  </Link>
                  <Link href="/fuip-ikincil-islemler" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    FUIP - IKINCIL ISLEMLER
                  </Link>
                  <Link href="/lead-investor-club" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    LIC (LEAD INVESTOR CLUB)
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsEntrepreneurOpen(!isEntrepreneurOpen)}
                className="text-white hover:text-gray-300"
              >
                Girişimci
              </button>
              {isEntrepreneurOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48">
                  <Link href="/kampanya-baslat" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    KAMPANYA BASLAT
                  </Link>
                  <Link href="/yardim-merkezi/girisimci" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    YARDIM MERKEZI
                  </Link>
                  <Link href="/finansman-rehberi" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    FINANSMANA NASIL ULASIRIM?
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Existing hero section */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Ardventure KFS</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Türkiye&apos;nin en güvenilir ve kullanıcı dostu kitle fonlama platformu
            </p>
            <Link href="/kampanyalar">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 mx-auto block">
                Projeleri Keşfet
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Kampanyalar</h2>

            <div className="flex gap-4 mb-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kampanya Durumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="upcoming">Yakında</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Sektör" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Sektörler</SelectItem>
                  <SelectItem value="technology">Teknoloji</SelectItem>
                  <SelectItem value="energy">Enerji</SelectItem>
                  <SelectItem value="health">Sağlık</SelectItem>
                  <SelectItem value="finance">Finans</SelectItem>
                  {/* Add more sectors as needed */}
                </SelectContent>
              </Select>
            </div>

            {isLoading && <div>Loading campaigns...</div>}
            {error && <div>Error: {error}</div>}

            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign._id} className="border rounded-lg overflow-hidden">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 mb-4">{campaign.description}</p>
                      <div className="flex justify-between items-center">
                        <Link href={`/kampanya/${campaign._id}`}>
                          <Button variant="outline">İncele</Button>
                        </Link>
                        <Link href={`/kampanya/${campaign._id}#satis`}>
                          <Button>Yatırım Yap</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

