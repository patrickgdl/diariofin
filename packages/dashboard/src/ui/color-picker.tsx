export function ColorPicker({ color, setColor }: { color: string; setColor: (background: string) => void }) {
  const solids = ["#6B7280", "#ff75c3", "#ffa647", "#FBBF24", "#34D399", "#70e2ff", "#cd93ff", "#f87171"]

  return (
    <div className="flex flex-wrap gap-1 mt-0">
      {solids.map((solid) => (
        <div
          key={solid}
          style={{ background: solid }}
          className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
          onClick={() => setColor(solid)}
        />
      ))}
    </div>
  )
}
