const items = [
  '🌾 Imported Rice',
  '🍅 Tomato Paste',
  '☕ Coffee Beans',
  '🧀 Cheese & Dairy',
  '🍯 Premium Honey',
  '🐟 Frozen Fish',
  '🫒 Olives',
  '🥛 Milk Powder',
  '🍓 Jam',
  '🤝 Troina — Dubai',
  '🌍 York Agro — Turkey',
  '🏭 Canon Dairy — Iraq',
  '🏢 Oxide Co — Iraq',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="bg-gradient-to-r from-yellow-950/80 via-yellow-900/60 to-yellow-950/80 border-y border-yellow-600/30 py-3 overflow-hidden">
      <div className="animate-ticker gap-12 flex">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-yellow-300 text-sm font-medium px-6">
            {item}
            <span className="text-yellow-600">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
