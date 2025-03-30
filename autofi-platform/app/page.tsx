import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Car, BarChart3, Banknote, RefreshCw, Shield } from "lucide-react"
import RecentActivity from "@/components/recent-activity"
import PartnerLogos from "@/components/partner-logos"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Turn your vehicle into an NFT and unlock financial freedom
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  AutoFi transforms your vehicle into a digital asset, enabling secure loans, seamless trading, and
                  comprehensive insurance—all on the blockchain.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/mint">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <img
                alt="Car with digital overlay"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/placeholder.svg?height=550&width=800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="w-full py-12 md:py-24" id="how-it-works">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How AutoFi Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines blockchain technology with traditional vehicle finance to create a new ecosystem
                of possibilities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Car className="h-8 w-8 text-primary" />
                <CardTitle>NFT Minting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Convert your vehicle into a unique digital asset with verified ownership and specifications.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <CardTitle>AI Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Get an accurate market value for your vehicle using our advanced AI pricing algorithm.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Banknote className="h-8 w-8 text-primary" />
                <CardTitle>DeFi Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Use your vehicle NFT as collateral to access competitive loans with transparent terms.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <RefreshCw className="h-8 w-8 text-primary" />
                <CardTitle>P2P Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Buy and sell vehicle NFTs directly with other users in our secure marketplace.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle>Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Protect your asset with blockchain-verified insurance policies linked to your NFT.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center">
              <CardContent className="pt-6">
                <Link href="/mint">
                  <Button size="lg" className="w-full gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recent Activity</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See the latest NFT mints, loans, and trades happening on the platform.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl mt-12">
            <RecentActivity />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted Partners</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We work with leading companies in automotive, finance, and blockchain industries.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl mt-12">
            <PartnerLogos />
          </div>
        </div>
      </section>
    </div>
  )
}

