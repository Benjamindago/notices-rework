import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleKeyPress = (event) => {
    const events = {
      'e': changeLanguage('en'),
      'f': changeLanguage('fr')
    }
    return events[event.key]
  }

  useEffect(() => {
    document.title = t('Notices de montage et d\'utilisation');
  });

  return (
    <section className="top-lang row">
      <div className="wrap row">
        <div className="left">
          <Link to={{ pathname: '/' }} onClick={() => document.body.scrollIntoView({ behavior: 'smooth' })}><i className="fa fa-home" /></Link>
        </div>
        <div className="right">
          <span className='language-choice' onClick={() => changeLanguage('en')} onKeyPress={handleKeyPress} role='button' tabIndex={0}>en</span> | <span className='language-choice' onClick={() => changeLanguage('fr')} onKeyPress={handleKeyPress} role='button' tabIndex={-1}>fr</span>
        </div>
      </div>
    </section>
  );
}

export default Header
