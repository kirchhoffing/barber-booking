import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => changeLanguage('tr')}
        className={`text-sm ${
          i18n.language === 'tr' ? 'text-white' : 'text-gray-400'
        }`}
      >
        TR
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`text-sm ${
          i18n.language === 'en' ? 'text-white' : 'text-gray-400'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher; 