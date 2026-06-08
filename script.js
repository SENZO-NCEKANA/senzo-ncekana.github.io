// =========================
// THEME TOGGLE (DAY / NIGHT)
// =========================
const THEME_KEY = 'portfolio-theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
}

initTheme();

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    toggleTheme();
    themeToggle.setAttribute('aria-label', document.documentElement.getAttribute('data-theme') === 'light'
      ? 'Switch to dark mode'
      : 'Switch to light mode');
  });
}

// =========================
// MOBILE MENU TOGGLE
// =========================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

const mobileClose = mobileMenu.querySelector('.mobile-close');
mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', false);
  mobileMenu.setAttribute('aria-hidden', true);
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  });
});

// =========================
// PROJECTS
// =========================
const galleryGrid = document.getElementById('galleryGrid');

const defaultProjects = [
  {
    title: 'AI Concierge — Agentic Hospitality Assistant',
    mark: 'AC',
    kicker: 'In Progress',
    description: 'An agentic assistant for hotels that answers guest enquiries and runs operational tasks — room availability, bookings, inventory updates, and policy/FAQ answers. LangChain tools call backend APIs, with RAG vector search to keep responses grounded.',
    tags: ['LangChain', 'OpenAI', 'RAG', 'Pinecone', 'PostgreSQL', 'Agents'],
    link: ''
  },
  {
    title: 'PharmaGuard – Pharmaceutical Similarity Detection',
    mark: 'PG',
    kicker: 'AI Platform',
    description: 'A full-stack platform that flags look-alike / sound-alike (LASA) risks in drug names and packaging. A multi-agent pipeline runs OCR, compliance, and similarity checks in parallel, then generates a regulatory report.',
    tags: ['Python', 'FastAPI', 'Next.js', 'Google Gemini', 'LangChain', 'FAISS', 'Docker'],
    link: 'https://github.com/SENZO-NCEKANA/PharmaGuard'
  },
  {
    title: 'Slogan Classifier & Generator',
    mark: 'SC',
    kicker: 'NLP',
    description: 'An LSTM model that generates slogans from an industry label and classifies existing slogans across 142 industries. Built with TensorFlow, Keras, and spaCy.',
    tags: ['NLP', 'TensorFlow', 'LSTM', 'Python', 'spaCy'],
    link: 'https://github.com/SENZO-NCEKANA/Slogan-Classifier-and-Generator'
  },
  {
    title: 'US Crime Statistics — Pattern & Anomaly Detection',
    mark: 'US',
    kicker: 'Unsupervised ML',
    description: 'Full-population analysis of crime statistics across all 50 US states, using PCA with K-means and hierarchical clustering to segment states and surface outliers — analogous to pattern and exception detection in audit.',
    tags: ['Python', 'PCA', 'Clustering', 'scikit-learn', 'SciPy'],
    link: 'https://github.com/SENZO-NCEKANA/US-Arrests---Unsupervised-Machine-Learning'
  },
  {
    title: 'Customer Churn — Risk Scoring Pipeline',
    mark: 'CC',
    kicker: 'Risk / ML',
    description: 'An end-to-end pipeline that scores and predicts customer churn — comparing Logistic Regression, Random Forest, and XGBoost with feature engineering and ROC-AUC / F1 evaluation. Framed as risk/exception scoring across a full population.',
    tags: ['Python', 'XGBoost', 'scikit-learn', 'pandas', 'ML'],
    link: 'https://github.com/SENZO-NCEKANA/telco-customer-churn-'
  },
  {
    title: 'Django News Application',
    mark: 'DN',
    kicker: 'Full-Stack',
    description: 'A Django news platform with role-based access for Readers, Journalists, and Editors, plus subscriptions, email notifications, and a REST API. Docker-ready.',
    tags: ['Django', 'Python', 'Docker', 'REST API', 'MySQL'],
    link: 'https://github.com/SENZO-NCEKANA/Django-News-Application'
  },
  {
    title: 'Automobile Dataset EDA',
    mark: 'AE',
    kicker: 'Data Analysis',
    description: 'Exploratory analysis of the Automobile dataset — cleaning, visualisation, and correlations that surface insights on pricing, fuel efficiency, and manufacturer trends.',
    tags: ['Python', 'pandas', 'Seaborn', 'Jupyter', 'EDA'],
    link: 'https://github.com/SENZO-NCEKANA/automobile-eda'
  },
  {
    title: 'Amazon Review Sentiment Analysis',
    mark: 'SA',
    kicker: 'NLP',
    description: 'Sentiment analysis of Amazon product reviews using spaCy and SpacyTextBlob — covering preprocessing, polarity scoring, and similarity checks in a clean, reproducible workflow.',
    tags: ['NLP', 'Python', 'spaCy', 'sentiment-analysis', 'Jupyter'],
    link: 'https://github.com/SENZO-NCEKANA/amazon-review-sentiment-analysis'
  }
];

// Curated defaults are the source of truth for the static site.
const projects = defaultProjects;

// Helper: derive a 2-letter monogram from a project title
function deriveMark(title) {
  const words = String(title).replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '•';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Helper: create project card element
function createProjectCard({ title, description, tags = [], link = '', mark = '', kicker = '' }) {
  const card = document.createElement('div');
  card.className = 'project-card';

  const coverMark = mark || deriveMark(title);
  const coverKicker = kicker || (tags.length ? tags[0] : '');

  card.innerHTML = `
    <div class="project-cover">
      <span class="project-cover-mark">${coverMark}</span>
      ${coverKicker ? `<span class="project-cover-kicker">${coverKicker}</span>` : ''}
    </div>
    <div class="project-body">
      <h3>${title}</h3>
      <p>${description}</p>
      ${tags.length ? `<div class="project-tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>` : ''}
      ${link ? `<a href="${link}" class="project-link" target="_blank" rel="noreferrer">View Project <span class="project-link-arrow">→</span></a>` : ''}
    </div>
  `;

  return card;
}

function renderProjects() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  projects.forEach(project => galleryGrid.appendChild(createProjectCard(project)));
}

// Initial render
renderProjects();

// =========================
// CONTACT FORM
// =========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Message from ${name} (Portfolio)`);
    const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:senzo.ncekana1@gmail.com?subject=${subject}&body=${body}`;

    contactForm.reset();
  });
}

// =========================
// SCROLL REVEAL (subtle fade-up)
// =========================
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => observer.observe(el));
})();
