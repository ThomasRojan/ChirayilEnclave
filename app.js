/* ==========================================================================
   CHIRAYIL ENCLAVE — INTERACTIVE LOGIC, THEMING & MEDIA PLAYERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initElevationExplorer();
  initSpaceFilters();
  initEnquiryForm();
  initMobileNav();
  initAddressCopy();
  initVideoPlayers();
  initLightboxModal();
});

/* 1. LIGHT / DARK THEME TOGGLE */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeText = document.getElementById('theme-toggle-text');
  const themeIcon = document.getElementById('theme-toggle-icon');

  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('chirayil_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('chirayil_theme', currentTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeText) themeText.textContent = 'LIGHT MODE';
      if (themeIcon) {
        themeIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeText) themeText.textContent = 'DARK MODE';
      if (themeIcon) {
        themeIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    }
  }
}

/* 2. INTERACTIVE ELEVATION / FLOOR EXPLORER */
const floorData = {
  terrace: {
    title: "Terrace Floor",
    badge: "PRIVATE — NOT FOR RENT",
    desc: "The roof terrace is a private family area and is strictly not available for rental or public access.",
    units: [
      { name: "Private Building Terrace", sqft: "N/A", rent: "Not for Rent", status: "Private Unit" }
    ]
  },
  second: {
    title: "Second Floor",
    badge: "2BHK RESIDENCE AVAILABLE — ₹35,000 / MONTH",
    desc: "Features a spacious 2BHK residential apartment available for rental at ₹35,000/month, alongside a distinct private family residence.",
    units: [
      { name: "Space 01 — 2BHK Residence", sqft: "1,161.48 sq ft", rent: "₹35,000 / month", status: "Available for Rent" },
      { name: "Space 02 — Private Family Residence", sqft: "Private Unit", rent: "Not for Rent", status: "Private Unit" }
    ]
  },
  first: {
    title: "First Floor",
    badge: "3 COMMERCIAL OFFICES — ₹30,000 / MONTH EACH",
    desc: "Three high-specification professional office suites, each priced at ₹30,000/month. Every office space on the first floor includes its own private bathroom.",
    units: [
      { name: "Office Space 01 (Left) + Balcony", sqft: "1,175.31 sq ft", rent: "₹30,000 / month", status: "Available for Rent" },
      { name: "Office Space 02 (Middle)", sqft: "700.30 sq ft", rent: "₹30,000 / month", status: "Available for Rent" },
      { name: "Office Space 03 (Right) + Balcony", sqft: "1,000.05 sq ft", rent: "₹30,000 / month", status: "Available for Rent" }
    ]
  },
  ground: {
    title: "Ground Floor",
    badge: "2 COMMERCIAL SPACES — ₹30,000 / MONTH EACH",
    desc: "Two premium ground-floor commercial spaces ideal for retail shops, corporate reception, or business headquarters, available at ₹30,000/month each.",
    units: [
      { name: "Commercial Space 01 (Left / Front)", sqft: "1,016.65 sq ft", rent: "₹30,000 / month", status: "Available for Rent" },
      { name: "Commercial Space 02 (Right / Main)", sqft: "1,496.61 sq ft", rent: "₹30,000 / month", status: "Available for Rent" }
    ]
  }
};

function initElevationExplorer() {
  const floorBars = document.querySelectorAll('.elevation-floor-bar');
  const titleEl = document.getElementById('explorer-floor-title');
  const badgeEl = document.getElementById('explorer-floor-badge');
  const descEl = document.getElementById('explorer-floor-desc');
  const unitsContainer = document.getElementById('explorer-units-container');

  if (!floorBars.length || !titleEl) return;

  floorBars.forEach(bar => {
    bar.addEventListener('click', () => {
      const key = bar.getAttribute('data-floor');
      const data = floorData[key];
      if (!data) return;

      floorBars.forEach(b => b.classList.remove('active'));
      bar.classList.add('active');

      titleEl.textContent = data.title;
      badgeEl.textContent = data.badge;
      descEl.textContent = data.desc;

      unitsContainer.innerHTML = data.units.map(u => `
        <div class="floor-unit-row">
          <div>
            <div class="floor-unit-title">${u.name}</div>
            <div class="text-small" style="color: var(--text-muted);">${u.status}</div>
          </div>
          <div style="text-align: right;">
            <div class="floor-unit-sqft">${u.sqft}</div>
            <div class="floor-unit-rent-tag">${u.rent}</div>
          </div>
        </div>
      `).join('');
    });
  });
}

/* 3. AVAILABLE SPACES FILTER */
function initSpaceFilters() {
  const filterBtns = document.querySelectorAll('.space-filter-btn');
  const spaceCards = document.querySelectorAll('#spaces-grid-container .space-card[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-outline'));

      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      spaceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. ENQUIRY FORM & PRE-FILL */
function initEnquiryForm() {
  const form = document.getElementById('chirayil-enquiry-form');
  const interestSelect = document.getElementById('enquiry-interest');
  const enquireBtns = document.querySelectorAll('.trigger-enquiry');

  enquireBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const unitValue = btn.getAttribute('data-unit-val');
      if (unitValue && interestSelect) {
        // Find matching option or select general
        let foundOption = false;
        for (let i = 0; i < interestSelect.options.length; i++) {
          if (interestSelect.options[i].value.includes(unitValue) || unitValue.includes(interestSelect.options[i].value)) {
            interestSelect.selectedIndex = i;
            foundOption = true;
            break;
          }
        }
        if (!foundOption) {
          interestSelect.value = unitValue;
        }
      }
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('enquiry-name')?.value;
    const phone = document.getElementById('enquiry-phone')?.value;

    if (!name || !phone) {
      showToast('Please provide your name and phone number.');
      return;
    }

    showToast('Thank you! Your enquiry has been received. We will contact you shortly.');
    form.reset();
  });
}

/* 5. TOAST NOTIFICATION */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* 6. MOBILE NAVIGATION */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.contains('mobile-active');
    if (isExpanded) {
      navLinks.classList.remove('mobile-active');
      navLinks.style.display = 'none';
    } else {
      navLinks.classList.add('mobile-active');
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--nav-height)';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'var(--bg-surface)';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid var(--border-color)';
    }
  });

  // Close menu when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        navLinks.style.display = 'none';
      }
    });
  });
}

/* 7. COPY ADDRESS HELPER */
function initAddressCopy() {
  const copyBtn = document.getElementById('copy-address-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const address = "286R+Q6J, near Amina's Ladies Hostel, Padamughal, Kakkanad, Keralam 682037, India";
    navigator.clipboard.writeText(address).then(() => {
      showToast('Address copied to clipboard!');
    }).catch(() => {
      showToast('286R+Q6J, near Amina\'s Ladies Hostel, Padamughal, Kakkanad, Keralam 682037');
    });
  });
}

/* 8. VIDEO PLAYERS INITIALIZATION & PLAY OVERLAY */
function initVideoPlayers() {
  const videoContainers = document.querySelectorAll('.video-player-box');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playOverlay = container.querySelector('.video-overlay-play');
    
    if (!video || !playOverlay) return;

    playOverlay.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playOverlay.classList.add('is-playing');
      } else {
        video.pause();
        playOverlay.classList.remove('is-playing');
      }
    });

    video.addEventListener('play', () => {
      playOverlay.classList.add('is-playing');
    });

    video.addEventListener('pause', () => {
      playOverlay.classList.remove('is-playing');
    });

    video.addEventListener('ended', () => {
      playOverlay.classList.remove('is-playing');
    });
  });
}

/* 9. LIGHTBOX MODAL FOR HIGH-RES PHOTOS AND VIDEOS */
function initLightboxModal() {
  const triggerElements = document.querySelectorAll('[data-lightbox]');
  
  if (!triggerElements.length) return;

  // Create modal container if not exists
  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content-wrap">
        <button class="lightbox-close-btn" aria-label="Close modal">&times;</button>
        <div class="lightbox-media-container" id="lightbox-media-container"></div>
        <div class="lightbox-caption" id="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const mediaContainer = modal.querySelector('#lightbox-media-container');
  const captionEl = modal.querySelector('#lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const backdrop = modal.querySelector('.lightbox-backdrop');

  const closeModal = () => {
    modal.classList.remove('active');
    mediaContainer.innerHTML = '';
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  triggerElements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const type = elem.getAttribute('data-lightbox-type') || 'image';
      const src = elem.getAttribute('data-lightbox-src');
      const title = elem.getAttribute('data-lightbox-title') || 'Chirayil Enclave Media';

      if (!src) return;

      if (type === 'video') {
        mediaContainer.innerHTML = `
          <video controls autoplay class="lightbox-video-elem">
            <source src="${src}" type="video/mp4">
            Your browser does not support html5 video playback.
          </video>
        `;
      } else {
        mediaContainer.innerHTML = `<img src="${src}" alt="${title}" class="lightbox-img-elem">`;
      }

      captionEl.textContent = title;
      modal.classList.add('active');
    });
  });
}
