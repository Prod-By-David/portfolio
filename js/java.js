document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
  });

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  function activarLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (
        section &&
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activarLink);
  window.addEventListener('load', activarLink);

  const form = document.getElementById('contactForm');
  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    const validarEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valido = true;

      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formMessage.textContent = '';

      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Por favor, ingresa tu nombre.';
        valido = false;
      }

      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Por favor, ingresa tu correo.';
        valido = false;
      } else if (!validarEmail(emailInput.value.trim())) {
        emailError.textContent = 'Correo no válido.';
        valido = false;
      }

      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Por favor, escribe un mensaje.';
        valido = false;
      }

      if (valido) {
        formMessage.style.color = '#61dafb';
        formMessage.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
        form.reset();
      } else {
        formMessage.style.color = '#f66';
        formMessage.textContent = 'Por favor, corrige los errores antes de enviar.';
      }
    });
  }
});