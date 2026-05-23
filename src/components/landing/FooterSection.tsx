export const FooterSection = () => {
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center text-center relative z-10 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">FooterSection</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Placeholder for FooterSection content with premium startup styling.
          </p>
        </div>
        <div className="w-full max-w-5xl h-[400px] rounded-3xl glass-card flex items-center justify-center mt-12 border-white/10 shadow-soft-lg">
          <p className="text-muted-foreground font-medium">FooterSection visual area</p>
        </div>
      </div>
    </section>
  )
}
