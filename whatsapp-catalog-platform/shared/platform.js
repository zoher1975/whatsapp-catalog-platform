/**
 * ═══════════════════════════════════════════════════════
 * SMART PAGES CATALOG PLATFORM — Core JS
 * WhatsApp-first catalog engine
 * No Shopify dependencies. Pure vanilla JS.
 * ═══════════════════════════════════════════════════════
 */

;(function () {
  'use strict';

  const DATA    = window.PlatformData;
  const WA      = window.PlatformWA;
  const MERCHANT = DATA.merchant;

  // ─── DOM Ready ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupHeader();
    setupMobileNav();
    setupSearch();
    renderCollections();
    renderProducts('all');
    setupCategoryTabs();
    setupModal();
    setupHeroSlideshow();
    setupScrollAnimations();
  }

  // ─── Header scroll behavior ───────────────────────────
  function setupHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('is-scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Mobile Nav ───────────────────────────────────────
  function setupMobileNav() {
    const toggle  = document.getElementById('menuToggle');
    const drawer  = document.getElementById('navDrawer');
    const overlay = document.getElementById('navOverlay');
    const close   = document.getElementById('navClose');
    if (!toggle) return;

    function open() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', open);
    close?.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    // Close on nav link click (mobile)
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeNav);
    });
  }

  // ─── Search ───────────────────────────────────────────
  function setupSearch() {
    const toggle  = document.getElementById('searchToggle');
    const overlay = document.getElementById('searchOverlay');
    const closeBtn = document.getElementById('searchClose');
    const input   = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      overlay.classList.add('is-open');
      input?.focus();
    });
    closeBtn?.addEventListener('click', () => {
      overlay.classList.remove('is-open');
    });

    // Live search
    let debounceTimer;
    input?.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = e.target.value.trim().toLowerCase();
        if (q.length < 2) {
          results.innerHTML = '';
          results.classList.remove('has-results');
          return;
        }
        const hits = DATA.products.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q)) ||
          p.category.includes(q)
        ).slice(0, 5);

        if (hits.length === 0) {
          results.innerHTML = '<p style="color:var(--c-text-muted);font-size:.9rem;padding:0.5rem 0">No products found.</p>';
          results.classList.add('has-results');
          return;
        }

        results.innerHTML = hits.map(p => `
          <div class="search-result-item" data-product-id="${p.id}"
            style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--c-border);cursor:pointer">
            <div style="width:48px;height:48px;border-radius:8px;background:#f2ede5;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.2rem">✦</div>
            <div>
              <div style="font-family:var(--font-display);font-size:1rem">${p.title}</div>
              <div style="font-size:.8rem;color:var(--c-text-muted)">${MERCHANT.currencySymbol} ${p.price}</div>
            </div>
          </div>
        `).join('');
        results.classList.add('has-results');

        results.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('click', () => {
            const pid = el.dataset.productId;
            const product = DATA.products.find(p => p.id === pid);
            if (product) openModal(product);
            overlay.classList.remove('is-open');
          });
        });
      }, 200);
    });
  }

  // ─── Collections Renderer ─────────────────────────────
  function renderCollections() {
    const grid = document.getElementById('collectionsGrid');
    if (!grid) return;

    const collections = DATA.collections;
    grid.innerHTML = collections.map(col => `
      <a href="catalog.html?collection=${col.slug}" class="collection-card collection-card--${col.theme}">
        <div class="collection-card__bg"></div>
        <div class="collection-card__pattern"></div>
        <div class="collection-card__overlay"></div>
        <div class="collection-card__arrow">→</div>
        <div class="collection-card__content">
          <div class="collection-card__icon">${col.icon}</div>
          <div class="collection-card__title">${col.title}</div>
          <div class="collection-card__count">${col.productCount} products</div>
        </div>
      </a>
    `).join('');
  }

  // ─── Products Renderer ────────────────────────────────
  function renderProducts(category) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let products = DATA.products;
    if (category !== 'all') {
      products = products.filter(p => p.category === category);
    }
    // Show featured first, then all
    products = [...products.filter(p => p.featured), ...products.filter(p => !p.featured)];

    grid.innerHTML = '';

    if (products.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--c-text-muted);padding:3rem 0">No products in this category yet.</p>';
      return;
    }

    products.forEach((p, i) => {
      const card = buildProductCard(p);
      card.style.animationDelay = `${i * 0.05}s`;
      card.classList.add('animate-in');
      grid.appendChild(card);
    });
  }

  function buildProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const hasImage = product.image;
    const imgContent = hasImage
      ? `<img src="${product.image}" alt="${product.title}" class="product-card__img" loading="lazy">`
      : `<div class="product-card__img-placeholder">
           <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="50" cy="50" r="30" fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.5"/>
             <text x="50" y="55" font-family="serif" font-size="18" fill="#C9A84C" text-anchor="middle" opacity="0.4">✦</text>
           </svg>
         </div>`;

    const waOrderUrl = WA.buildOrderMessage(product, MERCHANT.whatsapp);
    const comparePrice = product.compareAtPrice
      ? `<span class="product-card__price--original">${MERCHANT.currencySymbol} ${product.compareAtPrice}</span>` : '';

    card.innerHTML = `
      <div class="product-card__media">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        ${imgContent}
        <div class="product-card__quick">
          <a href="${waOrderUrl}" class="btn btn--whatsapp" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Quick Order
          </a>
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__category">${product.category}</div>
        <div class="product-card__title">${product.title}</div>
        <div>
          <span class="product-card__price">${MERCHANT.currencySymbol} ${product.price}</span>
          ${comparePrice}
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) openModal(product);
    });

    return card;
  }

  // ─── Category Tabs ────────────────────────────────────
  function setupCategoryTabs() {
    const tabs = document.getElementById('categoryTabs');
    if (!tabs) return;
    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderProducts(btn.dataset.cat);
    });
  }

  // ─── Product Modal ────────────────────────────────────
  function setupModal() {
    const modal    = document.getElementById('productModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    if (!modal) return;

    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  function openModal(product) {
    const modal   = document.getElementById('productModal');
    const body    = document.getElementById('modalBody');
    if (!modal || !body) return;

    const waOrder   = WA.buildOrderMessage(product, MERCHANT.whatsapp);
    const waInquiry = WA.buildInquiryMessage(product, MERCHANT.whatsapp);
    const comparePrice = product.compareAtPrice
      ? `<span style="font-size:.9rem;font-weight:400;text-decoration:line-through;color:var(--c-text-muted);margin-left:.5rem">${MERCHANT.currencySymbol} ${product.compareAtPrice}</span>` : '';
    const stars = product.rating ? `
      <div style="display:flex;align-items:center;gap:4px;font-size:.8rem;color:var(--c-text-muted)">
        <span style="color:#f59e0b">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5-Math.round(product.rating))}</span>
        ${product.rating} (${product.reviewCount} reviews)
      </div>` : '';

    body.innerHTML = `
      <div class="modal-product">
        <div class="modal-product__gallery">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f2ede5,#e8dfc8)">
            <svg viewBox="0 0 200 200" style="width:50%;opacity:.3">
              <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A84C" stroke-width="1"/>
              <text x="100" y="108" font-family="serif" font-size="32" fill="#C9A84C" text-anchor="middle">✦</text>
            </svg>
          </div>
        </div>
        <div class="modal-product__info">
          <div class="modal-product__category">${product.category}</div>
          <h2 class="modal-product__title">${product.title}</h2>
          ${stars}
          <div class="modal-product__price">
            ${MERCHANT.currencySymbol} ${product.price}
            ${comparePrice}
          </div>
          <p class="modal-product__desc">${product.description}</p>
          <div class="modal-product__actions">
            <a href="${waOrder}" class="btn btn--wa-order" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Order on WhatsApp — ${MERCHANT.currencySymbol} ${product.price}
            </a>
            <a href="${waInquiry}" class="btn btn--outline" target="_blank" rel="noopener">
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // ─── Hero Slideshow ───────────────────────────────────
  function setupHeroSlideshow() {
    const track = document.getElementById('heroTrack');
    const dots  = document.querySelectorAll('.hero-dot');
    const slides = document.querySelectorAll('.hero-slide');
    if (!track || slides.length < 2) return;

    let current = 0;
    let autoTimer;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current]?.classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current]?.classList.add('is-active');
      track.style.transform = `translateX(-${current * 100}%)`;
      track.style.transition = 'transform 0.7s cubic-bezier(.4,0,.2,1)';
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    });

    function next() { goTo(current + 1); }
    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 5500);
    }

    resetAuto();

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { goTo(current + (dx < 0 ? 1 : -1)); resetAuto(); }
    });
  }

  // ─── Scroll Animations ───────────────────────────────
  function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.trust-item, .section-header, .heritage-banner__content, .heritage-banner__media').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  }

  // Expose for other scripts
  window.Platform = { openModal, renderProducts, DATA, MERCHANT, WA };

})();
