"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Upload, Check, Loader2, AlertCircle, BarChart3 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ValuationResult from "@/components/valuation-result"

const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Nissan", "Hyundai"]

export default function MintingForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isValuationComplete, setIsValuationComplete] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [isMintComplete, setIsMintComplete] = useState(false)
  const [mintError, setMintError] = useState(false)

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    vin: "",
    previousOwners: "",
    maintenanceHistory: "",
  })

  const [valuationData, setValuationData] = useState({
    predictedPrice: "$32,500",
    confidenceScore: 91,
    factors: [
      { name: "Make & Model", value: 35 },
      { name: "Year", value: 25 },
      { name: "Mileage", value: 20 },
      { name: "Condition", value: 15 },
      { name: "Market Trends", value: 5 },
    ],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      setIsLoading(true)
      // Simulate API call for valuation
      setTimeout(() => {
        setIsLoading(false)
        setIsValuationComplete(true)
        setStep(2)
      }, 2000)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  const handleMint = () => {
    setIsMinting(true)
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false)
      // 90% chance of success, 10% chance of error for demo purposes
      if (Math.random() > 0.1) {
        setIsMintComplete(true)
      } else {
        setMintError(true)
      }
    }, 3000)
  }

  const handleRetry = () => {
    setMintError(false)
    setIsMinting(true)
    // Always succeed on retry
    setTimeout(() => {
      setIsMinting(false)
      setIsMintComplete(true)
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">
              Step {step} of 3: {step === 1 ? "Vehicle Information" : step === 2 ? "AI Valuation" : "NFT Minting"}
            </div>
            <div className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% Complete</div>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select value={formData.make} onValueChange={(value) => handleSelectChange("make", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g. Camry, Model 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="e.g. 45,000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleSelectChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="plugin_hybrid">Plug-in Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN/Plate Number</Label>
                <Input
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="Vehicle Identification Number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousOwners">Previous Owners (Optional)</Label>
              <Input
                id="previousOwners"
                name="previousOwners"
                value={formData.previousOwners}
                onChange={handleInputChange}
                placeholder="Number of previous owners"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenanceHistory">Maintenance History (Optional)</Label>
              <Textarea
                id="maintenanceHistory"
                name="maintenanceHistory"
                value={formData.maintenanceHistory}
                onChange={handleInputChange}
                placeholder="Brief description of maintenance history"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Vehicle Images</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop your vehicle images here</p>
                <p className="text-xs text-muted-foreground mb-4">PNG, JPG or WEBP (max. 5MB each)</p>
                <Button variant="outline" size="sm">
                  Select Files
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} disabled={!formData.make || !formData.model || !formData.year}>
                Continue to Valuation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-medium mb-2">Processing Valuation</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Our AI is analyzing your vehicle details and comparing with market data to provide an accurate
                  valuation.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Valuation Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your vehicle details and current market conditions
                  </p>
                </div>

                <ValuationResult data={valuationData} />

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext}>
                    Continue to Minting <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">NFT Minting</h3>
              <p className="text-sm text-muted-foreground">
                Create a unique digital asset representing your vehicle on the blockchain
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg mb-6">
              <h4 className="font-medium mb-4">Vehicle Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Make & Model</p>
                  <p className="font-medium">
                    {formData.make} {formData.model}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Year</p>
                  <p className="font-medium">{formData.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mileage</p>
                  <p className="font-medium">{formData.mileage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">VIN</p>
                  <p className="font-medium">{formData.vin}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">AI Valuation</p>
                  <p className="font-medium">{valuationData.predictedPrice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence Score</p>
                  <p className="font-medium">{valuationData.confidenceScore}%</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard Minting</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="p-4 border rounded-lg mt-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Standard minting creates your vehicle NFT with the information provided above.
                </p>
                {!isMintComplete && !mintError ? (
                  <Button className="w-full" onClick={handleMint} disabled={isMinting}>
                    {isMinting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Minting in Progress...
                      </>
                    ) : (
                      <>Mint Vehicle NFT</>
                    )}
                  </Button>
                ) : mintError ? (
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Minting Failed</AlertTitle>
                      <AlertDescription>There was an error while minting your NFT. Please try again.</AlertDescription>
                    </Alert>
                    <Button className="w-full" onClick={handleRetry} variant="outline">
                      Retry Minting
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-green-500 text-green-500">
                      <Check className="h-4 w-4" />
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>Your vehicle has been successfully minted as an NFT.</AlertDescription>
                    </Alert>
                    <Button className="w-full" variant="default" onClick={() => (window.location.href = "/garage")}>
                      View in My Garage
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="advanced" className="p-4 border rounded-lg mt-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced options allow you to customize metadata and other NFT properties.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="royalties">Royalties (%)</Label>
                    <Input id="royalties" placeholder="e.g. 2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalMetadata">Additional Metadata</Label>
                    <Textarea
                      id="additionalMetadata"
                      placeholder="Add any additional information to be stored with your NFT"
                      rows={3}
                    />
                  </div>
                  <Button className="w-full" disabled={isMinting}>
                    Mint with Advanced Options
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {!isMintComplete && !mintError && (
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleBack} disabled={isMinting}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

