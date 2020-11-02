
export default {
  name: 'i18n',
  initialize: function(app) {
    let i18n = app.lookup('service:i18n');
    
//    i18n.addTranslations('ja-jp');
    i18n.set('locale', calculateLocale(i18n.get('locales')));
  }
}

function calculateLocale(locales) {
  // whatever you do to pick a locale for the user:
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;

  var endIndex = language.indexOf('-');
  var fallback_code = language.substring(0, endIndex != -1 ? endIndex : language.length);

  return locales.includes(language.toLowerCase()) ? language : fallback_code;
}

