
export const MessagesPage = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with your network.</p>
      </div>
      <div className="glass-card flex-1 rounded-xl flex items-center justify-center text-muted-foreground">
        Select a conversation to start messaging
      </div>
    </div>
  )
}
