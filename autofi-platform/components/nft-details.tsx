import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Banknote, RefreshCw, Shield, FileText } from "lucide-react"

interface NFTDetailsProps {
  nft: {
    id: number
    make: string
    model: string
    year: number
    image: string
    price: string
    status: {
      loaned: boolean
      insured: boolean
    }
    tokenId: string
    minted: string
  }
}

export default function NFTDetails({ nft }: NFTDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={nft.image || "/placeholder.svg"}
            alt={`${nft.make} ${nft.model}`}
            className="w-full rounded-lg object-cover"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {nft.status.loaned && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Banknote className="h-3 w-3" />
                Loaned
              </Badge>
            )}
            {nft.status.insured && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Insured
              </Badge>
            )}
            <Badge variant="default" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              NFT
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              {nft.make} {nft.model} ({nft.year})
            </h2>
            <p className="text-sm text-muted-foreground">Minted {nft.minted}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Valuation</p>
              <p className="text-2xl font-bold">{nft.price}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Token ID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm">{nft.tokenId}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-1" disabled={nft.status.loaned}>
              <Banknote className="h-4 w-4" />
              Apply for Loan
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Transfer NFT
            </Button>
            <Button variant="outline" className="flex items-center gap-1" disabled={nft.status.insured}>
              <Shield className="h-4 w-4" />
              Link Insurance
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          <TabsTrigger value="loan" disabled={!nft.status.loaned}>
            Loan Status
          </TabsTrigger>
          <TabsTrigger value="insurance" disabled={!nft.status.insured}>
            Insurance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-4 border rounded-lg mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Make</p>
              <p className="font-medium">{nft.make}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{nft.model}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{nft.year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mileage</p>
              <p className="font-medium">45,000 miles</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VIN</p>
              <p className="font-medium">5YJ3E1EA8JF006789</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">Electric</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Previous Owners</p>
              <p className="font-medium">1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maintenance History</p>
              <p className="font-medium">Regular service at authorized dealer</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="loan" className="p-4 border rounded-lg mt-2">
          {nft.status.loaned ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="font-medium">$25,500</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-medium">4.5% APR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="font-medium">36 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="font-medium">$762.45</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">Jan 15, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">Jan 15, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="default">Active</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining Balance</p>
                  <p className="font-medium">$22,873.50</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Loan Details
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No active loans for this vehicle</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insurance" className="p-4 border rounded-lg mt-2">
          {nft.status.insured ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Provider</p>
                  <p className="font-medium">BlockInsure</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-medium">INS-2023-78945</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage Type</p>
                  <p className="font-medium">Comprehensive</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Premium</p>
                  <p className="font-medium">$1,200 / year</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">Mar 1, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">Mar 1, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Claims</p>
                  <p className="font-medium">0</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Policy Details
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No insurance linked to this vehicle</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

