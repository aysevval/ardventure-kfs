"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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

export default function Kampanyalar() {
  // Properly type the campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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

  if (isLoading) return <div>Kampanyalar yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kampanyalar</h1>

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
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <div className="flex justify-between">
              <Link href={`/kampanya/${campaign._id}`}>
                <Button variant="outline">İncele</Button>
              </Link>
              <Link href={`/kampanya/${campaign._id}#satis`}>
                <Button>Yatırım Yap</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

