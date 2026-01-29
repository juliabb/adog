// DOM Elements
const nav = document.querySelector('#header nav');
const toggle = document.querySelectorAll('nav .toggle');
const links = document.querySelectorAll('nav ul li a');
const header = document.querySelector('#header');
const backToTopButton = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('main section[id]');

// Abre e fecha o menu quando clica no Hamburguer e no X
for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show');
    document.querySelector('.toggle').classList.toggle('show');
  });
}

// Fecha o menu quando clica em um item
for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show');
    document.querySelector('.toggle').classList.remove('show');
  });
}

// Adiciona sombra no header quando scroll
function changeHeaderWhenScroll() {
  if (window.scrollY >= 50) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
}

// Back to top button
function backToTop() {
  if (window.scrollY >= 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// Menu ativo conforme a seção visível
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const checkpointStart = checkpoint >= sectionTop - 100;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight - 100;

    const menuLink = document.querySelector(`nav ul li a[href*="${sectionId}"]`);

    if (checkpointStart && checkpointEnd) {
      menuLink.classList.add('active');
    } else {
      menuLink.classList.remove('active');
    }
  }
}

// ScrollReveal animations
if (typeof ScrollReveal !== 'undefined') {
  const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: false
  });

  scrollReveal.reveal(`
    #home .fundo-texto,
    .intro .text,
    #about .image, #about .text,
    .services-section .section-header, .services-section .card,
    #contact .text, #contact .contact-info,
    .help-section .text, .help-section .doacao,
    footer .brand, footer .social
  `, { interval: 100 });
}

// Event Listeners
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Inicializações quando a página carrega
window.addEventListener('DOMContentLoaded', function () {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();

  // Adiciona ano atual no copyright
  const yearSpan = document.querySelector('.copyright');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `© ${currentYear} Instituição Adog`;
  }
});

// Animação para botões de doação
document.querySelectorAll('.donation-link').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();

      // Animação de clique
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);

      // Simula abertura de modal/aviso
      const method = this.querySelector('span').textContent;
      alert(`Obrigado por querer doar! O método "${method}" será implementado em breve.`);
    }
  });
});

// Validação simples do formulário (se adicionar formulário posteriormente)
if (document.querySelector('form')) {
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validação básica
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (isValid) {
      // Simula envio
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      this.reset();
    }
  });
}