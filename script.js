// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  htmlElement.classList.add('dark');
  htmlElement.classList.remove('light');
} else {
  htmlElement.classList.remove('dark');
  htmlElement.classList.add('light');
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = htmlElement.classList.toggle('dark');
  htmlElement.classList.toggle('light', !isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// --- Links Data ---
const links = [
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/musthxq.__?igsh=MjUweHh5cDBzdzN2',
    icon: 'instagram'
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/musthaq-ahmed/', // Note: Kept empty as user provided Instagram twice instead of this. Let's ask! Let's temporarily link back to the portfolio
    icon: 'linkedin'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/musthaqahmead',
    icon: 'github'
  },
  {
    title: 'Personal Portfolio Website',
    url: 'https://musthaqahmead.github.io/MusthaqProtfolio/',
    icon: 'globe'
  }
];

// --- Render Links ---
const linksContainer = document.getElementById('links-container');
const baseDelay = 0.3; // start stagger after header

links.forEach((link, index) => {
  const delay = baseDelay + (index * 0.1);

  const linkEl = document.createElement('a');
  linkEl.href = link.url;
  linkEl.target = '_blank';
  linkEl.rel = 'noopener noreferrer';
  linkEl.className = 'group relative flex items-center p-4 w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md animate-fade-in-up hover-lift overflow-hidden';
  linkEl.style.animationDelay = `${delay}s`;

  linkEl.innerHTML = `
    <!-- subtle background highlight on hover -->
    <div class="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors z-10 shrink-0 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50">
      <i data-lucide="${link.icon}" class="w-5 h-5"></i>
    </div>
    
    <span class="ml-4 font-medium text-neutral-900 dark:text-neutral-100 z-10">${link.title}</span>
    
    <div class="ml-auto text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors z-10">
      <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
    </div>
  `;

  linksContainer.appendChild(linkEl);
});

// Initialize Lucide Icons after injecting html
lucide.createIcons();

// --- Copy to Clipboard functionality ---
const toast = document.getElementById('toast');
let toastTimeout;

window.copyCommand = async (text, buttonElement) => {
  try {
    await navigator.clipboard.writeText(text);

    // Change icon temporarily to check
    const iconEl = buttonElement.querySelector('i');
    iconEl.setAttribute('data-lucide', 'check');
    lucide.createIcons();

    setTimeout(() => {
      iconEl.setAttribute('data-lucide', 'copy');
      lucide.createIcons();
    }, 2000);

    showToast();
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

function showToast() {
  clearTimeout(toastTimeout);

  toast.classList.remove('translate-y-12', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 3000);
}
