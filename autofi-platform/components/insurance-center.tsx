"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Clock, FileText, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for insurance policies
const insurancePolicies = [
  {
    id: 1,
    vehicle: {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
      image: "/placeholder.svg?height=300&width=500&text=Tesla Model 3",
    },
    provider: "BlockInsure",
    policyNumber: "INS-2023-78945",
    coverage: "Comprehensive",
    premium: "$1,200 / year",
    startDate: "Mar 1, 2023",
    expiryDate: "Mar 1, 2024",
    status: "Active",
    claims: 0,
  },
  {
    id: 2,
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: 2019,
      image: "/placeholder.svg?height=300&width=500&text=Toyota Camry",
    },
    provider: "ChainProtect",
    policyNumber: "CP-2023-45678",
    coverage: "Third Party",
    premium: "$800 / year",
    startDate: "Jan 15, 2023",
    expiryDate: "Jan 15, 2024",
    status: "Active",
    claims: 1,
  },
]

// Mock data for available vehicles for insurance
const availableVehicles = [
  {
    id: 1,
    make: "Ford",
    model: "F-150",
    year: 2022,
    image: "/placeholder.svg?height=300&width=500&text=Ford F-150",
    value: "$48,900",
  },
  {
    id: 2,
    make: "BMW",
    model: "X5",
    year: 2020,
    image: "/placeholder.svg?height=300&width=500&text=BMW X5",
    value: "$35,000",
  },
]

// Mock data for insurance providers
const insuranceProviders = [
  {
    id: 1,
    name: "BlockInsure",
    description: "Blockchain-based insurance with smart contract claims processing",
    plans: [
      {
        id: "basic",
        name: "Basic Coverage",
        description: "Third party liability coverage",
        premium: "$800 / year",
      },
      {
        id: "standard",
        name: "Standard Coverage",
        description: "Third party liability plus fire and theft",
        premium: "$1,000 / year",
      },
      {
        id: "comprehensive",
        name: "Comprehensive Coverage",
        description: "Full coverage including collision and damage",
        premium: "$1,200 / year",
      },
    ],
  },
  {
    id: 2,
    name: "ChainProtect",
    description: "Decentralized insurance protocol with community-based risk assessment",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Essential coverage for third party damage",
        premium: "$750 / year",
      },
      {
        id: "plus",
        name: "Plus Plan",
        description: "Extended coverage including theft protection",
        premium: "$950 / year",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Complete coverage with roadside assistance",
        premium: "$1,150 / year",
      },
    ],
  },
]

export default function InsuranceCenter() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof insurancePolicies)[0] | null>(null)
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false)

  const handleApplyForInsurance = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleViewPolicy = (policy: (typeof insurancePolicies)[0]) => {
    setSelectedPolicy(policy)
    setIsPolicyDialogOpen(true)
  }

  const getSelectedVehicle = () => {
    return availableVehicles.find((v) => v.id.toString() === selectedVehicle)
  }

  const getSelectedProviderPlans = () => {
    if (selectedProvider === null) return []
    return insuranceProviders.find((p) => p.id === selectedProvider)?.plans || []
  }

  const getSelectedPlanDetails = () => {
    if (selectedProvider === null || !selectedPlan) return null
    const provider = insuranceProviders.find((p) => p.id === selectedProvider)
    return provider?.plans.find((plan) => plan.id === selectedPlan)
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="policies" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="policies">My Policies ({insurancePolicies.length})</TabsTrigger>
            <TabsTrigger value="apply">Apply for Insurance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="policies" className="mt-0">
          {insurancePolicies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insurancePolicies.map((policy) => (
                <Card key={policy.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {policy.vehicle.make} {policy.vehicle.model} ({policy.vehicle.year})
                        </CardTitle>
                        <CardDescription>Policy #{policy.policyNumber}</CardDescription>
                      </div>
                      <Badge
                        className={policy.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {policy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-medium">{policy.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage</p>
                        <p className="font-medium">{policy.coverage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Premium</p>
                        <p className="font-medium">{policy.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Claims</p>
                        <p className="font-medium">{policy.claims}</p>
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Valid From</p>
                        <p className="text-sm font-medium">{policy.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expires On</p>
                        <p className="text-sm font-medium">{policy.expiryDate}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full" onClick={() => handleViewPolicy(policy)}>
                      View Policy Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Policies</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any active insurance policies. Apply for insurance for your vehicle NFTs.
              </p>
              <Button onClick={() => document.querySelector('[data-value="apply"]')?.click()}>
                Apply for Insurance
              </Button>
            </div>
          )}

          {selectedPolicy && (
            <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Insurance Policy Details</DialogTitle>
                  <DialogDescription>Complete information about your insurance policy</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedPolicy.vehicle.image || "/placeholder.svg"}
                        alt={`${selectedPolicy.vehicle.make} ${selectedPolicy.vehicle.model}`}
                        className="w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {selectedPolicy.vehicle.make} {selectedPolicy.vehicle.model} ({selectedPolicy.vehicle.year})
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              selectedPolicy.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                            }
                          >
                            {selectedPolicy.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">Policy #{selectedPolicy.policyNumber}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Provider</p>
                          <p className="text-sm font-medium">{selectedPolicy.provider}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Coverage Type</p>
                          <p className="text-sm font-medium">{selectedPolicy.coverage}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Premium</p>
                          <p className="text-sm font-medium">{selectedPolicy.premium}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p className="text-sm font-medium">{selectedPolicy.startDate}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="text-sm font-medium">{selectedPolicy.expiryDate}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Claims</p>
                          <p className="text-sm font-medium">{selectedPolicy.claims}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Coverage Details</h4>
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm">Third Party Liability: Up to $1,000,000</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm">Vehicle Damage: Covered with $500 deductible</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm">Theft Protection: Full vehicle value</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm">Natural Disasters: Covered</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm">Roadside Assistance: Included</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      File a Claim
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Download Policy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Dialog
                    open={isApplyDialogOpen && selectedVehicle === vehicle.id.toString()}
                    onOpenChange={(open) => {
                      setIsApplyDialogOpen(open)
                      if (!open) {
                        setIsSuccess(false)
                        setSelectedProvider(null)
                        setSelectedPlan("")
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedVehicle(vehicle.id.toString())
                          setIsApplyDialogOpen(true)
                        }}
                      >
                        Get Insurance
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Apply for Insurance</DialogTitle>
                        <DialogDescription>
                          Protect your vehicle NFT with blockchain-verified insurance
                        </DialogDescription>
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
                            <Label>Select Insurance Provider</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {insuranceProviders.map((provider) => (
                                <div
                                  key={provider.id}
                                  className={`border rounded-md p-3 cursor-pointer transition-colors ${
                                    selectedProvider === provider.id
                                      ? "border-primary bg-primary/5"
                                      : "hover:border-primary/50"
                                  }`}
                                  onClick={() => {
                                    setSelectedProvider(provider.id)
                                    setSelectedPlan("")
                                  }}
                                >
                                  <p className="font-medium">{provider.name}</p>
                                  <p className="text-xs text-muted-foreground">{provider.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {selectedProvider !== null && (
                            <div className="space-y-2">
                              <Label>Select Coverage Plan</Label>
                              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                                <div className="space-y-3">
                                  {getSelectedProviderPlans().map((plan) => (
                                    <div
                                      key={plan.id}
                                      className={`flex items-start space-x-3 border rounded-md p-3 ${
                                        selectedPlan === plan.id ? "border-primary bg-primary/5" : ""
                                      }`}
                                    >
                                      <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                                      <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                                        <div className="flex justify-between">
                                          <p className="font-medium">{plan.name}</p>
                                          <p className="font-medium">{plan.premium}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{plan.description}</p>
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          )}

                          {selectedPlan && (
                            <Alert variant="outline" className="bg-primary/5 border-primary/20">
                              <Shield className="h-4 w-4 text-primary" />
                              <AlertTitle>Coverage Summary</AlertTitle>
                              <AlertDescription className="text-xs">
                                <p className="mb-1">
                                  You've selected {getSelectedPlanDetails()?.name} from{" "}
                                  {insuranceProviders.find((p) => p.id === selectedProvider)?.name}.
                                </p>
                                <p>
                                  Premium: {getSelectedPlanDetails()?.premium} with coverage starting immediately upon
                                  approval.
                                </p>
                              </AlertDescription>
                            </Alert>
                          )}

                          <Button
                            className="w-full"
                            onClick={handleApplyForInsurance}
                            disabled={isSubmitting || !selectedPlan}
                          >
                            {isSubmitting ? (
                              <>
                                <Clock className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>Apply for Insurance</>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="py-6 text-center space-y-4">
                          <div className="bg-green-50 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold">Insurance Approved!</h3>
                          <p className="text-muted-foreground">
                            Your insurance application has been approved. Your vehicle NFT is now protected.
                          </p>
                          <div className="bg-muted p-4 rounded-lg text-left">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <p className="font-medium">Policy Details</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="text-muted-foreground">Policy Number:</p>
                              <p>INS-2023-{Math.floor(10000 + Math.random() * 90000)}</p>
                              <p className="text-muted-foreground">Coverage:</p>
                              <p>{getSelectedPlanDetails()?.name}</p>
                              <p className="text-muted-foreground">Premium:</p>
                              <p>{getSelectedPlanDetails()?.premium}</p>
                              <p className="text-muted-foreground">Start Date:</p>
                              <p>{new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4"
                            onClick={() => {
                              setIsApplyDialogOpen(false)
                              setIsSuccess(false)
                              document.querySelector('[data-value="policies"]')?.click()
                            }}
                          >
                            View My Policies
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

