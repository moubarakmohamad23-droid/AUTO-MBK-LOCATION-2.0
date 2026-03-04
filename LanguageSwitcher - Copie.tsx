import { useLanguage } from '../lib/language';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'ar', label: 'ARB' },
  ];

  return (
    <div className="flex gap-2 bg-black/20 backdrop-blur-md p-1 rounded-full">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            language === lang.code
              ? 'bg-white shadow-lg scale-110'
              : 'hover:bg-white/20 text-white/70'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
