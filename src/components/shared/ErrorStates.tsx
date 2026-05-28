/**
 * Error State Components
 * Used to display error messages and recovery options
 */

import { AlertCircle, RotateCw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  isRetrying?: boolean
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
  onRetry,
  isRetrying = false
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6 w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive/80 shadow-inner">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-black text-foreground mb-2 tracking-tight">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground mb-8 max-w-sm leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background font-bold text-sm hover:bg-primary hover:text-primary-foreground hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCw className="w-4 h-4" />
          {isRetrying ? 'Retrying...' : 'Try again'}
        </button>
      )}
    </div>
  )
}

export const ErrorBanner = ({ message, onDismiss }: { message: string; onDismiss?: () => void }) => {
  return (
    <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl text-xs font-semibold leading-relaxed flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs font-bold hover:underline flex-shrink-0"
        >
          Dismiss
        </button>
      )}
    </div>
  )
}

export const EmptyState = ({
  icon: Icon,
  title,
  message,
  action
}: {
  icon?: any
  title: string
  message: string
  action?: { label: string; onClick: () => void }
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && <Icon className="w-12 h-12 text-muted-foreground/40 mb-4" />}
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
