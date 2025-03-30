import type { Metadata } from "next"
import Marketplace from "@/components/marketplace"

export const metadata: Metadata = {
  title: "Marketplace | AutoFi",
  description: "Buy and sell vehicle NFTs in a decentralized marketplace",
}

export default function MarketplacePage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">P2P Marketplace</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Buy and sell vehicle NFTs in a decentralized marketplace
        </p>
      </div>

      <Marketplace />
    </div>
  )
}

