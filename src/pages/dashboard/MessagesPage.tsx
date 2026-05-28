import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { ChatArea, type Conversation } from '@/components/dashboard/ChatArea'
import { cn } from '@/lib/utils'

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    providerName: 'Third Wave Coffee',
    providerAvatar: '☕',
    jobTitle: 'Weekend Barista',
    jobStatus: 'Accepted',
    lastMessage: 'Awesome, see you on Saturday at 8 AM!',
    lastMessageTime: '10m ago',
    isUnread: true,
    isOnline: true,
    messages: [
      { id: 'm1', content: 'Hi Salman, your profile looks great! We would love to have you this weekend.', senderId: 'provider', timestamp: 'Yesterday, 4:00 PM' },
      { id: 'm2', content: 'Thank you! I am available and looking forward to it.', senderId: 'me', timestamp: 'Yesterday, 4:30 PM' },
      { id: 'm3', content: 'Awesome, see you on Saturday at 8 AM! Ask for Rahul when you arrive.', senderId: 'provider', timestamp: '10m ago' }
    ]
  },
  {
    id: 'conv-2',
    providerName: 'Sunburn Arena',
    providerAvatar: '🎟️',
    jobTitle: 'Registration Staff',
    jobStatus: 'Interviewing',
    lastMessage: 'Can you confirm your availability for tomorrow?',
    lastMessageTime: '2h ago',
    isUnread: false,
    isOnline: false,
    messages: [
      { id: 'm4', content: 'We received your application for the VIP registration desk.', senderId: 'provider', timestamp: '2h ago' },
      { id: 'm5', content: 'Can you confirm your availability for tomorrow?', senderId: 'provider', timestamp: '2h ago' }
    ]
  },
  {
    id: 'conv-3',
    providerName: 'Reliance Smart',
    providerAvatar: '📦',
    jobTitle: 'Inventory Assistant',
    jobStatus: 'Applied',
    lastMessage: 'Thanks for applying. We will review your profile shortly.',
    lastMessageTime: '1d ago',
    isUnread: false,
    isOnline: true,
    messages: [
      { id: 'm6', content: 'Thanks for applying. We will review your profile shortly.', senderId: 'provider', timestamp: '1d ago' }
    ]
  }
]

export const MessagesPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Listen for window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeId) || null

  // Mobile layout state: if mobile and active conversation, show chat. Else show sidebar.
  const showSidebar = !isMobile || (isMobile && !activeId)
  const showChat = !isMobile || (isMobile && activeId)

  return (
    <div className="flex h-full w-full overflow-hidden bg-background absolute inset-0 pt-[80px] md:pt-0">
      
      {/* Sidebar (Conversations List) */}
      {showSidebar && (
        <div className="w-full md:w-[350px] lg:w-[400px] h-full flex flex-col shrink-0">
          <div className="p-4 sm:p-6 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-muted/30 border border-border/50 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/60 shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col">
              {MOCK_CONVERSATIONS.map((conv) => {
                const isActive = activeId === conv.id
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveId(conv.id)}
                    className={cn(
                      "flex items-start gap-4 p-4 sm:p-5 w-full text-left transition-all border-b border-border/20 last:border-0 relative group",
                      isActive 
                        ? "bg-muted/50" 
                        : "hover:bg-muted/30"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-chat-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-foreground"
                      />
                    )}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-xl border border-border/50 shadow-sm">
                        {conv.providerAvatar}
                      </div>
                      {conv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex justify-between items-center gap-2">
                        <span className={cn(
                          "font-bold truncate",
                          conv.isUnread ? "text-foreground" : "text-foreground/80"
                        )}>
                          {conv.providerName}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest shrink-0",
                          conv.isUnread ? "text-primary" : "text-muted-foreground/60"
                        )}>
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/80">
                        {conv.jobTitle} • {conv.jobStatus}
                      </div>
                      <p className={cn(
                        "text-sm truncate mt-0.5",
                        conv.isUnread ? "text-foreground font-medium" : "text-muted-foreground/80"
                      )}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.isUnread && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Active Chat Area */}
      {showChat && (
        <div className="flex-1 h-full w-full absolute md:relative inset-0 z-20 md:z-auto bg-background">
          <ChatArea 
            conversation={activeConversation} 
            onBack={() => setActiveId(null)} 
          />
        </div>
      )}

    </div>
  )
}
