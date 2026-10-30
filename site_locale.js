(() => {
  const element = document.getElementById('site-translations');
  if (!element) throw new Error('Missing site translation data');
  const messages = Object.freeze(JSON.parse(element.textContent));
  const english = document.documentElement.lang === 'en';
  window.translateSiteText = function translateSiteText(message) {
    if (english) return message;
    if (!Object.hasOwn(messages, message)) throw new Error(`Missing translation: ${message}`);
    return messages[message];
  };
})();
