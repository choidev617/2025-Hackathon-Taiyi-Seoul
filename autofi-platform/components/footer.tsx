import Link from "next/link"
import { Wallet } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            FAQ
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Docs
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">AutoFi</span>
          </div>
          <p className="mt-2 text-center text-xs leading-5 text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} AutoFi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

