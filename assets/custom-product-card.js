/**
 * ProductCardCustom — Custom product card interactivity.
 *
 * Handles swatch click → updates images, prices, and sale badge.
 * Hover effect is pure CSS via Tailwind group-hover — no JS needed.
 *
 * All variant data lives in data-* attributes on each swatch button,
 * rendered by Liquid at build time. Zero Shopify API calls at runtime.
 */

class ProductCardCustom {
  constructor(element) {
    this.card = element;
    this.primaryImg = element.querySelector('[data-primary-image]');
    this.secondaryImg = element.querySelector('[data-secondary-image]');
    this.swatches = element.querySelectorAll('[data-swatch]');
    this.saleBadge = element.querySelector('[data-sale-badge]');
    this.regularPriceEl = element.querySelector('[data-regular-price]');
    this.comparePriceEl = element.querySelector('[data-compare-price-display]');

    // Tailwind class tokens stored as variables for maintainability.
    // If the active color or style changes, update only here.
    this.activeClass = 'tw:!ring-card-body';
    this.inactiveClass = 'tw:!ring-transparent';
    this.hoverClass = 'tw:hover:!ring-gray-400';

    this._init();
  }

  _init() {
    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        this._onSwatchClick(swatch);
      });
    });
  }

  _onSwatchClick(swatch) {
    const primarySrc = swatch.dataset.primarySrc;
    const secondarySrc = swatch.dataset.secondarySrc;
    const price = swatch.dataset.price;
    const comparePrice = swatch.dataset.comparePrice;
    const onSale = swatch.dataset.onSale === 'true';

    // Update "On Sale!" badge
    if (this.saleBadge) {
      this.saleBadge.classList.toggle('tw:hidden', !onSale);
    }

    // Update sale price
    if (this.regularPriceEl && price) {
      this.regularPriceEl.textContent = price;
      this.regularPriceEl.classList.toggle('tw:text-card-sale', onSale);
      this.regularPriceEl.classList.toggle('tw:text-card-body', !onSale);
    }

    // Update compare-at (strikethrough) price
    if (this.comparePriceEl) {
      if (onSale && comparePrice) {
        this.comparePriceEl.textContent = comparePrice;
        this.comparePriceEl.classList.remove('tw:hidden');
      } else {
        this.comparePriceEl.classList.add('tw:hidden');
      }
    }

    // Update primary image
    if (primarySrc && this.primaryImg) {
      this.primaryImg.src = primarySrc;
    }

    // Update secondary (hover) image
    if (this.secondaryImg) {
      if (secondarySrc) {
        this.secondaryImg.src = secondarySrc;
        this.primaryImg?.classList.add('tw:group-hover:opacity-0');
      } else {
        this.secondaryImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        this.primaryImg?.classList.remove('tw:group-hover:opacity-0');
      }
    }

    // Update swatch active state
    this._setActive(swatch);
  }

  _setActive(activeSwatch) {
    this.swatches.forEach((s) => {
      s.classList.remove(this.activeClass);
      s.classList.add(this.inactiveClass);
      s.classList.add(this.hoverClass);
    });

    activeSwatch.classList.remove(this.inactiveClass);
    activeSwatch.classList.remove(this.hoverClass);
    activeSwatch.classList.add(this.activeClass);
  }
}

// Initialize all product cards on the page
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-product-card]').forEach((card) => {
    if (!card.dataset.initialized) {
      new ProductCardCustom(card);
      card.dataset.initialized = 'true';
    }
  });
});
