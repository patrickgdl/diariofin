import { useEffect, useState } from "react"
import { cn } from "@diariofin/ui/utils"

export function BlurImage(props: any) {
  const [loading, setLoading] = useState(true)
  const [src, setSrc] = useState(props.src)
  useEffect(() => setSrc(props.src), [props.src]) // update the `src` value when the `prop.src` value changes

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false)
    const target = e.target as HTMLImageElement
    if (target.naturalWidth < 20 && target.naturalHeight < 20) {
      setSrc(`https://avatar.vercel.sh/${encodeURIComponent(props.alt)}`)
    }
  }

  return (
    <img
      {...props}
      src={src}
      alt={props.alt}
      className={cn(loading ? "blur-[2px]" : "blur-0", props.className)}
      onLoad={handleLoad}
      onError={() => {
        setSrc(`https://avatar.vercel.sh/${encodeURIComponent(props.alt)}`) // if the image fails to load, use the default avatar
      }}
    />
  )
}
