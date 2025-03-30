"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Clock, Filter, Search, Tag, Wallet, DollarSign } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for marketplace listings
const marketplaceListings = [
  {
    id: 1,
    make: "Audi",
    model: "A4",
    year: 2020,
    image: "/placeholder.svg?height=300&width=500&text=Audi A4",
    price: "$32,500",
    aiValue: "$33,200",
    seller: "0x8b...4f2e",
    minted: "3 months ago",
    condition: "Excellent",
    mileage: "25,000 miles",
  },
  {
    id: 2,
    make: "Lexus",
    model: "RX 350",
    year: 2021,
    image: "/placeholder.svg?height=300&width=500&text=Lexus RX 350",
    price: "$45,900",
    aiValue: "$46,500",
    seller: "0x3c...9a7b",
    minted: "2 months ago",
    condition: "Excellent",
    mileage: "18,500 miles",
  },
  {
    id: 3,
    make: "Honda",
    model: "Civic",
    year: 2019,
    image: "/placeholder.svg?height=300&width=500&text=Honda Civic",
    price: "$19,750",
    aiValue: "$20,100",
    seller: "0x5e...2d1c",
    minted: "5 months ago",
    condition: "Good",
    mileage: "35,000 miles",
  },
  {
    id: 4,
    make: "Chevrolet",
    model: "Silverado",
    year: 2022,
    image: "/placeholder.svg?height=300&width=500&text=Chevrolet Silverado",
    price: "$41,200",
    aiValue: "$42,000",
    seller: "0x7d...6e3f",
    minted: "1 month ago",
    condition: "Excellent",
    mileage: "12,000 miles",
  },
  {
    id: 5,
    make: "Volkswagen",
    model: "Golf",
    year: 2020,
    image: "/placeholder.svg?height=300&width=500&text=Volkswagen Golf",
    price: "$22,800",
    aiValue: "$23,500",
    seller: "0x9f...4a2b",
    minted: "4 months ago",
    condition: "Good",
    mileage: "28,000 miles",
  },
  {
    id: 6,
    make: "Subaru",
    model: "Outback",
    year: 2021,
    image: "/placeholder.svg?height=300&width=500&text=Subaru Outback",
    price: "$29,500",
    aiValue: "$30,200",
    seller: "0x2a...8c7d",
    minted: "2 months ago",
    condition: "Excellent",
    mileage: "15,000 miles",
  },
]

// Mock data for user's NFTs
const userNFTs = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    image: "/placeholder.svg?height=300&width=500&text=Tesla Model 3",
    aiValue: "$42,500",
    minted: "2 months ago",
    condition: "Excellent",
    mileage: "15,000 miles",
  },
  {
    id: 2,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    image: "/placeholder.svg?height=300&width=500&text=Toyota Camry",
    aiValue: "$18,750",
    minted: "5 months ago",
    condition: "Good",
    mileage: "32,000 miles",
  },
]

export default function Marketplace() {
  const [selectedListing, setSelectedListing] = useState<(typeof marketplaceListings)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isBuying, setIsBuying] = useState(false)
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false)

  const [selectedNFT, setSelectedNFT] = useState<(typeof userNFTs)[0] | null>(null)
  const [isListingOpen, setIsListingOpen] = useState(false)
  const [listingPrice, setListingPrice] = useState("")
  const [isListing, setIsListing] = useState(false)
  const [isListingComplete, setIsListingComplete] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterMake, setFilterMake] = useState("")
  const [filterYear, setFilterYear] = useState("")
  const [filterPrice, setFilterPrice] = useState("")

  const handleViewDetails = (listing: (typeof marketplaceListings)[0]) => {
    setSelectedListing(listing)
    setIsDetailsOpen(true)
  }

  const handleBuyNFT = () => {
    setIsBuying(true)
    // Simulate transaction
    setTimeout(() => {
      setIsBuying(false)
      setIsPurchaseComplete(true)
    }, 2000)
  }

  const handleListNFT = (nft: (typeof userNFTs)[0]) => {
    setSelectedNFT(nft)
    setListingPrice(nft.aiValue.replace("$", ""))
    setIsListingOpen(true)
  }

  const handleCreateListing = () => {
    setIsListing(true)
    // Simulate transaction
    setTimeout(() => {
      setIsListing(false)
      setIsListingComplete(true)
    }, 2000)
  }

  // Filter listings based on search and filters
  const filteredListings = marketplaceListings.filter((listing) => {
    const matchesSearch =
      searchTerm === "" || `${listing.make} ${listing.model}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMake = filterMake === "" || listing.make === filterMake

    const matchesYear = filterYear === "" || listing.year.toString() === filterYear

    const matchesPrice =
      filterPrice === "" ||
      (filterPrice === "under25k" && Number.parseFloat(listing.price.replace(/[^0-9.]/g, "")) < 25000) ||
      (filterPrice === "25kto40k" &&
        Number.parseFloat(listing.price.replace(/[^0-9.]/g, "")) >= 25000 &&
        Number.parseFloat(listing.price.replace(/[^0-9.]/g, "")) <= 40000) ||
      (filterPrice === "over40k" && Number.parseFloat(listing.price.replace(/[^0-9.]/g, "")) > 40000)

    return matchesSearch && matchesMake && matchesYear && matchesPrice
  })

  // Get unique makes for filter
  const uniqueMakes = Array.from(new Set(marketplaceListings.map((listing) => listing.make)))

  // Get unique years for filter
  const uniqueYears = Array.from(new Set(marketplaceListings.map((listing) => listing.year))).sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="browse" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Marketplace</TabsTrigger>
            <TabsTrigger value="sell">Sell Your NFT</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="browse" className="mt-0">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by make or model..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="flex gap-2">
              <Select value={filterMake} onValueChange={setFilterMake}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {uniqueMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPrice} onValueChange={setFilterPrice}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under25k">Under $25,000</SelectItem>
                  <SelectItem value="25kto40k">$25,000 - $40,000</SelectItem>
                  <SelectItem value="over40k">Over $40,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={`${listing.make} ${listing.model}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold">
                        {listing.make} {listing.model} ({listing.year})
                      </h3>
                      <p className="text-sm text-muted-foreground">Listed by {listing.seller}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-lg font-bold">{listing.price}</p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        AI Value: {listing.aiValue}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full" onClick={() => handleViewDetails(listing)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Listings Found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find more results.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterMake("")
                  setFilterYear("")
                  setFilterPrice("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {selectedListing && (
            <Dialog
              open={isDetailsOpen}
              onOpenChange={(open) => {
                setIsDetailsOpen(open)
                if (!open) {
                  setIsPurchaseComplete(false)
                }
              }}
            >
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Vehicle NFT Details</DialogTitle>
                  <DialogDescription>Review the details before purchasing</DialogDescription>
                </DialogHeader>

                {!isPurchaseComplete ? (
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={selectedListing.image || "/placeholder.svg"}
                          alt={`${selectedListing.make} ${selectedListing.model}`}
                          className="w-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {selectedListing.make} {selectedListing.model} ({selectedListing.year})
                          </h3>
                          <p className="text-sm text-muted-foreground">Listed by {selectedListing.seller}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Asking Price</p>
                            <p className="text-sm font-medium">{selectedListing.price}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">AI Valuation</p>
                            <p className="text-sm font-medium">{selectedListing.aiValue}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Condition</p>
                            <p className="text-sm font-medium">{selectedListing.condition}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Mileage</p>
                            <p className="text-sm font-medium">{selectedListing.mileage}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Minted</p>
                            <p className="text-sm font-medium">{selectedListing.minted}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert variant="outline" className="bg-primary/5 border-primary/20">
                      <AlertTitle>Purchase Information</AlertTitle>
                      <AlertDescription className="text-sm">
                        When you purchase this NFT, ownership will be transferred to your wallet. The transaction is
                        secured by the blockchain and cannot be reversed.
                      </AlertDescription>
                    </Alert>

                    <Button className="w-full" onClick={handleBuyNFT} disabled={isBuying}>
                      {isBuying ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Processing Transaction...
                        </>
                      ) : (
                        <>Buy Now for {selectedListing.price}</>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="bg-green-50 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Purchase Complete!</h3>
                    <p className="text-muted-foreground">
                      You have successfully purchased this vehicle NFT. It has been added to your garage.
                    </p>
                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        setIsDetailsOpen(false)
                        window.location.href = "/garage"
                      }}
                    >
                      View in My Garage
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="sell" className="mt-0">
          {userNFTs.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Your Vehicle NFTs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userNFTs.map((nft) => (
                  <Card key={nft.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={`${nft.make} ${nft.model}`}
                        className="w-full h-48 object-cover"
                      />
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
                          <p className="text-sm text-muted-foreground">AI Valuation</p>
                          <p className="text-lg font-bold">{nft.aiValue}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {nft.condition}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full" onClick={() => handleListNFT(nft)}>
                        List for Sale
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No NFTs to Sell</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any vehicle NFTs to sell. Mint a vehicle NFT first.
              </p>
              <Button onClick={() => (window.location.href = "/mint")}>Mint Vehicle NFT</Button>
            </div>
          )}

          {selectedNFT && (
            <Dialog
              open={isListingOpen}
              onOpenChange={(open) => {
                setIsListingOpen(open)
                if (!open) {
                  setIsListingComplete(false)
                }
              }}
            >
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>List NFT for Sale</DialogTitle>
                  <DialogDescription>Set your price and create a marketplace listing</DialogDescription>
                </DialogHeader>

                {!isListingComplete ? (
                  <div className="space-y-6 py-4">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <img
                        src={selectedNFT.image || "/placeholder.svg"}
                        alt={`${selectedNFT.make} ${selectedNFT.model}`}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">
                          {selectedNFT.make} {selectedNFT.model} ({selectedNFT.year})
                        </p>
                        <p className="text-sm text-muted-foreground">AI Value: {selectedNFT.aiValue}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listingPrice">Listing Price ($)</Label>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="listingPrice"
                          value={listingPrice}
                          onChange={(e) => setListingPrice(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Suggested price: {selectedNFT.aiValue} (based on AI valuation)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listingDuration">Listing Duration</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Alert variant="outline" className="bg-primary/5 border-primary/20">
                      <AlertTitle>Listing Information</AlertTitle>
                      <AlertDescription className="text-xs">
                        When you list your NFT, it will be visible to all users in the marketplace. You can cancel the
                        listing at any time before it's purchased.
                      </AlertDescription>
                    </Alert>

                    <Button className="w-full" onClick={handleCreateListing} disabled={isListing || !listingPrice}>
                      {isListing ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Creating Listing...
                        </>
                      ) : (
                        <>Create Listing</>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="bg-green-50 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Listing Created!</h3>
                    <p className="text-muted-foreground">
                      Your vehicle NFT has been successfully listed on the marketplace.
                    </p>
                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        setIsListingOpen(false)
                        document.querySelector('[data-value="browse"]')?.click()
                      }}
                    >
                      View Marketplace
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

