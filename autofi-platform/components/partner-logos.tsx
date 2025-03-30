export default function PartnerLogos() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
        >
          <img
            src={`/placeholder.svg?height=80&width=180&text=Partner ${i}`}
            alt={`Partner ${i}`}
            className="h-12 object-contain"
          />
        </div>
      ))}
    </div>
  )
}

