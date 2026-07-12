(() => {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach((accordion) => {
    const triggers = accordion.querySelectorAll('[aria-controls]');

    if (!triggers.length) {
      return;
    }

    accordion.classList.add('is-accordion-enhanced');

    triggers.forEach((trigger) => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!panel) {
        return;
      }

      trigger.setAttribute('aria-expanded', 'false');
      panel.hidden = true;

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        trigger.setAttribute('aria-expanded', String(!isExpanded));
        panel.hidden = isExpanded;
      });

      trigger.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }

        event.preventDefault();
        trigger.click();
      });
    });
  });
})();
