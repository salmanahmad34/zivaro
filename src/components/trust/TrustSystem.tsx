/**
 * Zivaro Trust System — Reusable verification, trust, and reliability components.
 *
 * All components are future backend-ready. Pass `isVerified`, `trustScore`, etc.
 * from Supabase user metadata when the auth layer is connected.
 */

import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, Star, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// 1. VERIFIED EMPLOYER BADGE  (used on Job Cards + Provider Profile)
// ─────────────────────────────────────────────
interface VerifiedEmployerBadgeProps {
  className?: string
  /** Show full label or just icon */
  compact?: boolean
}

export const VerifiedEmployerBadge = ({ className, compact = false }: VerifiedEmployerBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    className={cn(
      'inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full font-bold tracking-wide',
      compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs',
      className
    )}
  >
    <ShieldCheck className={cn('shrink-0', compact ? 'w-3 h-3' : 'w-3.5 h-3.5')} />
    {!compact && 'Verified Employer'}
  </motion.div>
)

// ─────────────────────────────────────────────
// 2. VERIFIED STUDENT BADGE  (used on Student Profile)
// ─────────────────────────────────────────────
interface VerifiedStudentBadgeProps {
  className?: string
  compact?: boolean
}

export const VerifiedStudentBadge = ({ className, compact = false }: VerifiedStudentBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    className={cn(
      'inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full font-bold tracking-wide',
      compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs',
      className
    )}
  >
    <BadgeCheck className={cn('shrink-0', compact ? 'w-3 h-3' : 'w-3.5 h-3.5')} />
    {!compact && 'Verified Student'}
  </motion.div>
)

// ─────────────────────────────────────────────
// 3. TRUST SCORE CHIP  (future backend: 0–100 score)
// ─────────────────────────────────────────────
interface TrustScoreChipProps {
  /** 0–100 placeholder score. Leave undefined for "pending". */
  score?: number
  className?: string
}

export const TrustScoreChip = ({ score, className }: TrustScoreChipProps) => {
  const isPending = score === undefined
  const tier = !isPending
    ? score >= 80 ? 'high' : score >= 50 ? 'mid' : 'low'
    : 'pending'

  const tierStyles = {
    high: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    mid: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    low: 'bg-destructive/10 border-destructive/20 text-destructive',
    pending: 'bg-muted/50 border-border text-muted-foreground',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide',
        tierStyles[tier],
        className
      )}
    >
      <Star className="w-3 h-3 shrink-0" />
      {isPending ? 'Trust: Pending' : `Trust ${score}`}
    </div>
  )
}

// ─────────────────────────────────────────────
// 4. RESPONSE RATE CHIP  (provider responsiveness indicator)
// ─────────────────────────────────────────────
interface ResponseRateChipProps {
  /** e.g. 95 = "95% response rate". Undefined = "Gathering data". */
  rate?: number
  className?: string
}

export const ResponseRateChip = ({ rate, className }: ResponseRateChipProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border',
      rate !== undefined && rate >= 80
        ? 'bg-primary/5 border-primary/20 text-primary'
        : 'bg-muted/50 border-border text-muted-foreground',
      className
    )}
  >
    <TrendingUp className="w-3 h-3 shrink-0" />
    {rate !== undefined ? `${rate}% Response` : 'Gathering data'}
  </div>
)

// ─────────────────────────────────────────────
// 5. COMPLETED JOBS COUNT  (student reliability signal)
// ─────────────────────────────────────────────
interface CompletedJobsChipProps {
  count: number
  className?: string
}

export const CompletedJobsChip = ({ count, className }: CompletedJobsChipProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border bg-primary/5 border-primary/20 text-primary',
      className
    )}
  >
    <CheckCircle2 className="w-3 h-3 shrink-0" />
    {count} Job{count !== 1 ? 's' : ''} Completed
  </div>
)

// ─────────────────────────────────────────────
// 6. SAFE PAYOUT INDICATOR  (job card footer trust signal)
// ─────────────────────────────────────────────
interface SafePayoutIndicatorProps {
  className?: string
}

export const SafePayoutIndicator = ({ className }: SafePayoutIndicatorProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400',
      className
    )}
  >
    <ShieldCheck className="w-3 h-3 shrink-0" />
    Guaranteed Payout
  </div>
)

// ─────────────────────────────────────────────
// 7. HIRING RELIABILITY CHIP  (provider reliability signal)
// ─────────────────────────────────────────────
type ReliabilityLevel = 'high' | 'medium' | 'new'

interface HiringReliabilityChipProps {
  level?: ReliabilityLevel
  className?: string
}

export const HiringReliabilityChip = ({ level = 'new', className }: HiringReliabilityChipProps) => {
  const config: Record<ReliabilityLevel, { label: string; icon: typeof Clock; style: string }> = {
    high: {
      label: 'Highly Reliable',
      icon: TrendingUp,
      style: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    },
    medium: {
      label: 'Reliable Employer',
      icon: Clock,
      style: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    },
    new: {
      label: 'New Employer',
      icon: AlertCircle,
      style: 'bg-muted/50 border-border text-muted-foreground',
    },
  }
  const { label, icon: Icon, style } = config[level]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border',
        style,
        className
      )}
    >
      <Icon className="w-3 h-3 shrink-0" />
      {label}
    </div>
  )
}

// ─────────────────────────────────────────────
// 8. TRUST BANNER  (full-width trust summary row for profile pages)
// ─────────────────────────────────────────────
interface TrustBannerProps {
  role: 'student' | 'provider'
  isVerified?: boolean
  trustScore?: number
  responseRate?: number
  completedJobs?: number
  reliabilityLevel?: ReliabilityLevel
  className?: string
}

export const TrustBanner = ({
  role,
  isVerified = false,
  trustScore,
  responseRate,
  completedJobs = 0,
  reliabilityLevel = 'new',
  className,
}: TrustBannerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.15 }}
    className={cn(
      'flex flex-wrap items-center gap-2',
      className
    )}
  >
    {isVerified && role === 'provider' && <VerifiedEmployerBadge />}
    {isVerified && role === 'student' && <VerifiedStudentBadge />}
    <TrustScoreChip score={trustScore} />
    {role === 'provider' && <ResponseRateChip rate={responseRate} />}
    {role === 'provider' && <HiringReliabilityChip level={reliabilityLevel} />}
    {role === 'student' && <CompletedJobsChip count={completedJobs} />}
  </motion.div>
)
