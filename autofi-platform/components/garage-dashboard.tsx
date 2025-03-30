"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Banknote, RefreshCw, Shield, Info } from "lucide-react"
import NFTDetails from "@/components/nft-details"

// Mock data for vehicle NFTs
const vehicleNFTs = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    image: "/placeholder.svg?height=300&width=500&text=Tesla Model 3",
    price: "$42,500",
    status: {
      loaned: true,
      insured: true,
    },
    tokenId: "0x7a3b...9c4d",
    minted: "2 days ago",
  },
  {
    id: 2,
    make: "BMW",
    model: "X5",
    year: 2020,
    image: "/placeholder.svg?height=300&width=500&text=BMW X5",
    price: "$35,000",
    status: {
      loaned: true,
      insured: false,
    },
    tokenId: "0x3b5c...2e4f",
    minted: "1 week ago",
  },
  {
    id: 3,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    image: "/placeholder.svg?height=300&width=500&text=Toyota Camry",
    price: "$18,750",
    status: {
      loaned: false,
      insured: true,
    },
    tokenId: "0x5d7e...1a3b",
    minted: "2 weeks ago",
  },
  {
    id: 4,
    make: "Ford",
    model: "F-150",
    year: 2022,
    image: "/placeholder.svg?height=300&width=500&text=Ford F-150",
    price: "$48,900",
    status: {
      loaned: false,
      insured: false,
    },
    tokenId: "0x2f8c...3a5b",
    minted: "3 days ago",
  },
]

export default function GarageDashboard() {
  const [selectedNFT, setSelectedNFT] = useState<(typeof vehicleNFTs)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (nft: (typeof vehicleNFTs)[0]) => {
    setSelectedNFT(nft)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Vehicles ({vehicleNFTs.length})</TabsTrigger>
            <TabsTrigger value="loaned">Loaned ({vehicleNFTs.filter((nft) => nft.status.loaned).length})</TabsTrigger>
            <TabsTrigger value="insured">
              Insured ({vehicleNFTs.filter((nft) => nft.status.insured).length})
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" onClick={() => (window.location.href = "/mint")}>
            Mint New Vehicle
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleNFTs.map((nft) => (
              <VehicleNFTCard key={nft.id} nft={nft} onViewDetails={() => handleViewDetails(nft)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loaned" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleNFTs
              .filter((nft) => nft.status.loaned)
              .map((nft) => (
                <VehicleNFTCard key={nft.id} nft={nft} onViewDetails={() => handleViewDetails(nft)} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="insured" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleNFTs
              .filter((nft) => nft.status.insured)
              .map((nft) => (
                <VehicleNFTCard key={nft.id} nft={nft} onViewDetails={() => handleViewDetails(nft)} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedNFT && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Vehicle NFT Details</DialogTitle>
              <DialogDescription>Complete information about your vehicle NFT</DialogDescription>
            </DialogHeader>
            <NFTDetails nft={selectedNFT} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

interface VehicleNFTCardProps {
  nft: (typeof vehicleNFTs)[0]
  onViewDetails: () => void
}

function VehicleNFTCard({ nft, onViewDetails }: VehicleNFTCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={nft.image || "/placeholder.svg"}
          alt={`${nft.make} ${nft.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {nft.status.loaned && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Banknote className="h-3 w-3" />
              Loaned
            </Badge>
          )}
          {nft.status.insured && (
            <Badge variant="outline" className="bg-background/80 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Insured
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold">
            {nft.make} {nft.model} ({nft.year})
          </h3>
          <p className="text-sm text-muted-foreground">Minted {nft.minted}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Valuation</p>
            <p className="text-lg font-bold">{nft.price}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Info className="h-4 w-4 mr-1" /> Details
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" className="w-full" disabled={nft.status.loaned}>
          <Banknote className="h-4 w-4 mr-1" /> Loan
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <RefreshCw className="h-4 w-4 mr-1" /> Trade
        </Button>
        <Button variant="outline" size="sm" className="w-full" disabled={nft.status.insured}>
          <Shield className="h-4 w-4 mr-1" /> Insure
        </Button>
      </CardFooter>
    </Card>
  )
}

