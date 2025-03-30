import type { Metadata } from "next"
import MintingForm from "@/components/minting-form"

export const metadata: Metadata = {
  title: "Mint Vehicle NFT | AutoFi",
  description: "Convert your vehicle into a unique NFT with AI valuation",
}

export default function MintPage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Mint Your Vehicle NFT</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Convert your vehicle into a unique digital asset with verified ownership and AI-powered valuation.
        </p>
      </div>

      <MintingForm />
    </div>
  )
}

