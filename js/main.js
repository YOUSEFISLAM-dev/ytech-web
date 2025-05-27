// main.js - Y-techs Main Interactivity

// Language data (EN/AR)
const translations = {
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_courses: "Courses",
    nav_about: "About Us",
    nav_contact: "Contact",
    hero_title: "Innovate with Y-techs",
    hero_subtitle: "AI, Web, Mobile, PC Apps & 3D Experiences",
    hero_cta: "Explore Services",
    services_title: "Our Services",
    courses_title: "Courses",
    about_title: "About Us",
    contact_title: "Contact",
    contact_name_label: "Name",
    contact_name_placeholder: "Your Name",
    contact_email_label: "Email",
    contact_email_placeholder: "you@example.com",
    contact_message_label: "Message",
    contact_message_placeholder: "Type your message...",
    contact_submit: "Send"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_services: "الخدمات",
    nav_courses: "الدورات",
    nav_about: "من نحن",
    nav_contact: "تواصل",
    hero_title: "ابتكر مع واي-تيكس",
    hero_subtitle: "الذكاء الاصطناعي، الويب، تطبيقات الجوال والحاسوب وتجارب ثلاثية الأبعاد",
    hero_cta: "استكشف الخدمات",
    services_title: "خدماتنا",
    courses_title: "الدورات",
    about_title: "من نحن",
    contact_title: "تواصل",
    contact_name_label: "الاسم",
    contact_name_placeholder: "اسمك",
    contact_email_label: "البريد الإلكتروني",
    contact_email_placeholder: "you@example.com",
    contact_message_label: "رسالتك",
    contact_message_placeholder: "اكتب رسالتك...",
    contact_submit: "إرسال"
  }
};

// Language toggle logic
const langToggle = document.getElementById('lang-toggle');
const htmlTag = document.documentElement;
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  htmlTag.lang = lang;
  htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langToggle.textContent = lang === 'en' ? 'AR' : 'EN';
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
});
setLanguage(currentLang);

// Responsive nav menu
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('open');
});
// Close menu on link click (mobile)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('open');
  });
});

// Animated sections on scroll
const animatedSections = document.querySelectorAll('.animated-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
animatedSections.forEach(section => observer.observe(section));

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Example: Populate services and courses (replace with real data)
const services = [
  { icon: 'assets/icons/ai.svg', title: {en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي'}, desc: {en: 'Custom AI for your business.', ar: 'ذكاء اصطناعي مخصص لأعمالك.'} },
  { icon: 'assets/icons/web.svg', title: {en: 'Web Development', ar: 'تطوير الويب'}, desc: {en: 'Modern, responsive websites.', ar: 'مواقع عصرية متجاوبة.'} },
  { icon: 'assets/icons/mobile.svg', title: {en: 'Mobile Apps', ar: 'تطبيقات الجوال'}, desc: {en: 'iOS & Android apps.', ar: 'تطبيقات iOS و Android.'} },
  { icon: 'assets/icons/pc.svg', title: {en: 'PC Apps', ar: 'تطبيقات الحاسوب'}, desc: {en: 'Cross-platform desktop apps.', ar: 'تطبيقات سطح مكتب متعددة المنصات.'} },
  { icon: 'assets/icons/3d.svg', title: {en: '3D Experiences', ar: 'تجارب ثلاثية الأبعاد'}, desc: {en: 'Interactive 3D for web.', ar: 'تجارب تفاعلية ثلاثية الأبعاد للويب.'} }
];
const servicesList = document.querySelector('.services-list');
services.forEach(s => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `
    <img src="${s.icon}" alt="" class="service-icon">
    <h3>${s.title[currentLang]}</h3>
    <p>${s.desc[currentLang]}</p>
  `;
  servicesList.appendChild(card);
});

const courses = [
  { icon: 'assets/icons/course-ai.svg', title: {en: 'Intro to AI', ar: 'مقدمة في الذكاء الاصطناعي'}, desc: {en: 'Learn AI basics.', ar: 'تعلم أساسيات الذكاء الاصطناعي.'} },
  { icon: 'assets/icons/course-web.svg', title: {en: 'Web Bootcamp', ar: 'معسكر الويب'}, desc: {en: 'Full-stack web dev.', ar: 'تطوير ويب متكامل.'} },
  { icon: 'assets/icons/course-3d.svg', title: {en: '3D for Web', ar: 'ثري دي للويب'}, desc: {en: 'Create 3D sites.', ar: 'إنشاء مواقع ثلاثية الأبعاد.'} }
];
const coursesList = document.querySelector('.courses-list');
courses.forEach(c => {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <img src="${c.icon}" alt="" class="course-icon">
    <h3>${c.title[currentLang]}</h3>
    <p>${c.desc[currentLang]}</p>
  `;
  coursesList.appendChild(card);
});

// Apply 3D effects after cards are created
add3DMouseFollowEffect();

// About content
const aboutContent = document.querySelector('.about-content');
aboutContent.innerHTML = `
  <p data-i18n="about_story">Y-techs is a team of passionate technologists delivering innovative solutions in AI, web, mobile, PC, and 3D. We believe in empowering businesses and individuals with cutting-edge technology.</p>
`;

// Contact form validation (basic)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simple validation
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  if (!name || !email || !message) {
    alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول.' : 'Please fill in all fields.');
    return;
  }
  // Simulate send
  alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent!');
  this.reset();
});

// 3D tilt effect for cards that follow mouse pointer
function add3DMouseFollowEffect() {
  const cards = document.querySelectorAll('.service-card, .course-card, .team-member');
  console.log('Adding 3D effect to', cards.length, 'cards'); // Debug log
  
  cards.forEach(card => {
    // Remove existing event listeners to avoid duplicates
    card.removeEventListener('mouseenter', card._mouseEnterHandler);
    card.removeEventListener('mousemove', card._mouseMoveHandler);
    card.removeEventListener('mouseleave', card._mouseLeaveHandler);
    
    // Define handlers
    card._mouseEnterHandler = () => {
      card.style.transition = 'none';
    };
    
    card._mouseMoveHandler = (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      
      // Calculate rotation angles (max 15 degrees for smoother effect)
      const rotateY = (deltaX / rect.width) * 15;
      const rotateX = -(deltaY / rect.height) * 15;
      
      // Apply 3D transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    
    card._mouseLeaveHandler = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };
    
    // Add event listeners
    card.addEventListener('mouseenter', card._mouseEnterHandler);
    card.addEventListener('mousemove', card._mouseMoveHandler);
    card.addEventListener('mouseleave', card._mouseLeaveHandler);
  });
}

// Initialize 3D effects after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Apply effects after a brief delay to ensure all elements are rendered
  setTimeout(() => {
    add3DMouseFollowEffect();
  }, 200);
});
