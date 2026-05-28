/**
 * Loading Skeleton Components
 * Used to provide visual feedback while data is loading
 */

export const SkeletonCard = () => {
  return (
    <div className="p-4 rounded-2xl bg-muted animate-pulse">
      <div className="h-4 bg-muted-foreground/20 rounded mb-2 w-3/4" />
      <div className="h-4 bg-muted-foreground/20 rounded mb-2 w-1/2" />
      <div className="h-4 bg-muted-foreground/20 rounded w-2/3" />
    </div>
  )
}

export const SkeletonJobCard = () => {
  return (
    <div className="p-4 rounded-2xl bg-muted border border-border/50 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-muted-foreground/20" />
        <div className="flex-1">
          <div className="h-4 bg-muted-foreground/20 rounded mb-2 w-3/4" />
          <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-muted-foreground/20 rounded mb-3 w-full" />
      <div className="flex justify-between">
        <div className="h-3 bg-muted-foreground/20 rounded w-1/4" />
        <div className="h-3 bg-muted-foreground/20 rounded w-1/4" />
      </div>
    </div>
  )
}

export const SkeletonFeed = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonJobCard key={i} />
      ))}
    </div>
  )
}

export const SkeletonListItem = () => {
  return (
    <div className="p-3 rounded-lg bg-muted animate-pulse">
      <div className="h-4 bg-muted-foreground/20 rounded mb-2 w-3/4" />
      <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
    </div>
  )
}

export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-2">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 h-10 bg-muted rounded animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
