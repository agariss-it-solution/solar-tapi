import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LanguageDropdown = () => {
  // Programmatically change language
  const setLanguage = (lang) => {
    const trySetLang = () => {
      const select = document.querySelector("select.goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      } else {
        setTimeout(trySetLang, 300);
      }
    };
    trySetLang();
  };

  // Load Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,gu',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.id = "google-translate-script";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit?.();
    }
  }, []);

  return (
    <div className="container mt-5">
      <h5>Select Language</h5>

      {/* Bootstrap Dropdown */}
      <div className="dropdown mb-3">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          🌐 Choose Language
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => setLanguage('en')}>🇬🇧 English</button></li>
          <li><button className="dropdown-item" onClick={() => setLanguage('hi')}>🇮🇳 Hindi</button></li>
          <li><button className="dropdown-item" onClick={() => setLanguage('gu')}>🇮🇳 Gujarati</button></li>
        </ul>
      </div>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
};

export default LanguageDropdown;
