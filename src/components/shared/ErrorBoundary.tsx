import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/components/shared/ErrorStates'
import { logger } from '@/lib/logger'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught render error:', error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null })
    // Reload the page to recover fresh state
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-card border border-border shadow-2xl rounded-[2.2rem] p-8 sm:p-10 relative overflow-hidden">
            {/* Ambient subtle glow accent */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-destructive/10 to-transparent pointer-events-none" />
            
            <ErrorState
              title="Application Encountered a Glitch"
              message={
                this.state.error?.message ||
                "An unexpected rendering error occurred. Our team has been notified. Let's get you back on track."
              }
              onRetry={this.handleRetry}
            />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
