import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'de' | 'ar';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  'home.rentals': {
    fr: 'MBK Location',
    en: 'MBK Rentals',
    de: 'MBK Vermietung',
    ar: 'تأجير MBK',
  },
  'home.used_cars': {
    fr: "Voiture d'occasion",
    en: 'Used Cars',
    de: 'Gebrauchtwagen',
    ar: 'سيارات مستعملة',
  },
  'home.contact': {
    fr: 'Contact',
    en: 'Contact',
    de: 'Kontakt',
    ar: 'اتصل بنا',
  },
  'offer.daily': {
    fr: 'Dès 20 CHF / jour',
    en: 'From 20 CHF / day',
    de: 'Ab 20 CHF / Tag',
    ar: 'من 20 فرنك / يوم',
  },
  'voiture.luxury': {
    fr: 'Voiture Sportive',
    en: 'Sports Car',
    de: 'Sportwagen',
    ar: 'سيارة رياضية',
  },
  'voiture.comfortable': {
    fr: 'Voiture Economique',
    en: 'Economy Car',
    de: 'Sparsameres Auto',
    ar: 'سيارة اقتصادية',
  },
  'voiture.utility': {
    fr: 'Voiture Utilitaire',
    en: 'Utility Car',
    de: 'Nutzfahrzeug',
    ar: 'سيارة خدمية',
  },
  'contact.call_ahead': {
    fr: 'Appeller une heure avant de passer sur place pour prendre un rendez vous',
    en: 'Please call one hour before visiting to make an appointment',
    de: 'Bitte rufen Sie eine Stunde vor Ihrem Besuch an, um einen Termin zu vereinbaren',
    ar: 'يرجى الاتصال قبل ساعة من الحضور لتحديد موعد',
  },
  'admin.title': {
    fr: 'Administration',
    en: 'Administration',
    de: 'Verwaltung',
    ar: 'إدارة',
  },
  'admin.add_car': {
    fr: 'Ajouter une voiture',
    en: 'Add a car',
    de: 'Auto hinzufügen',
    ar: 'أضف سيارة',
  },
  'reviews.title': {
    fr: 'Avis Clients',
    en: 'Customer Reviews',
    de: 'Kundenbewertungen',
    ar: 'آراء العملاء',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
