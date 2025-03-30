"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Mint NFT", href: "/mint" },
  { name: "My Garage", href: "/garage" },
  { name: "Loans", href: "/loans" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Insurance", href: "/insurance" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const pathname = usePathname()

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  return (
    <header className="bg-background border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AutoFi</span>
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">AutoFi</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6",
                pathname === item.href ? "text-primary font-bold" : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            onClick={handleConnectWallet}
            variant={walletConnected ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            {walletConnected ? "0x7a...3d4f" : "Connect Wallet"}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">AutoFi</span>
                <div className="flex items-center">
                  <Wallet className="h-8 w-8 text-primary" />
                  <span className="ml-2 text-xl font-bold">AutoFi</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                        pathname === item.href ? "text-primary font-bold" : "text-muted-foreground hover:text-primary",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button
                    onClick={handleConnectWallet}
                    variant={walletConnected ? "outline" : "default"}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    {walletConnected ? "0x7a...3d4f" : "Connect Wallet"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

