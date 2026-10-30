(() => {
  /** @param {string} hash */
  function revealPublication(hash) {
    const publication = document.getElementById(hash.slice(1));
    if (!(publication instanceof HTMLElement) || !publication.matches('article.publication')) return;
    const details = publication.querySelector(':scope > .work-details');
    if (!(details instanceof HTMLDetailsElement)) throw new Error('Publication is missing its details');
    for (let ancestor = publication.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
    }
    details.open = true;
    publication.scrollIntoView({ block: 'start' });
  }

  for (const link of document.querySelectorAll('.research-links a[href^="#"]')) {
    link.addEventListener('click', () => revealPublication(link.hash));
  }
  window.addEventListener('hashchange', () => revealPublication(window.location.hash));
  revealPublication(window.location.hash);
})();
