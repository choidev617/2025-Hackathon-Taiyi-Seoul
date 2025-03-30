import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Banknote, RefreshCw } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "mint",
    vehicle: "Tesla Model 3",
    year: 2021,
    value: "$42,500",
    time: "2 hours ago",
    user: "0x7a...3d4f",
  },
  {
    id: 2,
    type: "loan",
    vehicle: "BMW X5",
    year: 2020,
    value: "$35,000",
    amount: "$21,000",
    time: "5 hours ago",
    user: "0x3b...9e2c",
  },
  {
    id: 3,
    type: "trade",
    vehicle: "Toyota Camry",
    year: 2019,
    value: "$18,750",
    time: "1 day ago",
    seller: "0x5d...7f1a",
    buyer: "0x9c...2e4b",
  },
  {
    id: 4,
    type: "mint",
    vehicle: "Ford F-150",
    year: 2022,
    value: "$48,900",
    time: "1 day ago",
    user: "0x2f...8c3a",
  },
]

export default function RecentActivity() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {recentActivity.map((activity) => (
        <Card key={activity.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {activity.vehicle} ({activity.year})
            </CardTitle>
            <Badge
              variant={activity.type === "mint" ? "default" : activity.type === "loan" ? "secondary" : "outline"}
              className="flex items-center gap-1"
            >
              {activity.type === "mint" && <Car className="h-3 w-3" />}
              {activity.type === "loan" && <Banknote className="h-3 w-3" />}
              {activity.type === "trade" && <RefreshCw className="h-3 w-3" />}
              {activity.type === "mint" ? "NFT Minted" : activity.type === "loan" ? "Loan Issued" : "NFT Traded"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <div className="flex justify-between py-1">
                <span>Value:</span>
                <span className="font-medium text-foreground">{activity.value}</span>
              </div>
              {activity.type === "loan" && (
                <div className="flex justify-between py-1">
                  <span>Loan Amount:</span>
                  <span className="font-medium text-foreground">{activity.amount}</span>
                </div>
              )}
              {activity.type === "trade" ? (
                <>
                  <div className="flex justify-between py-1">
                    <span>Seller:</span>
                    <span className="font-medium text-foreground">{activity.seller}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Buyer:</span>
                    <span className="font-medium text-foreground">{activity.buyer}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between py-1">
                  <span>User:</span>
                  <span className="font-medium text-foreground">{activity.user}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span>Time:</span>
                <span className="font-medium text-foreground">{activity.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

