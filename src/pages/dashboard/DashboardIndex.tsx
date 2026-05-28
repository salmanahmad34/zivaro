import { useAuth } from '@/store/useAuth'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ProviderDashboardPage } from '@/pages/dashboard/ProviderDashboardPage'

export const DashboardIndex = () => {
  const { user } = useAuth()

  // If the user is a provider, route them to the specialized hiring workspace
  if (user?.role === 'provider') {
    return <ProviderDashboardPage />
  }

  // Default to student dashboard
  return <DashboardPage />
}
