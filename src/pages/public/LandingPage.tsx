
export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-32 pb-20 px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-center max-w-4xl mb-6">
        The Modern Startup <span className="gradient-text">Platform</span>
      </h1>
      <p className="text-xl text-muted-foreground text-center max-w-2xl mb-12">
        Scalable architecture, premium design, and a robust foundation for your next big idea.
      </p>
      <div className="glass-card w-full max-w-5xl h-96 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground">Product Preview Placeholder</p>
      </div>
    </div>
  )
}
