// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Scroll Reveal Animation (with direction detection)
let lastScrollTop = 0;

function reveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  let scrollDirection = "down";

  // Cek arah scroll
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    scrollDirection = "down"; // scroll ke bawah
  } else {
    scrollDirection = "up"; // scroll ke atas
  }
  lastScrollTop = st <= 0 ? 0 : st;

  // Apply animation
  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('active');

      // Animasi tambahan berdasarkan arah scroll
      if (scrollDirection === "down") {
        el.style.transform = "translateY(0) scale(1)";
        el.style.transition = "all 0.8s ease";
      } else {
        el.style.transform = "translateY(-10px) scale(1.02)";
        el.style.transition = "all 0.8s ease";
      }
    }
  });
}

window.addEventListener('scroll', reveal);
reveal();

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      document.getElementById('formMessage').classList.remove('hidden');
      document.getElementById('formError').classList.add('hidden');
      form.reset();
    } else {
      document.getElementById('formError').classList.remove('hidden');
      document.getElementById('formMessage').classList.add('hidden');
    }
  } catch (error) {
    document.getElementById('formError').classList.remove('hidden');
    document.getElementById('formMessage').classList.add('hidden');
  }
});

