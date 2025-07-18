import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative" ref={languageMenuRef}>
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200 border border-gray-200/50"
        >
          <Globe className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">
            {i18n.language === 'fr' ? 'FR' : i18n.language === 'en' ? 'EN' : 'AR'}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {isLanguageMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
            <div className="py-1">
              <button
                onClick={() => changeLanguage('fr')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center gap-2 ${
                  i18n.language === 'fr' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">FR</span>
                Français
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center gap-2 ${
                  i18n.language === 'en' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600">EN</span>
                English
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center gap-2 ${
                  i18n.language === 'ar' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">AR</span>
                Arabic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};