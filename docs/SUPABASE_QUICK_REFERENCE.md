# Supabase Integration Quick Reference

## 📚 File Structure

```
src/
├── services/supabase/
│   ├── supabaseClient.ts      # Client initialization
│   ├── auth.ts                # Authentication functions
│   └── db.ts                  # Database CRUD operations
├── store/
│   ├── useAuth.ts             # Auth state (login, logout, session)
│   ├── useJobs.ts             # Jobs feed state
│   ├── useApplications.ts      # Applications state
│   ├── useSavedJobs.ts        # Bookmarks state
│   ├── useMessages.ts         # Messaging state
│   ├── useNotifications.ts    # Notifications state
│   └── useReviews.ts          # Reviews state
├── types/
│   ├── database.ts            # Database models
│   └── supabase.ts            # Supabase generated types
├── components/shared/
│   ├── LoadingSkeletons.tsx    # Loading placeholders
│   ├── ErrorStates.tsx         # Error UI
│   └── SessionErrorRecovery.tsx# Auth error handling
└── routes/
    ├── AppRouter.tsx          # Main router
    ├── ProtectedRoute.tsx      # Auth-protected routes (with session recovery)
    └── PublicRoute.tsx         # Public routes (login, signup, landing)
```

## 🔐 Authentication

### User Signup
```typescript
const { signup } = useAuth()
await signup(email, password, name, 'student' | 'provider')
```

### User Login
```typescript
const { login } = useAuth()
await login(email, password)
```

### User Logout
```typescript
const { logout } = useAuth()
await logout()
```

### Check Auth Status
```typescript
const { isAuthenticated, user } = useAuth()
// user: { id, email, name, role, onboarding_completed, metadata }
```

### Access User Data
```typescript
const { user } = useAuth()
console.log(user.role)  // 'student' | 'provider'
console.log(user.onboarding_completed)
```

## 📊 Database Operations

### Jobs
```typescript
// Fetch all jobs
const { jobs } = useJobs()
await fetchJobs()

// Get provider's jobs
await fetchProviderJobs(providerId)

// Create new job
const job = await createJob({ title, business_name, payout, ... })

// Update job
const updated = await updateJob(jobId, { title, payout, ... })

// Delete job
await deleteJob(jobId)
```

### Applications
```typescript
// Get student applications
const { applications } = useApplications()
await fetchStudentApplications(studentId)

// Get incoming applications (for provider)
await fetchProviderApplications(providerId)

// Submit application
await submitApplication({
  job_id: jobId,
  student_id: studentId,
  note: "I'm interested..."
})

// Update status
await updateApplicationStatus(appId, { status: 'accepted' })

// Check if already applied
const exists = await checkApplicationExists(jobId, studentId)
```

### Saved Jobs
```typescript
// Get saved jobs
const { savedJobs } = useSavedJobs()
await fetchSavedJobs(studentId)

// Save a job
await saveJob({ student_id: studentId, job_id: jobId })

// Unsave a job
await unsaveJob(jobId, studentId)

// Check if saved
const isSaved = await isJobSaved(jobId, studentId)
```

### Messages
```typescript
// Get conversation
const { messages } = useMessages()
await fetchConversation(userId, recipientId)

// Get all conversations
await fetchConversations(userId)

// Send message
await sendMessage({
  sender_id: userId,
  recipient_id: recipientId,
  content: "Hello!"
})

// Mark as read
await markMessageAsRead(messageId)
```

### Notifications
```typescript
// Get notifications
const { notifications } = useNotificationsStore()
await fetchNotifications(userId)

// Create notification
await createNotification({
  user_id: userId,
  type: 'application_update',
  title: 'New Application',
  content: 'You received a new application'
})

// Mark as read
await markAsRead(notificationId)

// Delete
await deleteNotification(notificationId)
```

### Reviews
```typescript
// Get reviews for a user
const { reviews } = useReviewsStore()
await fetchUserReviews(userId)

// Submit review
await submitReview({
  reviewer_id: reviewerId,
  reviewee_id: revieweeId,
  rating: 5,
  tags: ['reliable', 'professional'],
  comment: "Great work!"
})

// Get average rating
await fetchAverageRating(userId)
```

## 🎨 UI Components

### Loading States
```typescript
import { SkeletonJobCard, SkeletonFeed } from '@/components/shared/LoadingSkeletons'

// Show while loading
{isLoading ? <SkeletonFeed /> : <JobsList />}
```

### Error States
```typescript
import { ErrorState, ErrorBanner } from '@/components/shared/ErrorStates'

// Display error with retry
<ErrorState 
  message={error} 
  onRetry={refetch}
/>

// Dismissible error banner
<ErrorBanner 
  message={error}
  onDismiss={() => clearError()}
/>
```

### Session Recovery
```typescript
// Automatically handled in ProtectedRoute
// Shows loading screen while recovering session
```

## 🛡️ Error Handling

### Try-Catch Pattern
```typescript
try {
  await login(email, password)
} catch (error) {
  const { error: authError } = useAuth()
  console.error(authError)
}
```

### Check Supabase Connection
```typescript
import { isSupabaseConfigured } from '@/services/supabase/supabaseClient'

if (!isSupabaseConfigured()) {
  console.error('Supabase not configured!')
}
```

## 📱 Role-Based Logic

### In Components
```typescript
const { user } = useAuth()

if (user?.role === 'provider') {
  return <ProviderDashboard />
} else {
  return <StudentDashboard />
}
```

### Automatic Routing
- Students automatically redirected to `/dashboard` (Student Dashboard)
- Providers automatically redirected to `/dashboard` (Provider Dashboard)
- Both use same route, different components loaded by `DashboardIndex`

## 🔄 Session Management

### Session Recovery (Automatic)
```typescript
// Happens automatically in ProtectedRoute
// On page reload, session is restored from localStorage
```

### Refresh Profile
```typescript
const { refreshProfile } = useAuth()
await refreshProfile()  // Syncs from database
```

### Update Profile
```typescript
const { updateUserProfile } = useAuth()
await updateUserProfile({
  name: 'New Name',
  metadata: { avatar: 'url' }
})
```

## 🧪 Testing

### Check If User is Logged In
```typescript
const { isAuthenticated, isRecovering } = useAuth()

if (isRecovering) return <LoadingScreen />
if (!isAuthenticated) return <RedirectToLogin />
```

### Verify Database Connection
```javascript
// In browser console:
const { data, error } = await supabase
  .from('profiles')
  .select('count(*)', { count: 'exact' })
  
console.log(data)  // Should show count
console.log(error) // Should be null
```

### Monitor Auth State
```typescript
useEffect(() => {
  const { user, isAuthenticated, error } = useAuth.getState()
  console.log({ user, isAuthenticated, error })
}, [])
```

## 📋 Common Tasks

### Check if User Can Post Jobs
```typescript
const { user } = useAuth()
const canPostJobs = user?.role === 'provider'
```

### Disable Apply Button if Already Applied
```typescript
const applied = await checkApplicationExists(jobId, studentId)
<button disabled={applied}>
  {applied ? 'Already Applied' : 'Apply Now'}
</button>
```

### Show User's Own Profile
```typescript
const { user } = useAuth()
const profile = await getProfile(user.id)
console.log(profile.metadata)  // Custom data
```

### Mark All Notifications as Read
```typescript
const { notifications } = useNotificationsStore()
const unread = notifications.filter(n => !n.is_read)
for (const notif of unread) {
  await markAsRead(notif.id)
}
```

## 🚀 Performance Tips

1. **Cache Jobs**: Jobs list caches for 5 minutes
   ```typescript
   // Use forceRefresh to bypass cache
   await fetchJobs(true)
   ```

2. **Use Memoization**:
   ```typescript
   const filteredJobs = useMemo(
     () => jobs.filter(j => j.is_premium),
     [jobs]
   )
   ```

3. **Lazy Load Images**:
   ```typescript
   <img loading="lazy" src={job.logo} />
   ```

4. **Paginate Large Lists** (Future):
   ```typescript
   // Implement offset/limit for many jobs
   await fetchJobs(limit: 20, offset: 0)
   ```

## 📞 Support

- Check [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) for detailed docs
- See [AI_RULES.md](./AI_RULES.md) for coding standards
- Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture
