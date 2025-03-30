"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, ArrowRight, Banknote, Calendar, Check, Clock, DollarSign } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for active loans
const activeLoans = [
  {
    id: 1,
    vehicle: {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
      image: "/placeholder.svg?height=300&width=500&text=Tesla Model 3",
    },
    amount: "$25,500",
    term: "36 months",
    interest: "4.5%",
    startDate: "Jan 15, 2023",
    endDate: "Jan 15, 2026",
    monthlyPayment: "$762.45",
    remainingBalance: "$22,873.50",
    progress: 25,
    nextPayment: {
      date: "Jul 15, 2023",
      amount: "$762.45",
    },
  },
  {
    id: 2,
    vehicle: {
      make: "BMW",
      model: "X5",
      year: 2020,
      image: "/placeholder.svg?height=300&width=500&text=BMW X5",
    },
    amount: "$21,000",
    term: "24 months",
    interest: "5.2%",
    startDate: "Mar 10, 2023",
    endDate: "Mar 10, 2025",
    monthlyPayment: "$921.75",
    remainingBalance: "$18,435.00",
    progress: 15,
    nextPayment: {
      date: "Jul 10, 2023",
      amount: "$921.75",
    },
  },
]

// Mock data for available vehicles for loan
const availableVehicles = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    image: "/placeholder.svg?height=300&width=500&text=Toyota Camry",
    value: "$18,750",
    maxLoanAmount: "$13,125", // 70% of value
  },
  {
    id: 2,
    make: "Ford",
    model: "F-150",
    year: 2022,
    image: "/placeholder.svg?height=300&width=500&text=Ford F-150",
    value: "$48,900",
    maxLoanAmount: "$34,230", // 70% of value
  },
]

export default function LoanDashboard() {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [loanTerm, setLoanTerm] = useState<string>("36")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleApplyForLoan = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleVehicleSelect = (value: string) => {
    setSelectedVehicle(value)
    const vehicle = availableVehicles.find((v) => v.id.toString() === value)
    if (vehicle) {
      // Set initial loan amount to 50% of max
      const maxAmount = Number.parseFloat(vehicle.maxLoanAmount.replace(/[^0-9.]/g, ""))
      setLoanAmount(maxAmount * 0.5)
    }
  }

  const getSelectedVehicle = () => {
    return availableVehicles.find((v) => v.id.toString() === selectedVehicle)
  }

  const calculateMonthlyPayment = () => {
    if (!selectedVehicle) return "$0"

    const principal = loanAmount
    const interestRate = 0.045 / 12 // 4.5% annual interest rate converted to monthly
    const numberOfPayments = Number.parseInt(loanTerm)

    const monthlyPayment =
      (principal * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
      (Math.pow(1 + interestRate, numberOfPayments) - 1)

    return `$${monthlyPayment.toFixed(2)}`
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="active">Active Loans ({activeLoans.length})</TabsTrigger>
            <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-0">
          {activeLoans.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {loan.vehicle.make} {loan.vehicle.model} ({loan.vehicle.year})
                        </CardTitle>
                        <CardDescription>Loan #{loan.id}</CardDescription>
                      </div>
                      <Badge className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-medium">{loan.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="font-medium">{loan.term}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.interest}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">{loan.monthlyPayment}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Loan Progress</span>
                        <span>{loan.progress}%</span>
                      </div>
                      <Progress value={loan.progress} className="h-2" />
                    </div>

                    <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Next Payment</p>
                          <p className="text-sm font-medium">{loan.nextPayment.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{loan.nextPayment.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Loan Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Banknote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Loans</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any active loans. Apply for a loan using your vehicle NFTs as collateral.
              </p>
              <Button onClick={() => document.querySelector('[data-value="apply"]')?.click()}>Apply for Loan</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="apply" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {availableVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Vehicle Value</p>
                      <p className="text-sm font-medium">{vehicle.value}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                      <p className="text-sm font-medium">{vehicle.maxLoanAmount}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Dialog
                    open={isApplyDialogOpen && selectedVehicle === vehicle.id.toString()}
                    onOpenChange={(open) => {
                      setIsApplyDialogOpen(open)
                      if (!open) {
                        setIsSuccess(false)
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedVehicle(vehicle.id.toString())
                          handleVehicleSelect(vehicle.id.toString())
                          setIsApplyDialogOpen(true)
                        }}
                      >
                        Apply for Loan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Apply for Loan</DialogTitle>
                        <DialogDescription>Use your vehicle NFT as collateral to get a loan</DialogDescription>
                      </DialogHeader>

                      {!isSuccess ? (
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label>Selected Vehicle</Label>
                            <div className="flex items-center gap-3 p-3 border rounded-md">
                              <img
                                src={vehicle.image || "/placeholder.svg"}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="w-16 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">
                                  {vehicle.make} {vehicle.model} ({vehicle.year})
                                </p>
                                <p className="text-sm text-muted-foreground">Value: {vehicle.value}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="loanAmount">Loan Amount</Label>
                              <span className="text-sm text-muted-foreground">Max: {vehicle.maxLoanAmount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="loanAmount"
                                type="number"
                                value={loanAmount}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value)
                                  const maxAmount = Number.parseFloat(vehicle.maxLoanAmount.replace(/[^0-9.]/g, ""))
                                  if (value > maxAmount) {
                                    setLoanAmount(maxAmount)
                                  } else {
                                    setLoanAmount(value)
                                  }
                                }}
                                className="flex-1"
                              />
                            </div>
                            <Slider
                              value={[loanAmount]}
                              max={Number.parseFloat(vehicle.maxLoanAmount.replace(/[^0-9.]/g, ""))}
                              step={100}
                              onValueChange={(value) => setLoanAmount(value[0])}
                              className="py-2"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="loanTerm">Loan Term</Label>
                            <Select value={loanTerm} onValueChange={setLoanTerm}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select term" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12">12 months</SelectItem>
                                <SelectItem value="24">24 months</SelectItem>
                                <SelectItem value="36">36 months</SelectItem>
                                <SelectItem value="48">48 months</SelectItem>
                                <SelectItem value="60">60 months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Loan Summary</Label>
                            <div className="bg-muted p-4 rounded-lg space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Interest Rate</span>
                                <span className="text-sm font-medium">4.5% APR</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Monthly Payment</span>
                                <span className="text-sm font-medium">{calculateMonthlyPayment()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Total Repayment</span>
                                <span className="text-sm font-medium">
                                  $
                                  {(
                                    Number.parseFloat(calculateMonthlyPayment().replace(/[^0-9.]/g, "")) *
                                    Number.parseInt(loanTerm)
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Alert variant="outline" className="bg-primary/5 border-primary/20">
                            <AlertCircle className="h-4 w-4 text-primary" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription className="text-xs">
                              By applying for this loan, you agree to use your vehicle NFT as collateral. If you default
                              on payments, your NFT may be liquidated.
                            </AlertDescription>
                          </Alert>

                          <Button
                            className="w-full"
                            onClick={handleApplyForLoan}
                            disabled={isSubmitting || loanAmount <= 0}
                          >
                            {isSubmitting ? (
                              <>
                                <Clock className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>Apply for Loan</>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="py-6 text-center space-y-4">
                          <div className="bg-green-50 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold">Loan Approved!</h3>
                          <p className="text-muted-foreground">
                            Your loan application has been approved. Funds will be transferred to your wallet shortly.
                          </p>
                          <Button
                            className="w-full mt-4"
                            onClick={() => {
                              setIsApplyDialogOpen(false)
                              setIsSuccess(false)
                              document.querySelector('[data-value="active"]')?.click()
                            }}
                          >
                            View Active Loans <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

