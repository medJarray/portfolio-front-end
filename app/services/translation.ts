import axios from 'axios';

const LIBRETRANSLATE_API = 'http://localhost:5001';

// Mapping des langues i18n vers les codes LibreTranslate
const LANGUAGE_MAPPING: { [key: string]: string } = {
  'fr': 'fr',
  'en': 'en',
  'ar': 'ar'
};

export interface TranslationResponse {
  translatedText: string;
}

export const translateText = async (
  text: string,
  sourceLang: string = 'en',
  targetLang: string
): Promise<string> => {
  try {
    // Ne pas traduire si la langue source est la même que la langue cible
    if (sourceLang === targetLang) {
      return text;
    }

    const mappedSourceLang = LANGUAGE_MAPPING[sourceLang] || sourceLang;
    const mappedTargetLang = LANGUAGE_MAPPING[targetLang] || targetLang;

    // Vérifier si le texte est vide ou undefined
    if (!text) {
      return text;
    }

    const response = await axios.post(`${LIBRETRANSLATE_API}/translate`, {
      q: text,
      source: mappedSourceLang,
      target: mappedTargetLang,
      format: 'text'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

// Fonction pour formater les dates selon la langue
const formatDate = (date: string, lang: string): string => {
  if (!date || date === 'Invalid Date') return '';
  
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long'
  };
  
  return new Intl.DateTimeFormat(lang, options).format(dateObj);
};

export const translateExperience = async (experience: any, targetLang: string) => {
  const translatedExperience = { ...experience };
  
  // Traduire le titre
  translatedExperience.title = await translateText(experience.title, 'en', targetLang);
  
  // Traduire l'entreprise
  translatedExperience.company = await translateText(experience.company, 'en', targetLang);
  
  // Traduire la description
  if (experience.description) {
    translatedExperience.description = await translateText(experience.description, 'en', targetLang);
  }
  
  // Traduire les responsabilités
  if (experience.responsibilities && Array.isArray(experience.responsibilities)) {
    translatedExperience.responsibilities = await Promise.all(
      experience.responsibilities.map((resp: string) => translateText(resp, 'en', targetLang))
    );
  }

  // Formater les dates
  if (experience.startDate) {
    translatedExperience.startDate = formatDate(experience.startDate, targetLang);
  }
  if (experience.endDate) {
    translatedExperience.endDate = formatDate(experience.endDate, targetLang);
  }

  return translatedExperience;
};

export const translateDegree = async (degree: any, targetLang: string) => {
  const translatedDegree = { ...degree };
  
  // Traduire le nom du diplôme
  translatedDegree.degree = await translateText(degree.degree, 'en', targetLang);
  
  // Traduire l'institution
  translatedDegree.institution = await translateText(degree.institution, 'en', targetLang);
  
  // Traduire la description
  if (degree.description) {
    translatedDegree.description = await translateText(degree.description, 'en', targetLang);
  }

  // Formater les dates
  if (degree.startDate) {
    translatedDegree.startDate = formatDate(degree.startDate, targetLang);
  }
  if (degree.endDate) {
    translatedDegree.endDate = formatDate(degree.endDate, targetLang);
  }

  return translatedDegree;
}; 