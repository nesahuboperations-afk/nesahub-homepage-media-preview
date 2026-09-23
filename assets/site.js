(() => {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('site-navigation');
  if (!button || !navigation) return;
  const mobile = window.matchMedia('(max-width: 1000px)');
  document.documentElement.classList.add('nav-enhanced');
  button.hidden = false;
  function close(returnFocus = false) {
    navigation.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    if (returnFocus) button.focus();
  }
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') close(true);
  });
  navigation.addEventListener('click', (event) => {
    if (mobile.matches && event.target.closest('a')) close();
  });
  mobile.addEventListener('change', () => {
    const focusInNavigation = navigation.contains(document.activeElement);
    close(mobile.matches && focusInNavigation);
    if (!mobile.matches && document.activeElement === button) navigation.querySelector('a').focus();
  });
})();