"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define an interface for the Campaign type
interface Campaign {
  _id: string
  title: string
  description: string
  image?: string
  status?: string
  sector?: string
  // Add other properties as needed
}

const fetchCampaigns = async () => {
  const res = await fetch("/api/campaigns")
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns")
  }
  return res.json()
}

export default function YatirimYap() {
  // Properly type the campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCampaigns()
      .then((data) => {
        setCampaigns(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div>Kampanyalar yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Yatırım Yap</h1>
      <p className="mb-6">Aşağıdaki kampanyalardan birine yatırım yapabilirsiniz.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <Link href={`/kampanya/${campaign._id}`}>
              <Button>Yatırım Yap</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

