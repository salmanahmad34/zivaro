/**
 * HustiQ Platform Unified Analytics Service
 * 
 * Vendor-neutral event pipeline, extremely scalable and prepared to integrate
 * with Amplitude, Mixpanel, Google Analytics, or Segment in production.
 * 
 * In development mode, prints styled telemetry payloads in console logs.
 */

const IS_DEV = import.meta.env.DEV || true

// Generic Event Dispatcher
const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString()
  const payload = { eventName, properties, timestamp }

  // Console Telemetry Log for development audit
  if (IS_DEV) {
    console.log(
      `%c[Telemetry: ${eventName}]`,
      'color: #3b82f6; font-weight: bold; background-color: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px;',
      properties
    )
  }

  // Future integration points:
  // window.mixpanel?.track(eventName, properties);
  // window.gtag?.('event', eventName, properties);
  // window.amplitude?.track(eventName, properties);
  
  // Save in local storage buffer for debugging
  try {
    const buffer = localStorage.getItem('zivaro_telemetry_events') || '[]'
    const eventList = JSON.parse(buffer)
    eventList.push(payload)
    // Cap buffer at 100 items to avoid bloating storage
    if (eventList.length > 100) eventList.shift()
    localStorage.setItem('zivaro_telemetry_events', JSON.stringify(eventList))
  } catch (err) {
    console.warn('Telemetry buffering failed:', err)
  }
}

// ============================================
// 1. SIGNUP FUNNEL EVENTS
// ============================================
export const trackSignupStarted = () => {
  trackEvent('signup_started')
}

export const trackSignupCompleted = (userId: string, role: 'student' | 'provider', name: string) => {
  trackEvent('signup_completed', { userId, role, name })
}

// ============================================
// 2. APPLICATIONS EVENTS
// ============================================
export const trackJobApplicationStarted = (jobId: string, jobTitle: string) => {
  trackEvent('application_started', { jobId, jobTitle })
}

export const trackJobApplicationSubmitted = (
  jobId: string, 
  jobTitle: string, 
  studentId: string,
  payout: number,
  payoutType: string
) => {
  trackEvent('application_submitted', { jobId, jobTitle, studentId, payout, payoutType })
}

// ============================================
// 3. JOB POSTINGS EVENTS
// ============================================
export const trackJobPostingStarted = () => {
  trackEvent('job_posting_started')
}

export const trackJobPostingCompleted = (
  jobId: string, 
  title: string, 
  providerId: string,
  payout: number,
  payoutType: string
) => {
  trackEvent('job_posting_completed', { jobId, title, providerId, payout, payoutType })
}

// ============================================
// 4. USER ENGAGEMENT EVENTS
// ============================================
export const trackUserEngagement = (actionType: string, details: Record<string, any> = {}) => {
  trackEvent('user_engagement', { actionType, ...details })
}

export const trackFeedbackSubmitted = (feedbackType: 'sentiment' | 'feature' | 'bug') => {
  trackEvent('feedback_submitted', { feedbackType })
}

export const trackNavigation = (pageName: string) => {
  trackEvent('page_viewed', { pageName })
}
