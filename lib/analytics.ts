// Analytics helper para tracking SEO y conversiones
// Cuando tengas Google Analytics, añade el ID aquí

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversiones importantes
export const trackEvent = {
  viewedAcceso: () => event({
    action: 'view_acceso_page',
    category: 'Conversion',
    label: 'User viewed access page',
  }),
  
  clickedPremium: () => event({
    action: 'click_premium',
    category: 'Conversion',
    label: 'User clicked premium access',
  }),
  
  clickedWaitlist: () => event({
    action: 'click_waitlist',
    category: 'Conversion',
    label: 'User clicked waitlist',
  }),
  
  completedTypeform: () => event({
    action: 'completed_typeform',
    category: 'Lead',
    label: 'User completed typeform',
  }),
  
  viewedCourse: (courseName: string) => event({
    action: 'view_course',
    category: 'Engagement',
    label: courseName,
  }),
}
