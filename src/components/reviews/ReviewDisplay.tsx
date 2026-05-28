/**
 * HustiQ Reviews UI — Display components for individual reviews and
 * reputation summary sections on Profile pages.
 */

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReviews, type Review, type ReviewTag } from '@/store/useReviews'

const springTransition = { type: 'spring' as const, stiffness: 400, damping: 30 }

// ─────────────────────────────────────────────
// StarDisplay — compact read-only stars
// ─────────────────────────────────────────────
const StarDisplay = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={cn(
          'shrink-0',
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5',
          n <= Math.round(rating)
            ? 'text-amber-400 fill-amber-400'
            : 'text-muted-foreground/20'
        )}
      />
    ))}
  </div>
)

// ─────────────────────────────────────────────
// ReviewCard — single review display
// ─────────────────────────────────────────────
interface ReviewCardProps {
  review: Review
  className?: string
}

export const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const timeAgo = (() => {
    const diff = Date.now() - review.createdAt
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  })()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className={cn(
        'relative bg-card border border-border/40 rounded-2xl p-5 space-y-3 overflow-hidden shadow-sm hover:shadow-md hover:border-border/70 transition-all',
        className
      )}
    >
      {/* Subtle quote decoration */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/5 rotate-180" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-sm font-bold text-foreground shrink-0">
          {review.reviewerAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground leading-tight truncate">
            {review.reviewerName}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">{review.jobTitle} · {timeAgo}</p>
        </div>
        <StarDisplay rating={review.rating} />
      </div>

      {/* Tags */}
      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Note */}
      {review.note && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          "{review.note}"
        </p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ReputationSummary — full reputation block for Profile pages
// ─────────────────────────────────────────────
interface ReputationSummaryProps {
  subjectId: string
  /** Heading to show above the block */
  title?: string
  /** How many reviews to render */
  maxReviews?: number
  /** Show write-review CTA button */
  onWriteReview?: () => void
  className?: string
}

export const ReputationSummary = ({
  subjectId,
  title = 'Reviews & Reputation',
  maxReviews = 3,
  onWriteReview,
  className,
}: ReputationSummaryProps) => {
  const { getReviewsFor, getAverageRating, getTopTags } = useReviews()
  const reviews = getReviewsFor(subjectId)
  const avg = getAverageRating(subjectId)
  const topTags = getTopTags(subjectId, 4)
  const displayedReviews = reviews.slice(0, maxReviews)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.12 }}
      className={cn('glass-card rounded-2xl shadow-soft-lg overflow-hidden', className)}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-muted/10 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {reviews.length === 0
              ? 'No reviews yet — complete a job to earn your first one.'
              : `${reviews.length} review${reviews.length !== 1 ? 's' : ''} from real gigs`}
          </p>
        </div>
        {onWriteReview && (
          <button
            onClick={onWriteReview}
            className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
          >
            + Review
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {reviews.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center py-8 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
              <Star className="w-7 h-7 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Reviews appear here once you complete your first gig on HustiQ.
            </p>
          </div>
        ) : (
          <>
            {/* Rating summary bar */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
              <div className="text-center">
                <p className="text-4xl font-black text-foreground tracking-tighter">{avg.toFixed(1)}</p>
                <StarDisplay rating={avg} size="md" />
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
              {topTags.length > 0 && (
                <div className="flex-1 space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Most Mentioned</p>
                  <div className="flex flex-wrap gap-1.5">
                    {topTags.map((tag: ReviewTag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Review cards */}
            <div className="space-y-3">
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {reviews.length > maxReviews && (
                <p className="text-center text-xs text-muted-foreground pt-1">
                  +{reviews.length - maxReviews} more review{reviews.length - maxReviews !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
