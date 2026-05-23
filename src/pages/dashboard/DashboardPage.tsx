
export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Zivaro dashboard overview.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-6 rounded-xl space-y-2">
            <h3 className="font-semibold text-lg">Metric {i}</h3>
            <p className="text-2xl font-bold text-primary">0.00</p>
          </div>
        ))}
      </div>
    </div>
  )
}
