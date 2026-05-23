
export const LoginPage = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="h-10 bg-secondary rounded-md w-full animate-pulse"></div>
        <div className="h-10 bg-secondary rounded-md w-full animate-pulse"></div>
        <button className="h-10 bg-primary text-primary-foreground rounded-md w-full font-medium">
          Sign In
        </button>
      </div>
    </div>
  )
}
