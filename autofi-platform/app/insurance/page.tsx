import type { Metadata } from "next"
import InsuranceCenter from "@/components/insurance-center"

export const metadata: Metadata = {
  title: "Insurance | AutoFi",
  description: "Link insurance to your vehicle NFTs and manage coverage",
}

export default function InsurancePage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Insurance Center</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Link insurance to your vehicle NFTs and manage coverage
        </p>
      </div>

      <InsuranceCenter />
    </div>
  )
}

