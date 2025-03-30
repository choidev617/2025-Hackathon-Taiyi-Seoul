import type { Metadata } from "next"
import LoanDashboard from "@/components/loan-dashboard"

export const metadata: Metadata = {
  title: "Loans | AutoFi",
  description: "Borrow funds using your vehicle NFTs as collateral",
}

export default function LoansPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Loan Dashboard</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Borrow funds using your vehicle NFTs as collateral
        </p>
      </div>

      <LoanDashboard />
    </div>
  )
}

