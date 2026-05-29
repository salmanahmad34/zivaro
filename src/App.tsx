import { AppRouter } from '@/routes/AppRouter'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { AuthInitializer } from '@/components/auth/AuthInitializer'

function App() {
  return (
    <ErrorBoundary>
      <AuthInitializer>
        <AppRouter />
      </AuthInitializer>
    </ErrorBoundary>
  )
}

export default App
