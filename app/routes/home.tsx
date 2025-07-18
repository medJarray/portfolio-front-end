import { useTranslation } from 'react-i18next';
import { 
  PortfolioErrorBoundary, 
  LanguageSelector, 
  HeroSection, 
  ExperienceSection, 
  EducationSection, 
  SkillsSection, 
  ContactSection,
  usePortfolioData 
} from '~/components/sections';

export default function Home() {
  const { i18n } = useTranslation();
  const { experiences, skills, dynamicDegrees, loading, error } = usePortfolioData();

  return (
    <PortfolioErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa]">
        <LanguageSelector />
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900">MJ</span>
              </div>
            </div>
          </div>
        </nav>

        <HeroSection />
        <ExperienceSection 
          experiences={experiences} 
          loading={loading} 
          error={error} 
        />
        <EducationSection 
          dynamicDegrees={dynamicDegrees} 
          loading={loading} 
          error={error} 
        />
        <SkillsSection 
          skills={skills} 
          loading={loading} 
          error={error} 
          language={i18n.language}
        />
        <ContactSection />
      </div>
    </PortfolioErrorBoundary>
  );
}