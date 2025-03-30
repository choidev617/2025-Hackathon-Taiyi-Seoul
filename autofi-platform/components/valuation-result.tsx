"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ValuationFactor {
  name: string
  value: number
}

interface ValuationResultProps {
  data: {
    predictedPrice: string
    confidenceScore: number
    factors: ValuationFactor[]
  }
}

export default function ValuationResult({ data }: ValuationResultProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Predicted Market Value</p>
            <p className="text-4xl font-bold text-primary">{data.predictedPrice}</p>
            <div className="flex items-center justify-center mt-4">
              <div className="bg-primary/10 text-primary text-sm font-medium rounded-full px-3 py-1">
                {data.confidenceScore}% Confidence
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Valuation Factors</h4>
          <div className="space-y-4">
            {data.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{factor.name}</span>
                  <span className="text-sm font-medium">{factor.value}%</span>
                </div>
                <Progress value={factor.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

