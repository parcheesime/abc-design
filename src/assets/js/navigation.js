(() => {
  const header = document.querySelector('.site-header__inner');
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const navigationLinks = navigation ? navigation.querySelectorAll('a') : [];
  const mobileQuery = window.matchMedia('(max-width: 63.99rem)');

  if (!header || !toggle || !navigation) {
    return;
  }

  const syncNavigationAccess = (isOpen) => {
    const isHiddenMobileMenu = mobileQuery.matches && !isOpen;

    if (isHiddenMobileMenu && navigation.contains(document.activeElement)) {
      toggle.focus();
    }

    navigation.inert = isHiddenMobileMenu;

    if (isHiddenMobileMenu) {
      navigation.setAttribute('aria-hidden', 'true');
    } else {
      navigation.removeAttribute('aria-hidden');
    }

    navigationLinks.forEach((link) => {
      if (isHiddenMobileMenu) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  };

  const setMenuState = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    syncNavigationAccess(isOpen);
  };

  header.classList.add('is-nav-enhanced', 'is-nav-initializing');
  toggle.hidden = false;
  setMenuState(false);

  requestAnimationFrame(() => {
    header.classList.remove('is-nav-initializing');
  });

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  mobileQuery.addEventListener('change', () => {
    setMenuState(false);
  });
})();
