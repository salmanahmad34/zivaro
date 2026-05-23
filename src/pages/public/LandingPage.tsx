import { HeroSection } from '@/components/landing/HeroSection'
import { WorkflowSection } from '@/components/landing/WorkflowSection'
import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { CategoriesSection } from '@/components/landing/CategoriesSection'
import { StudentHustleSection } from '@/components/landing/StudentHustleSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'
import { FooterSection } from '@/components/landing/FooterSection'

export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <WorkflowSection />
      <BenefitsSection />
      <CategoriesSection />
      <StudentHustleSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
