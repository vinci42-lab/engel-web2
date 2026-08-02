const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.getElementById('year').textContent = new Date().getFullYear();
