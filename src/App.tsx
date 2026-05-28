import { AppRouter } from '@/routes/AppRouter'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
