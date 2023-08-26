import React from "react"

interface Props {
  children: React.ReactNode
  fetchData: () => void
  hasMore: boolean
}

function InfiniteScrolling({ children, fetchData, hasMore }: Props) {
  const lastElementRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    let observer: IntersectionObserver
    if (hasMore) {
      if (lastElementRef.current) {
        observer = new IntersectionObserver((entries) => {
          const first = entries[0]
          if (first.isIntersecting) {
            if (hasMore) {
              fetchData()
            }
          }
        })

        observer.observe(lastElementRef.current)
      }
    }

    return () => {
      if (observer && lastElementRef.current) {
        observer.unobserve(lastElementRef.current)
      }
    }
  }, [lastElementRef, fetchData, hasMore])

  return (
    <div>
      {children}
      <div ref={lastElementRef}></div>
    </div>
  )
}

export default InfiniteScrolling
