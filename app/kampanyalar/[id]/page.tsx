"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

// Define an interface for the Campaign type
interface Campaign {
  title: string
  description: string
  image?: string
  targetFund: number
  raisedFund: number
  remainingDays: number
  investorCount: number
  // Add other properties as needed
}

const fetchCampaign = async (id: string) => {
  const res = await fetch(`/api/campaigns/${id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch campaign")
  }
  return res.json()
}

export default function KampanyaDetay() {
  const params = useParams()
  const searchParams = useSearchParams()
  // Properly type the campaign state
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params && params.id) {
      fetchCampaign(params.id as string)
        .then((data) => {
          setCampaign(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [params])

  useEffect(() => {
    if (searchParams && searchParams.get("tab") === "satis") {
      setActiveTab("invest")
    }
  }, [searchParams])

  if (isLoading) return <div>Kampanya yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>
  if (!campaign) return <div>Kampanya bulunamadı</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{campaign.title}</h1>

      <div className="flex mb-6">
        <Button variant={activeTab === "details" ? "default" : "outline"} onClick={() => setActiveTab("details")}>
          Kampanya Detayları
        </Button>
        <Button variant={activeTab === "invest" ? "default" : "outline"} onClick={() => setActiveTab("invest")}>
          Yatırım Yap
        </Button>
      </div>

      {activeTab === "details" && (
        <div>
          <img
            src={campaign.image || "/placeholder.svg"}
            alt={campaign.title}
            className="w-full h-64 object-cover mb-6"
          />
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Hedef Fon</h3>
              <p>{campaign.targetFund} TL</p>
            </div>
            <div>
              <h3 className="font-semibold">Toplanan Fon</h3>
              <p>{campaign.raisedFund} TL</p>
            </div>
            <div>
              <h3 className="font-semibold">Kalan Süre</h3>
              <p>{campaign.remainingDays} gün</p>
            </div>
            <div>
              <h3 className="font-semibold">Yatırımcı Sayısı</h3>
              <p>{campaign.investorCount}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "invest" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Yatırım Yap</h2>
          <p>Yatırım formu henüz uygulanmadı.</p>
        </div>
      )}
    </div>
  )
}

