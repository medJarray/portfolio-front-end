import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      presentation: {
        title: 'Mohamed Jarray',
        subtitle: 'Développeur de Logiciels',
        description: 'Développeur passionné avec une expertise en développement web full-stack, mobile et DevOps. Je crée des solutions innovantes et performantes.',
        contact: 'Me Contacter',
        download_cv: 'Télécharger CV'
      },
      skills: {
        title: 'Compétences et Expériences',
        description: 'Mes compétences techniques et mon expertise',
        frontend: {
          title: 'Développement Frontend',
          description: 'Création d\'interfaces utilisateur modernes et réactives'
        },
        backend: {
          title: 'Développement Backend',
          description: 'Architecture et développement d\'APIs robustes'
        },
        devops: {
          title: 'DevOps',
          description: 'Automatisation et déploiement continu'
        },
        database: {
          title: 'Bases de Données',
          description: 'Conception et optimisation de bases de données'
        },
        mobile: {
          title: 'Développement Mobile',
          description: 'Applications mobiles natives et cross-platform'
        },
        tools: {
          title: 'Outils et Méthodologies',
          description: 'Utilisation des meilleures pratiques et outils de développement'
        }
      },
      experience: {
        title: 'Expériences Professionnelles',
        description: 'Mon parcours professionnel et mes réalisations',
        present: 'Présent'
      },
      education: {
        title: 'Formation',
        description: 'Mon parcours académique'
      },
      contact: {
        title: 'Contactez-moi',
        description: 'Je suis toujours ouvert aux nouvelles opportunités, collaborations ou simplement à une discussion amicale. N\'hésitez pas à me contacter !',
        form: {
          name: 'Nom',
          name_placeholder: 'Votre nom',
          email: 'Email',
          email_placeholder: 'vous@email.com',
          message: 'Message',
          message_placeholder: 'Votre message...',
          send: 'Envoyer le message'
        }
      },
      business_card: {
        download: 'Télécharger la carte',
        share: 'Partager',
        share_text: 'Découvrez le portfolio de {{name}}, {{title}}'
      }
    }
  },
  en: {
    translation: {
      presentation: {
        title: 'Mohamed Jarray',
        subtitle: 'Software Developer',
        description: 'Passionate developer with expertise in full-stack web development, mobile, and DevOps. I create innovative and high-performance solutions.',
        contact: 'Get In Touch',
        download_cv: 'Download CV'
      },
      skills: {
        title: 'Skills and Experiences',
        description: 'My technical skills and expertise',
        frontend: {
          title: 'Frontend Development',
          description: 'Creating modern and responsive user interfaces'
        },
        backend: {
          title: 'Backend Development',
          description: 'Architecture and development of robust APIs'
        },
        devops: {
          title: 'DevOps',
          description: 'Automation and continuous deployment'
        },
        database: {
          title: 'Databases',
          description: 'Database design and optimization'
        },
        mobile: {
          title: 'Mobile Development',
          description: 'Native and cross-platform mobile applications'
        },
        tools: {
          title: 'Tools and Methodologies',
          description: 'Using best practices and development tools'
        }
      },
      experience: {
        title: 'Experience',
        description: 'My professional journey and achievements',
        present: 'Present'
      },
      education: {
        title: 'Degrees',
        description: 'My academic background'
      },
      contact: {
        title: 'Let\'s Connect',
        description: 'I\'m always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!',
        form: {
          name: 'Name',
          name_placeholder: 'Your name',
          email: 'Email',
          email_placeholder: 'you@email.com',
          message: 'Message',
          message_placeholder: 'Your message...',
          send: 'Send Message'
        }
      },
      business_card: {
        download: 'Download Card',
        share: 'Share',
        share_text: 'Check out {{name}}\'s portfolio, {{title}}'
      }
    }
  },
  ar: {
    translation: {
      presentation: {
        title: 'محمد الجراي',
        subtitle: 'مطور برمجيات',
        description: 'مطور شغوف متخصص في تطوير الويب الكامل، تطوير تطبيقات الموبايل، وDevOps. أقوم بإنشاء حلول مبتكرة وعالية الأداء.',
        contact: 'تواصل معي',
        download_cv: 'تحميل السيرة الذاتية'
      },
      skills: {
        title: 'المهارات والخبرات',
        description: 'مهاراتي التقنية وخبرتي',
        frontend: {
          title: 'تطوير الواجهة الأمامية',
          description: 'إنشاء واجهات مستخدم حديثة وتفاعلية'
        },
        backend: {
          title: 'تطوير الخلفية',
          description: 'هندسة وتطوير واجهات برمجة التطبيقات القوية'
        },
        devops: {
          title: 'DevOps',
          description: 'الأتمتة والنشر المستمر'
        },
        database: {
          title: 'قواعد البيانات',
          description: 'تصميم وتحسين قواعد البيانات'
        },
        mobile: {
          title: 'تطوير تطبيقات الموبايل',
          description: 'تطبيقات الموبايل الأصلية والمتعددة المنصات'
        },
        tools: {
          title: 'الأدوات والمنهجيات',
          description: 'استخدام أفضل الممارسات وأدوات التطوير'
        }
      },
      experience: {
        title: 'الخبرات',
        description: 'رحلتي المهنية وإنجازاتي',
        present: 'حالياً'
      },
      education: {
        title: 'التعليم',
        description: 'خلفيتي الأكاديمية'
      },
      contact: {
        title: 'تواصل معي',
        description: 'أنا دائماً منفتح على الفرص الجديدة والتعاون أو مجرد محادثة ودية. لا تتردد في التواصل!',
        form: {
          name: 'الاسم',
          name_placeholder: 'اسمك',
          email: 'البريد الإلكتروني',
          email_placeholder: 'you@email.com',
          message: 'الرسالة',
          message_placeholder: 'رسالتك...',
          send: 'إرسال الرسالة'
        }
      },
      business_card: {
        download: 'تحميل البطاقة',
        share: 'مشاركة',
        share_text: 'اكتشف معرض أعمال {{name}}، {{title}}'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 