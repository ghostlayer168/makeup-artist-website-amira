
// ============================================
// CONFIGURATION & UTILITIES
// ============================================
const Config = {
    animation: {
        duration: {
            fast: 0.3,
            medium: 0.6,
            slow: 1
        },
        easing: {
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
            power3: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }
    },
    
    breakpoints: {
        mobile: 768,
        tablet: 992,
        desktop: 1200
    }
};

const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * offset &&
            rect.bottom >= 0
        );
    },
    
    generateId(prefix = 'id') {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    }
};

// ============================================
// MODULE: CURSOR
// ============================================
const Cursor = {
    init() {
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        
        if (!this.cursorInner || !this.cursorOuter) return;
        
        this.bindEvents();
        this.state = {
            x: 0,
            y: 0,
            lastX: 0,
            lastY: 0
        };
        
        console.log('Cursor initialized');
    },
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseover', (e) => this.onMouseOver(e));
        document.addEventListener('mouseout', (e) => this.onMouseOut(e));
        document.addEventListener('mousedown', () => this.onMouseDown());
        document.addEventListener('mouseup', () => this.onMouseUp());
    },
    
    onMouseMove(e) {
        this.state.x = e.clientX;
        this.state.y = e.clientY;
        this.updateCursorPosition();
    },
    
    updateCursorPosition() {
        gsap.to(this.cursorInner, {
            x: this.state.x,
            y: this.state.y,
            duration: 0.1,
            ease: Config.animation.easing.power3
        });
        
        gsap.to(this.cursorOuter, {
            x: this.state.x,
            y: this.state.y,
            duration: 0.3,
            ease: Config.animation.easing.power3
        });
        
        this.state.lastX = this.state.x;
        this.state.lastY = this.state.y;
    },
    
    onMouseOver(e) {
        const target = e.target;
        const isInteractive = target.matches('a, button, .hero-btn, .nav-link, .service-link, .filter-btn, .view-project-btn');
        
        if (isInteractive) {
            gsap.to(this.cursorInner, {
                scale: 1.5,
                duration: Config.animation.duration.fast,
                ease: Config.animation.easing.smooth
            });
            
            gsap.to(this.cursorOuter, {
                scale: 1.2,
                duration: Config.animation.duration.fast,
                ease: Config.animation.easing.smooth
            });
        }
    },
    
    onMouseOut(e) {
        const target = e.target;
        const isInteractive = target.matches('a, button, .hero-btn, .nav-link, .service-link, .filter-btn, .view-project-btn');
        
        if (isInteractive) {
            gsap.to(this.cursorInner, {
                scale: 1,
                duration: Config.animation.duration.fast,
                ease: Config.animation.easing.smooth
            });
            
            gsap.to(this.cursorOuter, {
                scale: 1,
                duration: Config.animation.duration.fast,
                ease: Config.animation.easing.smooth
            });
        }
    },
    
    onMouseDown() {
        gsap.to(this.cursorInner, {
            scale: 1.3,
            duration: Config.animation.duration.fast
        });
        
        gsap.to(this.cursorOuter, {
            scale: 0.8,
            duration: Config.animation.duration.fast
        });
    },
    
    onMouseUp() {
        gsap.to(this.cursorInner, {
            scale: 1,
            duration: Config.animation.duration.fast
        });
        
        gsap.to(this.cursorOuter, {
            scale: 1,
            duration: Config.animation.duration.fast
        });
    }
};

// ============================================
// MODULE: NAVIGATION
// ============================================
const Navigation = {
    init() {
        this.nav = document.querySelector('.luxury-nav');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileOverlay = null;
        
        if (!this.nav) return;
        
        this.bindEvents();
        this.handleScroll();
        this.updateNavVisibility();
        
        window.addEventListener('resize', () => this.updateNavVisibility());
        
        console.log('Navigation initialized');
    },
    
    updateNavVisibility() {
        if (window.innerWidth > 1300 && this.mobileOverlay) {
            this.closeMobileMenu();
        }
    },
    
    bindEvents() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => this.toggleMobileMenu(e));
        }
        
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    },
    
    toggleMobileMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isMobile = window.innerWidth <= 1300;
        
        if (!isMobile) return;
        
        if (this.mobileOverlay && this.mobileOverlay.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },
    
    openMobileMenu() {
        document.body.classList.add('mobile-menu-open');
        
        this.createMobileOverlay();
        
        this.mobileOverlay.classList.add('active');
        this.mobileToggle.classList.add('active');
        
        setTimeout(() => {
            this.animateMenuItems();
        }, 10);
        
        console.log('Mobile menu opened');
    },
    
    createMobileOverlay() {
        if (this.mobileOverlay) {
            this.mobileOverlay.remove();
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = this.generateMobileMenuContent();
        
        document.body.appendChild(overlay);
        this.mobileOverlay = overlay;
        
        this.bindMobileMenuEvents(overlay);
        
        return overlay;
    },
    
    generateMobileMenuContent() {
        const activeLang = document.querySelector('.lang-code')?.textContent || 'EN';
        
        return `
            <div class="mobile-menu-container">
                <!-- Close button -->
                <button class="mobile-close-btn" aria-label="Close menu">
                    <span class="close-icon"></span>
                </button>
                
                <!-- Logo in menu -->
                <div class="mobile-menu-logo">
                    <div class="symbol">A</div>
                    <div class="brand">AMIRA STUDIO</div>
                </div>
                
                <!-- Navigation - main content -->
                <nav class="mobile-menu-nav">
                    <a href="#hero" class="mobile-nav-link">
                        <span class="link-number">01</span>
                        <span class="link-text">Home</span>
                    </a>
                    
                    <a href="#about" class="mobile-nav-link">
                        <span class="link-number">02</span>
                        <span class="link-text">Philosophy</span>
                    </a>
                    
                    <a href="#services" class="mobile-nav-link">
                        <span class="link-number">03</span>
                        <span class="link-text">Services</span>
                    </a>
                    
                    <a href="#portfolio" class="mobile-nav-link">
                        <span class="link-number">04</span>
                        <span class="link-text">Portfolio</span>
                    </a>
                    
                    <a href="#contact" class="mobile-nav-link">
                        <span class="link-number">05</span>
                        <span class="link-text">Contact</span>
                    </a>
                </nav>
                
                <!-- Language selector -->
                <div class="mobile-language-section">
                    <div class="language-label">Select Language</div>
                    <div class="language-buttons">
                        <button class="language-btn ${activeLang === 'EN' ? 'active' : ''}" data-lang="en">
                            <span class="lang-text">English</span>
                            <span class="lang-code">EN</span>
                        </button>
                        
                        <button class="language-btn ${activeLang === 'SV' ? 'active' : ''}" data-lang="sv">
                            <span class="lang-text">Svenska</span>
                            <span class="lang-code">SV</span>
                        </button>
                        
                        <button class="language-btn ${activeLang === 'AR' ? 'active' : ''}" data-lang="ar">
                            <span class="lang-text">العربية</span>
                            <span class="lang-code">AR</span>
                        </button>
                    </div>
                </div>
                
                <!-- CTA button -->
                <a href="#contact" class="mobile-cta-btn">
                    <span>Book a Consultation</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <!-- Decorative elements -->
            <div class="mobile-menu-decoration">
                <div class="mobile-decor-element mde-1"></div>
                <div class="mobile-decor-element mde-2"></div>
                <div class="mobile-decor-element mde-3"></div>
            </div>
        `;
    },
    
    bindMobileMenuEvents(overlay) {
        const closeBtn = overlay.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMobileMenu();
            });
        }
        
        const navLinks = overlay.querySelectorAll('.mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMobileNavLinkClick(e);
            });
        });
        
        const langButtons = overlay.querySelectorAll('.language-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLanguageSelect(e);
            });
        });
        
        const ctaBtn = overlay.querySelector('.mobile-cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMobileNavLinkClick(e);
            });
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMobileMenu();
            }
        });
    },
    
    handleLanguageSelect(e) {
        const button = e.currentTarget;
        const lang = button.dataset.lang;
        const langCode = lang.toUpperCase();
        
        this.closeMobileMenu();
        
        let targetUrl = '';
        
        switch(lang) {
            case 'en':
                targetUrl = '../en/index.html';
                break;
            case 'sv':
                targetUrl = '../sv/index_sv.html';
                break;
            case 'ar':
                targetUrl = '../ar/index_ar.html';
                break;
            default:
                targetUrl = '../en/index.html';
        }
        
        console.log(`Switching language to: ${langCode}, redirecting to: ${targetUrl}`);
        
        localStorage.setItem('preferredLanguage', lang);
        
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    },
    
    animateMenuItems() {
        if (!this.mobileOverlay) return;
        
        const navLinks = this.mobileOverlay.querySelectorAll('.mobile-nav-link');
        const langSection = this.mobileOverlay.querySelector('.mobile-language-section');
        const ctaBtn = this.mobileOverlay.querySelector('.mobile-cta-btn');
        
        const tl = gsap.timeline();
        
        navLinks.forEach((link, index) => {
            tl.to(link, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: Config.animation.easing.smooth,
                delay: index * 0.1
            }, 0);
        });
        
        tl.to(langSection, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: Config.animation.easing.smooth
        }, navLinks.length * 0.1 + 0.1);
        
        tl.to(ctaBtn, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: Config.animation.easing.smooth
        }, '+=0.2');
    },
    
    handleMobileNavLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        this.closeMobileMenu();
        
        setTimeout(() => {
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 400);
    },
    
    closeMobileMenu() {
        if (!this.mobileOverlay) return;
        
        document.body.classList.remove('mobile-menu-open');
        
        gsap.to(this.mobileOverlay, {
            opacity: 0,
            duration: 0.4,
            ease: Config.animation.easing.smooth,
            onComplete: () => {
                this.mobileOverlay.classList.remove('active');
                this.mobileToggle.classList.remove('active');
                
                setTimeout(() => {
                    if (this.mobileOverlay && this.mobileOverlay.parentNode) {
                        this.mobileOverlay.parentNode.removeChild(this.mobileOverlay);
                        this.mobileOverlay = null;
                    }
                }, 400);
            }
        });
        
        console.log('Mobile menu closed');
    },
    
    handleScroll() {
        if (!this.nav) return;
        
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    },
    
    handleKeyDown(e) {
        if (e.key === 'Escape' && this.mobileOverlay && this.mobileOverlay.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }
};

// ============================================
// MODULE: LANGUAGE SELECTOR 
// ============================================
const Language = {
    init() {
        this.langToggle = document.getElementById('langToggle');
        this.langDropdown = document.querySelector('.lang-dropdown');
        this.langOptions = document.querySelectorAll('.lang-option');
        
        if (!this.langToggle || !this.langDropdown) return;
        
        this.bindEvents();
        
        this.restoreLanguage();
        
        console.log('Language selector initialized');
    },
    
    bindEvents() {
        if (this.langToggle) {
            this.langToggle.addEventListener('click', (e) => this.toggleDropdown(e));
        }
        
        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => this.selectLanguage(e));
        });
        
        document.addEventListener('click', (e) => this.closeDropdown(e));
    },
    
    toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        this.langDropdown.classList.toggle('active');
        this.langToggle.classList.toggle('active');
    },
    
    selectLanguage(e) {
        e.preventDefault();
        const lang = e.currentTarget.dataset.lang;
        const langCode = lang.toUpperCase();
        
        if (this.langToggle) {
            this.langToggle.querySelector('.lang-code').textContent = langCode;
        }
        
        this.closeAllDropdowns();
        
        console.log(`Language selected: ${langCode}`);
        
        gsap.to(e.currentTarget, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        localStorage.setItem('preferredLanguage', lang);
        
        let targetUrl = '';
        
        switch(lang) {
            case 'en':
                targetUrl = '../en/index.html';
                break;
            case 'sv':
                targetUrl = '../sv/index_sv.html';
                break;
            case 'ar':
                targetUrl = '../ar/index_ar.html';
                break;
            default:
                targetUrl = '../en/index.html';
        }
        
        window.location.href = targetUrl;
    },
    
    restoreLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && this.langToggle) {
            const langCode = savedLang.toUpperCase();
            this.langToggle.querySelector('.lang-code').textContent = langCode;
        }
    },
    
    closeAllDropdowns() {
        this.langDropdown?.classList.remove('active');
        this.langToggle?.classList.remove('active');
    },
    
    closeDropdown(e) {
        if (e) {
            const isLangToggle = this.langToggle?.contains(e.target);
            
            if (isLangToggle) return;
        }
        
        this.closeAllDropdowns();
    }
};

// ============================================
// MODULE: SMOOTH SCROLL
// ============================================
const SmoothScroll = {
    init() {
        this.links = document.querySelectorAll('a[href^="#"]');
        if (this.links.length === 0) return;
        this.bindEvents();
        console.log('Smooth scroll initialized');
    },
    
    bindEvents() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.scrollToTarget(e));
        });
    },
    
    scrollToTarget(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        if (window.AMIRA && window.AMIRA.Navigation) {
            window.AMIRA.Navigation.closeMobileMenu();
        }
        
        const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// ============================================
// MODULE: ACTIVE NAVIGATION ON SCROLL
// ============================================
const ActiveNav = {
    init() {
        this.sections = document.querySelectorAll('section[id], .services-preview');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.currentActive = null;
        
        if (this.sections.length === 0 || (this.navLinks.length === 0 && this.mobileNavLinks.length === 0)) return;
        
        this.bindEvents();
        this.checkActiveSection();
        console.log('Active navigation initialized');
    },
    
    bindEvents() {
        window.addEventListener('scroll', Utils.throttle(() => this.checkActiveSection(), 100));
        window.addEventListener('resize', Utils.debounce(() => this.checkActiveSection(), 250));
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    },
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        
        if (href === '#services') {
            const servicesPreview = document.querySelector('.services-preview');
            if (servicesPreview) {
                const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                const targetPosition = servicesPreview.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                this.setActiveNavLink('services-preview');
            }
        } else if (href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                this.setActiveNavLink(href.substring(1));
            }
        }
    },
    
    checkActiveSection() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight) {
                
                if (section.classList.contains('services-preview')) {
                    currentSectionId = 'services';
                } else {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });
        
        this.setActiveNavLink(currentSectionId);
    },
    
    setActiveNavLink(sectionId) {
        if (!sectionId) return;
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            const shouldBeActive = (href === `#${sectionId}`) ||
                                  (sectionId === 'services' && href === '#services');
            
            if (shouldBeActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        this.mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            const shouldBeActive = (href === `#${sectionId}`) ||
                                  (sectionId === 'services' && href === '#services');
            
            if (shouldBeActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// ============================================
// MODULE: PORTFOLIO FILTER
// ============================================
const Portfolio = {
    init() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (this.filterButtons.length === 0 || this.portfolioItems.length === 0) {
            console.log('Portfolio elements not found');
            return;
        }
        
        this.bindEvents();
        console.log('Portfolio filter initialized');
    },
    
    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.filterPortfolio(e));
        });
    },
    
    filterPortfolio(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const filterValue = button.dataset.filter;
        
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        this.portfolioItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filterValue === 'all' || filterValue === category;
            
            if (shouldShow) {
                this.showItem(item);
            } else {
                this.hideItem(item);
            }
        });
    },
    
    showItem(item) {
        item.style.display = 'block';
        gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: Config.animation.duration.medium,
            ease: Config.animation.easing.power3
        });
    },
    
    hideItem(item) {
        gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: Config.animation.duration.medium,
            ease: Config.animation.easing.power3,
            onComplete: () => {
                item.style.display = 'none';
            }
        });
    }
};

// ============================================
// MODULE: PORTFOLIO MODAL
// ============================================
const PortfolioModal = {
    init() {
        console.log('Initializing PortfolioModal...');
        
        this.modalOverlay = null;
        this.currentImageIndex = 0;
        this.portfolioImages = [];
        this.isInitialized = false;
        
        setTimeout(() => {
            this.initializeAfterLoad();
        }, 1000);
        
        console.log('Portfolio modal initialized');
    },
    
    initializeAfterLoad() {
        if (this.isInitialized) return;
        
        console.log('PortfolioModal: Starting initialization after page load');
        
        this.collectPortfolioImages();
        
        this.createModal();
        
        this.bindEvents();
        
        this.isInitialized = true;
        
        console.log(`PortfolioModal: Initialized with ${this.portfolioImages.length} images`);
    },
    
    getPortfolioDescription(item) {
        const descriptionSources = [
            () => item.getAttribute('data-description'),
            () => item.querySelector('.portfolio-description')?.textContent,
            () => item.querySelector('.portfolio-text')?.textContent,
            () => item.querySelector('p')?.textContent
        ];
        
        for (const source of descriptionSources) {
            const desc = source();
            if (desc && desc.trim().length > 10) {
                return desc.trim();
            }
        }
        
        const title = item.querySelector('.portfolio-title')?.textContent || 'Portfolio Item';
        const category = item.querySelector('.portfolio-category')?.textContent || 'Art';
        
        return `A stunning ${category.toLowerCase()} work by Amira titled "${title}". This masterpiece showcases the elegance and sophistication of Eastern couture makeup artistry, combining traditional techniques with modern aesthetics.`;
    },
    
    collectPortfolioImages() {
        console.log('PortfolioModal: Starting portfolio image collection');
        
        this.portfolioImages = [];
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        console.log('PortfolioModal: Found portfolio items:', portfolioItems.length);
        
        if (portfolioItems.length === 0) {
            console.warn('PortfolioModal: Portfolio items not found!');
            return;
        }
        
        portfolioItems.forEach((item, index) => {
            const img = item.querySelector('.portfolio-img');
            if (!img) {
                console.warn(`PortfolioModal: Image not found in item ${index}`);
                return;
            }
            
            const title = item.querySelector('.portfolio-title')?.textContent || `Portfolio ${index + 1}`;
            const category = item.querySelector('.portfolio-category')?.textContent || 'Uncategorized';
            const description = this.getPortfolioDescription(item);
            
            this.portfolioImages.push({
                src: img.src,
                alt: img.alt || title,
                title: title,
                category: category,
                description: description,
                index: index
            });
            
            console.log(`PortfolioModal: Added image ${index}:`, title);
        });
        
        console.log('PortfolioModal: Total images collected:', this.portfolioImages.length);
    },
    
    createModal() {
        if (document.getElementById('portfolioModal')) {
            this.modalOverlay = document.getElementById('portfolioModal');
            console.log('PortfolioModal: Modal already exists');
            return;
        }
        
        console.log('PortfolioModal: Creating modal');
        
        const modalHTML = `
            <div class="modal-overlay" id="portfolioModal">
                <div class="modal-container">
                    <button class="modal-close" aria-label="Close modal"></button>
                    
                    <div class="modal-progress">
                        <div class="progress-dots">
                            ${this.portfolioImages.map((_, i) => 
                                `<div class="progress-dot ${i === 0 ? 'active' : ''}"></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <!-- LEFT PART: IMAGE -->
                    <div class="modal-gallery">
                        <div class="modal-image-wrapper">
                            <img class="modal-image" src="" alt="">
                            <div class="modal-loading">
                                <div class="loading-spinner"></div>
                            </div>
                        </div>
                        
                        <div class="modal-nav">
                            <button class="modal-prev">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="modal-next">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        
                        <div class="modal-counter">
                            <span class="current-index">1</span> / <span class="total-images">${this.portfolioImages.length}</span>
                        </div>
                    </div>
                    
                    <!-- RIGHT PART: DESCRIPTION -->
                    <div class="modal-sidebar">
                        <div class="modal-header">
                            <h3 class="modal-title">Portfolio Image</h3>
                            <p class="modal-category">Category</p>
                        </div>
                        
                        <div class="modal-description">
                            <p>Loading description...</p>
                        </div>
                        
                        <div class="modal-meta">
                            <div class="meta-grid">
                                <div class="meta-item">
                                    <div class="meta-label">Client</div>
                                    <div class="meta-value">Amira Studio</div>
                                </div>
                                <div class="meta-item">
                                    <div class="meta-label">Date</div>
                                    <div class="meta-value">${new Date().getFullYear()}</div>
                                </div>
                                <div class="meta-item">
                                    <div class="meta-label">Location</div>
                                    <div class="meta-value">Dubai, UAE</div>
                                </div>
                                <div class="meta-item">
                                    <div class="meta-label">Service</div>
                                    <div class="meta-value">Bridal Couture</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-tech">
                            <span class="tech-tag">Traditional</span>
                            <span class="tech-tag">Gold Accents</span>
                            <span class="tech-tag">Hand-painted</span>
                            <span class="tech-tag">Luxury</span>
                        </div>
                    </div>
                    
                    <div class="modal-hint">
                        <span class="hint-key">ESC</span> to close • 
                        <span class="hint-key">←</span> 
                        <span class="hint-key">→</span> to navigate
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modalOverlay = document.getElementById('portfolioModal');
        
        console.log('PortfolioModal: Modal created');
    },
    
    bindEvents() {
        console.log('PortfolioModal: Binding events...');
        
        this.bindViewButtons();
        
        this.bindPortfolioItems();
        
        this.bindModalEvents();
        
        this.bindKeyboardEvents();
        
        console.log('PortfolioModal: Events bound');
    },
    
    bindViewButtons() {
        const viewButtons = document.querySelectorAll('.view-project-btn');
        console.log('PortfolioModal: Found view buttons:', viewButtons.length);
        
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`PortfolioModal: Click on view button ${index}`);
                this.openModal(index);
            });
        });
        
        if (viewButtons.length === 0) {
            console.warn('PortfolioModal: View buttons not found!');
        }
    },
    
    bindPortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        console.log('PortfolioModal: Binding events to portfolio cards:', portfolioItems.length);
        
        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.view-project-btn')) {
                    console.log(`PortfolioModal: Click on portfolio card ${index}`);
                    this.openModal(index);
                }
            });
        });
    },
    
    bindModalEvents() {
        const closeBtn = this.modalOverlay?.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        const prevBtn = this.modalOverlay?.querySelector('.modal-prev');
        const nextBtn = this.modalOverlay?.querySelector('.modal-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prevImage();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextImage();
            });
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }
    },
    
    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
            
            if (this.modalOverlay && this.modalOverlay.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    this.prevImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });
    },
    
    openModal(index) {
        console.log(`PortfolioModal: Opening modal for index ${index}`);
        
        if (!this.modalOverlay) {
            console.error('PortfolioModal: Modal not created!');
            this.createModal();
        }
        
        if (this.portfolioImages.length === 0) {
            console.warn('PortfolioModal: No portfolio images!');
            this.collectPortfolioImages();
            
            if (this.portfolioImages.length === 0) {
                alert('Portfolio images not loaded. Please refresh the page.');
                return;
            }
        }
        
        if (index < 0 || index >= this.portfolioImages.length) {
            console.error(`PortfolioModal: Invalid index ${index}. Valid range: 0-${this.portfolioImages.length - 1}`);
            index = 0;
        }
        
        this.currentImageIndex = index;
        const imageData = this.portfolioImages[index];
        
        console.log('PortfolioModal: Opening image:', imageData.title);
        
        this.updateModalContent(imageData);
        
        this.showModal();
        
        document.body.style.overflow = 'hidden';
        
        console.log('PortfolioModal: Modal opened');
    },
    
    updateModalContent(imageData) {
        const modalImage = this.modalOverlay.querySelector('.modal-image');
        const modalTitle = this.modalOverlay.querySelector('.modal-title');
        const modalCategory = this.modalOverlay.querySelector('.modal-category');
        const modalDescription = this.modalOverlay.querySelector('.modal-description p');
        const modalCounter = this.modalOverlay.querySelector('.modal-counter');
        const modalLoading = this.modalOverlay.querySelector('.modal-loading');
        const currentIndex = this.modalOverlay.querySelector('.current-index');
        const totalImages = this.modalOverlay.querySelector('.total-images');
        
        const metaClient = this.modalOverlay.querySelector('.meta-item:nth-child(1) .meta-value');
        const metaDate = this.modalOverlay.querySelector('.meta-item:nth-child(2) .meta-value');
        const metaService = this.modalOverlay.querySelector('.meta-item:nth-child(4) .meta-value');
        
        if (modalLoading) {
            modalLoading.style.display = 'grid';
        }
        
        if (modalImage) {
            modalImage.style.opacity = '0';
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;
            
            modalImage.onload = () => {
                if (modalLoading) {
                    modalLoading.style.display = 'none';
                }
                modalImage.style.opacity = '1';
                modalImage.classList.add('loaded');
            };
            
            modalImage.onerror = () => {
                console.error('PortfolioModal: Error loading image:', imageData.src);
                if (modalLoading) {
                    modalLoading.style.display = 'none';
                }
            };
        }
        
        if (modalTitle) {
            modalTitle.textContent = imageData.title;
        }
        
        if (modalCategory) {
            modalCategory.textContent = imageData.category;
        }
        
        if (modalDescription) {
            modalDescription.textContent = imageData.description;
        }
        
        if (currentIndex) {
            currentIndex.textContent = this.currentImageIndex + 1;
        }
        
        if (totalImages) {
            totalImages.textContent = this.portfolioImages.length;
        }
        
        if (metaClient) {
            metaClient.textContent = 'Amira Studio';
        }
        
        if (metaDate) {
            metaDate.textContent = new Date().getFullYear();
        }
        
        if (metaService) {
            metaService.textContent = imageData.category;
        }
        
        this.updateProgressDots();
    },
    
    updateProgressDots() {
        const dots = this.modalOverlay.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    },
    
    showModal() {
        if (!this.modalOverlay) return;
        
        this.modalOverlay.classList.add('active');
        
        const modalContainer = this.modalOverlay.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modalContainer.style.opacity = '1';
                modalContainer.style.transform = 'scale(1)';
                modalContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 10);
        }
    },
    
    closeModal() {
        if (!this.modalOverlay) return;
        
        console.log('PortfolioModal: Closing modal');
        
        const modalContainer = this.modalOverlay.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'scale(0.9)';
            modalContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
        
        setTimeout(() => {
            this.modalOverlay.classList.remove('active');
            
            document.body.style.overflow = '';
            
            console.log('PortfolioModal: Modal closed');
        }, 300);
    },
    
    prevImage() {
        if (this.portfolioImages.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex - 1 + this.portfolioImages.length) % this.portfolioImages.length;
        const imageData = this.portfolioImages[this.currentImageIndex];
        this.updateModalContent(imageData);
        this.updateProgressDots();
    },
    
    nextImage() {
        if (this.portfolioImages.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex + 1) % this.portfolioImages.length;
        const imageData = this.portfolioImages[this.currentImageIndex];
        this.updateModalContent(imageData);
        this.updateProgressDots();
    }
};

// ============================================
// MODULE: TESTIMONIALS SLIDER
// ============================================
const Testimonials = {
    init() {
        this.testimonialItems = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.nav-dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        if (this.testimonialItems.length === 0) {
            console.log('Testimonial elements not found');
            return;
        }
        
        this.currentIndex = 0;
        this.totalItems = this.testimonialItems.length;
        this.autoRotateInterval = null;
        
        this.bindEvents();
        this.initSlider();
        this.startAutoRotate();
        
        console.log('Testimonials slider initialized');
    },
    
    bindEvents() {
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoRotate());
            slider.addEventListener('mouseleave', () => this.startAutoRotate());
        }
    },
    
    initSlider() {
        this.testimonialItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.position = 'absolute';
            item.style.top = '0';
            item.style.left = '0';
            item.style.width = '100%';
            item.style.transition = 'opacity 0.6s ease';
        });
        
        if (this.testimonialItems.length > 0) {
            this.testimonialItems[0].style.opacity = '1';
            this.testimonialItems[0].style.position = 'relative';
        }
        
        if (this.dots && this.dots.length > 0) {
            this.dots[0].classList.add('active');
        }
    },
    
    goToSlide(index) {
        if (index === this.currentIndex) return;
        this.currentIndex = index;
        this.showSlide();
        this.restartAutoRotate();
    },
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.showSlide();
        this.restartAutoRotate();
    },
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.showSlide();
        this.restartAutoRotate();
    },
    
    showSlide() {
        const currentVisible = Array.from(this.testimonialItems).find(item => 
            item.style.opacity === '1' || getComputedStyle(item).opacity === '1'
        );
        
        if (currentVisible) {
            gsap.to(currentVisible, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    currentVisible.style.position = 'absolute';
                    const newItem = this.testimonialItems[this.currentIndex];
                    newItem.style.position = 'relative';
                    
                    gsap.to(newItem, {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: 0.1
                    });
                    
                    this.updateDots();
                }
            });
        } else {
            const newItem = this.testimonialItems[this.currentIndex];
            newItem.style.position = 'relative';
            gsap.to(newItem, {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            });
            this.updateDots();
        }
    },
    
    updateDots() {
        if (!this.dots) return;
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },
    
    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, 8000);
    },
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    },
    
    restartAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }
};

// ============================================
// MODULE: CONTACT FORM
// ============================================
const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.bindEvents();
        console.log('Contact form initialized');
    },
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showError('Please fill in all required fields correctly.');
            return;
        }
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        this.showLoading();
        
        setTimeout(() => {
            this.handleSuccess(data);
        }, 1500);
    },
    
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField(field) {
        let isValid = true;
        this.clearFieldError(field);
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                this.showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    },
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        
        gsap.to(field, {
            x: [-5, 5, -5, 5, 0],
            duration: 0.5,
            ease: "power2.out"
        });
    },
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    },
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-notification';
        errorDiv.style.cssText = `
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid #ff6b6b;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #ff6b6b;
        `;
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        gsap.from(errorDiv, {
            opacity: 0,
            y: -20,
            duration: 0.3
        });
        
        setTimeout(() => {
            gsap.to(errorDiv, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => errorDiv.remove()
            });
        }, 5000);
    },
    
    showLoading() {
        const submitBtn = this.form.querySelector('.submit-btn');
        this.originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
    },
    
    handleSuccess(data) {
        console.log('Form submitted:', data);
        
        gsap.to(this.form, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            onComplete: () => {
                this.form.style.display = 'none';
                this.showSuccessMessage();
            }
        });
    },
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.style.cssText = `
            text-align: center;
            padding: 40px 20px;
        `;
        successDiv.innerHTML = `
            <div class="success-icon" style="font-size: 4rem; color: var(--gold-primary); margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="font-family: var(--font-display); margin-bottom: 15px;">Thank You!</h3>
            <p style="margin-bottom: 25px; opacity: 0.8;">Your consultation request has been received.</p>
            <button class="success-btn" id="sendAnotherBtn" style="
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 12px 24px;
                background: transparent;
                border: 1px solid var(--gold-primary);
                border-radius: var(--radius-sm);
                color: var(--gold-primary);
                cursor: pointer;
                transition: var(--transition-fast);
            ">
                <span>Send Another Message</span>
                <i class="fas fa-redo"></i>
            </button>
        `;
        
        this.form.parentNode.appendChild(successDiv);
        
        gsap.from(successDiv, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: Config.animation.easing.bounce
        });
        
        document.getElementById('sendAnotherBtn').addEventListener('click', () => this.resetForm());
    },
    
    resetForm() {
        const successDiv = document.querySelector('.form-success-message');
        const submitBtn = this.form.querySelector('.submit-btn');
        
        gsap.to(successDiv, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            onComplete: () => {
                successDiv.remove();
                this.form.reset();
                this.form.style.display = 'block';
                
                if (this.originalBtnContent) {
                    submitBtn.innerHTML = this.originalBtnContent;
                    submitBtn.disabled = false;
                }
                
                gsap.from(this.form, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                });
            }
        });
    }
};

// ============================================
// MODULE: ANIMATIONS
// ============================================
const Animations = {
    init() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.initObservers();
        console.log('Animations initialized');
    },
    
    initObservers() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            
            const animatedElements = document.querySelectorAll(
                '.philosophy-card, .service-item, .portfolio-item, .testimonial-item, .info-card'
            );
            
            animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    },
    
    animateElement(element) {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: Config.animation.easing.power3
        });
    }
};

// ============================================
// MAIN INITIALIZATION
// ============================================
const PageLoader = {
    init() {
        console.log('AMIRA Website - Eastern Couture Makeup Artistry');
        document.documentElement.classList.remove('no-js');
        
        this.restoreLanguage();
        
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            this.initPreloader();
        } else {
            this.initializeApp();
        }
    },
    
    restoreLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const langCode = savedLang.toUpperCase();
            const mainLangBtn = document.querySelector('.lang-code');
            if (mainLangBtn) {
                mainLangBtn.textContent = langCode;
            }
        }
    },
    
    initPreloader() {
        const loadingScreen = document.querySelector('.loading-screen');
        const progressFill = document.querySelector('.progress-fill');
        const percentage = document.querySelector('.percentage');
        const loadingMessage = document.querySelector('.loading-message');
        
        if (!loadingScreen) {
            this.initializeApp();
            return;
        }
        
        const messages = [
            "Loading Luxury Assets",
            "Initializing Artistry",
            "Preparing Experience",
            "Almost Ready"
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (percentage) percentage.textContent = `${progress}%`;
            
            if (loadingMessage) {
                if (progress < 25) loadingMessage.textContent = messages[0];
                else if (progress < 50) loadingMessage.textContent = messages[1];
                else if (progress < 75) loadingMessage.textContent = messages[2];
                else loadingMessage.textContent = messages[3];
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                this.completeLoading();
            }
        }, 30);
        
        setTimeout(() => {
            if (progress < 100) {
                clearInterval(interval);
                this.completeLoading();
            }
        }, 5000);
    },
    
    completeLoading() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (!loadingScreen) {
            this.initializeApp();
            return;
        }
        
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            ease: Config.animation.easing.power3,
            onComplete: () => {
                loadingScreen.style.visibility = 'hidden';
                document.body.classList.add('loaded');
                this.initializeApp();
            }
        });
    },
    
    initializeApp() {
        console.log('Initializing application...');
        
        try {
            Cursor.init();
            Navigation.init();
            Language.init();
            SmoothScroll.init();
            ActiveNav.init();
            Portfolio.init();
            PortfolioModal.init();
            Testimonials.init();
            ContactForm.init();
            Animations.init();
            
            console.log('AMIRA Website fully loaded! ✨');
            
            this.initParallax();
            
        } catch (error) {
            console.error('Initialization error:', error);
        }
    },
    
    initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage || window.innerWidth < 768) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PageLoader.init());
} else {
    PageLoader.init();
}

// Export modules for global access
window.AMIRA = {
    Config,
    Utils,
    Cursor,
    Navigation,
    Language,
    SmoothScroll,
    ActiveNav,
    Portfolio,
    PortfolioModal,
    Testimonials,
    ContactForm,
    Animations,
    PageLoader
};

// Global function for testing modal
window.testPortfolioModal = function(index = 0) {
    if (window.AMIRA && window.AMIRA.PortfolioModal) {
        window.AMIRA.PortfolioModal.openModal(index);
    } else {
        console.error('PortfolioModal not initialized');
    }
};
