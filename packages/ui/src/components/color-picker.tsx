export const SOLID_COLORS = ["#ff75c3", "#ffa647", "#FBBF24", "#34D399", "#70e2ff", "#cd93ff", "#f87171"]

export function ColorPicker({ color, setColor }: { color: string; setColor: (background: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1 mt-0">
      {SOLID_COLORS.map((solid) => (
        <div
          key={solid}
          style={{ background: solid, outline: color === solid ? "2px solid #3b82f6" : "none" }}
          className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
          onClick={() => setColor(solid)}
        />
      ))}
    </div>
  )
}
