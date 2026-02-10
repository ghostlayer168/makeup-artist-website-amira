// ============================================
// CONFIGURATION & UTILITIES
// ============================================
const ServicesConfig = {
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
    }
};

// Utilities for services.js
const ServicesUtils = {
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
    }
};

// ============================================
// MODULE: SERVICES CURSOR
// ============================================
const ServicesCursor = {
    init() {
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        
        if (!this.cursorInner || !this.cursorOuter) {
            console.log('Cursor elements not found, skipping cursor initialization');
            return;
        }
        
        this.bindEvents();
        this.state = {
            x: 0,
            y: 0,
            lastX: 0,
            lastY: 0
        };
        
        console.log('Services cursor initialized');
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
        if (typeof gsap !== 'undefined') {
            gsap.to(this.cursorInner, {
                x: this.state.x,
                y: this.state.y,
                duration: 0.1,
                ease: ServicesConfig.animation.easing.power3
            });
            
            gsap.to(this.cursorOuter, {
                x: this.state.x,
                y: this.state.y,
                duration: 0.3,
                ease: ServicesConfig.animation.easing.power3
            });
        } else {
            // Fallback without GSAP
            this.cursorInner.style.transform = `translate(${this.state.x}px, ${this.state.y}px)`;
            this.cursorOuter.style.transform = `translate(${this.state.x}px, ${this.state.y}px)`;
        }
        
        this.state.lastX = this.state.x;
        this.state.lastY = this.state.y;
    },
    
    onMouseOver(e) {
        const target = e.target;
        const isInteractive = target.matches('a, button, .hero-btn, .nav-link, .service-link, .filter-btn, .view-project-btn, .service-nav-btn, .service-book-btn, .faq-question, .cta-btn, .mobile-cta-btn, .lang-toggle, .mobile-close-btn');
        
        if (isInteractive && this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1.5,
                    duration: ServicesConfig.animation.duration.fast,
                    ease: ServicesConfig.animation.easing.smooth
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1.2,
                    duration: ServicesConfig.animation.duration.fast,
                    ease: ServicesConfig.animation.easing.smooth
                });
            } else {
                this.cursorInner.style.transform += ' scale(1.5)';
                this.cursorOuter.style.transform += ' scale(1.2)';
                this.cursorInner.style.transition = 'transform 0.3s ease';
                this.cursorOuter.style.transition = 'transform 0.3s ease';
            }
        }
    },
    
    onMouseOut(e) {
        const target = e.target;
        const isInteractive = target.matches('a, button, .hero-btn, .nav-link, .service-link, .filter-btn, .view-project-btn, .service-nav-btn, .service-book-btn, .faq-question, .cta-btn, .mobile-cta-btn, .lang-toggle, .mobile-close-btn');
        
        if (isInteractive && this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1,
                    duration: ServicesConfig.animation.duration.fast,
                    ease: ServicesConfig.animation.easing.smooth
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1,
                    duration: ServicesConfig.animation.duration.fast,
                    ease: ServicesConfig.animation.easing.smooth
                });
            } else {
                this.cursorInner.style.transform = this.cursorInner.style.transform.replace(' scale(1.5)', '');
                this.cursorOuter.style.transform = this.cursorOuter.style.transform.replace(' scale(1.2)', '');
            }
        }
    },
    
    onMouseDown() {
        if (this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1.3,
                    duration: ServicesConfig.animation.duration.fast
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 0.8,
                    duration: ServicesConfig.animation.duration.fast
                });
            } else {
                this.cursorInner.style.transform += ' scale(1.3)';
                this.cursorOuter.style.transform += ' scale(0.8)';
            }
        }
    },
    
    onMouseUp() {
        if (this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1,
                    duration: ServicesConfig.animation.duration.fast
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1,
                    duration: ServicesConfig.animation.duration.fast
                });
            } else {
                this.cursorInner.style.transform = this.cursorInner.style.transform.replace(' scale(1.3)', '');
                this.cursorOuter.style.transform = this.cursorOuter.style.transform.replace(' scale(0.8)', '');
            }
        }
    }
};

// ============================================
// PAGE LOADER
// ============================================
const ServicesPageLoader = {
    init() {
        console.log('Services page loader initializing...');
        
        // Restore language from localStorage
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
        
        // Detect language for preloader messages
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        let messages;
        
        if (currentLang === 'ar') {
            // Arabic messages with Eastern Arabic numerals
            messages = [
                "جارٍ تحميل الأصول الفاخرة",
                "جارٍ تهيئة الإبداع الفني",
                "جارٍ إعداد التجربة",
                "جاهز تقريبًا"
            ];
        } else {
            // English messages (default)
            messages = [
                "Loading Luxury Assets",
                "Initializing Artistry",
                "Preparing Experience",
                "Almost Ready"
            ];
        }
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (percentage) {
                // Use Eastern Arabic numerals for Arabic version
                if (currentLang === 'ar') {
                    percentage.textContent = this.convertToArabicNumerals(progress) + '%';
                } else {
                    percentage.textContent = `${progress}%`;
                }
            }
            
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
    
    // Convert Western Arabic numerals to Eastern Arabic numerals
    convertToArabicNumerals(number) {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
    },
    
    completeLoading() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (!loadingScreen) {
            this.initializeApp();
            return;
        }
        
        if (typeof gsap !== 'undefined') {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                ease: ServicesConfig.animation.easing.power3,
                onComplete: () => {
                    loadingScreen.style.visibility = 'hidden';
                    document.body.classList.add('loaded');
                    this.initializeApp();
                }
            });
        } else {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.visibility = 'hidden';
                document.body.classList.add('loaded');
                this.initializeApp();
            }, 1000);
        }
    },
    
    initializeApp() {
        console.log('Initializing services page...');
        
        try {
            // Initialize cursor first
            ServicesCursor.init();
            ServicesPage.init();
            ServicesNavigation.init();
            ServicesLanguage.init();
            console.log('Services page fully loaded! ✨');
        } catch (error) {
            console.error('Error initializing services page:', error);
        }
    }
};

// ============================================
// MODULE: SERVICES NAVIGATION
// ============================================
const ServicesNavigation = {
    init() {
        this.nav = document.querySelector('.luxury-nav');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileOverlay = null;
        
        if (!this.nav) return;
        
        this.bindEvents();
        this.handleScroll();
        this.updateNavVisibility();
        
        window.addEventListener('resize', () => this.updateNavVisibility());
        
        console.log('Services Navigation initialized');
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
        
        window.addEventListener('scroll', ServicesUtils.throttle(() => this.handleScroll(), 100));
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
        document.body.style.overflow = 'hidden';
        
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
        const currentPage = window.location.pathname.split('/').pop();
        
        // Detect language for mobile menu content
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        
        // Menu items based on language
        let menuItems = [];
        if (currentLang === 'ar') {
            menuItems = [
                { number: '٠١', text: 'الرئيسية', href: '../ar/index_ar.html', active: currentPage === 'index_ar.html' },
                { number: '٠٢', text: 'الفلسفة', href: '../ar/index_ar.html#philosophy', active: false },
                { number: '٠٣', text: 'الخدمات', href: '../ar/services_ar.html', active: currentPage === 'services_ar.html' },
                { number: '٠٤', text: 'المحفظة', href: '../ar/index_ar.html#portfolio', active: false },
                { number: '٠٥', text: 'اتصل بنا', href: '../ar/index_ar.html#contact', active: false }
            ];
        } else if (currentLang === 'sv') {
            menuItems = [
                { number: '01', text: 'Hem', href: '../sv/index_sv.html', active: currentPage === 'index_sv.html' },
                { number: '02', text: 'Filosofi', href: '../sv/index_sv.html#philosophy', active: false },
                { number: '03', text: 'Tjänster', href: '../sv/services_sv.html', active: currentPage === 'services_sv.html' },
                { number: '04', text: 'Portfolio', href: '../sv/index_sv.html#portfolio', active: false },
                { number: '05', text: 'Kontakt', href: '../sv/index_sv.html#contact', active: false }
            ];
        } else {
            // English (default)
            menuItems = [
                { number: '01', text: 'Home', href: '../en/index.html', active: currentPage === 'index.html' || currentPage === '' },
                { number: '02', text: 'Philosophy', href: '../en/index.html#philosophy', active: false },
                { number: '03', text: 'Services', href: '../en/services.html', active: currentPage === 'services.html' },
                { number: '04', text: 'Portfolio', href: '../en/index.html#portfolio', active: false },
                { number: '05', text: 'Contact', href: '../en/index.html#contact', active: false }
            ];
        }
        
        // Language buttons
        const languageButtons = [
            { code: 'EN', text: 'English', lang: 'en', active: activeLang === 'EN' },
            { code: 'SV', text: 'Svenska', lang: 'sv', active: activeLang === 'SV' },
            { code: 'AR', text: 'العربية', lang: 'ar', active: activeLang === 'AR' }
        ];
        
        // CTA button text
        let ctaText = "Book a Consultation";
        if (currentLang === 'ar') ctaText = "احجز استشارة";
        else if (currentLang === 'sv') ctaText = "Boka en Konsultation";
        
        // Language label
        let languageLabel = "Select Language";
        if (currentLang === 'ar') languageLabel = "اختر اللغة";
        else if (currentLang === 'sv') languageLabel = "Välj Språk";
        
        return `
            <div class="mobile-menu-container">
                <button class="mobile-close-btn" aria-label="Close menu">
                    <span class="close-icon"></span>
                </button>
                
                <div class="mobile-menu-logo">
                    <div class="symbol">A</div>
                    <div class="brand">AMIRA STUDIO</div>
                </div>
                
                <nav class="mobile-menu-nav">
                    ${menuItems.map(item => `
                        <a href="${item.href}" class="mobile-nav-link ${item.active ? 'active' : ''}">
                            <span class="link-number">${item.number}</span>
                            <span class="link-text">${item.text}</span>
                        </a>
                    `).join('')}
                </nav>
                
                <div class="mobile-language-section">
                    <div class="language-label">${languageLabel}</div>
                    <div class="language-buttons">
                        ${languageButtons.map(btn => `
                            <button class="language-btn ${btn.active ? 'active' : ''}" data-lang="${btn.lang}">
                                <span class="lang-text">${btn.text}</span>
                                <span class="lang-code">${btn.code}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <a href="../${currentLang}/${currentLang === 'en' ? 'index.html' : currentLang === 'sv' ? 'index_sv.html' : 'index_ar.html'}#contact" class="mobile-cta-btn">
                    <span>${ctaText}</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
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
                targetUrl = '../en/services.html';
                break;
            case 'sv':
                targetUrl = '../sv/services_sv.html';
                break;
            case 'ar':
                targetUrl = '../ar/services_ar.html';
                break;
            default:
                targetUrl = '../en/services.html';
        }
        
        console.log(`Switching language to: ${langCode}, redirecting to: ${targetUrl}`);
        
        localStorage.setItem('preferredLanguage', lang);
        
        if (typeof gsap !== 'undefined') {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    },
    
    animateMenuItems() {
        if (!this.mobileOverlay || typeof gsap === 'undefined') return;
        
        const navLinks = this.mobileOverlay.querySelectorAll('.mobile-nav-link');
        const langSection = this.mobileOverlay.querySelector('.mobile-language-section');
        const ctaBtn = this.mobileOverlay.querySelector('.mobile-cta-btn');
        
        const tl = gsap.timeline();
        
        navLinks.forEach((link, index) => {
            tl.to(link, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: ServicesConfig.animation.easing.smooth,
                delay: index * 0.1
            }, 0);
        });
        
        tl.to(langSection, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: ServicesConfig.animation.easing.smooth
        }, navLinks.length * 0.1 + 0.1);
        
        tl.to(ctaBtn, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: ServicesConfig.animation.easing.smooth
        }, '+=0.2');
    },
    
    handleMobileNavLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        this.closeMobileMenu();
        
        setTimeout(() => {
            if (href.includes('.html')) {
                window.location.href = href;
            } else if (href.startsWith('#')) {
                if (href === '#hero' && window.location.pathname.includes('services.html')) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    window.location.href = href;
                }
            }
        }, 400);
    },
    
    closeMobileMenu() {
        if (!this.mobileOverlay) return;
        
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
        
        if (typeof gsap !== 'undefined') {
            gsap.to(this.mobileOverlay, {
                opacity: 0,
                duration: 0.4,
                ease: ServicesConfig.animation.easing.smooth,
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
        } else {
            this.mobileOverlay.style.opacity = '0';
            setTimeout(() => {
                this.mobileOverlay.classList.remove('active');
                this.mobileToggle.classList.remove('active');
                if (this.mobileOverlay && this.mobileOverlay.parentNode) {
                    this.mobileOverlay.parentNode.removeChild(this.mobileOverlay);
                    this.mobileOverlay = null;
                }
            }, 400);
        }
        
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
const ServicesLanguage = {
    init() {
        this.langToggle = document.getElementById('langToggle');
        this.langDropdown = document.querySelector('.lang-dropdown');
        this.langOptions = document.querySelectorAll('.lang-option');
        
        if (!this.langToggle || !this.langDropdown) return;
        
        this.bindEvents();
        
        this.restoreLanguage();
        
        console.log('Services Language selector initialized');
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
        
        if (typeof gsap !== 'undefined') {
            gsap.to(e.currentTarget, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
        
        localStorage.setItem('preferredLanguage', lang);
        
        let targetUrl = '';
        
        switch(lang) {
            case 'en':
                targetUrl = '../en/services.html';
                break;
            case 'sv':
                targetUrl = '../sv/services_sv.html';
                break;
            case 'ar':
                targetUrl = '../ar/services_ar.html';
                break;
            default:
                targetUrl = '../en/services.html';
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
// MAIN SERVICES PAGE MODULE
// ============================================
const ServicesPage = {
    init() {
        console.log('Services page initialized');
        
        this.restoreLanguage();
        
        this.initPageNavigation();
        this.initServiceNavigation();
        this.initVerticalGallery();
        this.initFAQ();
        this.initScrollAnimations();
        this.bindEvents();
        
        this.checkUrlHash();
        this.updateActiveNavLink();
        
        console.log('All services modules initialized');
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
    
    initPageNavigation() {
        console.log('Initializing page navigation...');
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLink(e));
        });
        
        const bookNowBtn = document.querySelector('.cta-btn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', (e) => this.handleBookNow(e));
        }
        
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleFooterLink(e));
        });
    },
    
    handleNavLink(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        console.log('Navigation link clicked:', href);
        
        if (href.includes('.html') && !href.includes('index.html#')) {
            window.location.href = href;
            return;
        }
        
        if (href.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(href);
            return;
        }
        
        if (href.includes('index.html#')) {
            window.location.href = href;
        }
    },
    
    navigateTo(href) {
        console.log('Navigating to:', href);
        
        if (href.startsWith('#')) {
            this.scrollToSection(href);
            return;
        }
        
        if (href.includes('.html#')) {
            const parts = href.split('#');
            const page = parts[0];
            const section = parts[1] ? '#' + parts[1] : '';
            
            if (page === 'index.html' || page === './index.html') {
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    if (section) {
                        this.scrollToSection(section);
                    }
                } else {
                    window.location.href = page + (section ? section : '');
                }
                return;
            }
            
            if (page && page !== window.location.pathname.split('/').pop()) {
                window.location.href = href;
            } else if (section) {
                this.scrollToSection(section);
            }
            return;
        }
        
        if (href.includes('.html')) {
            window.location.href = href;
            return;
        }
    },
    
    scrollToSection(sectionId) {
        console.log('Scrolling to section:', sectionId);
        
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn('Section not found:', sectionId);
        }
    },
    
    handleBookNow(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        this.navigateTo(href);
    },
    
    handleFooterLink(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        console.log('Footer link clicked:', href);
        
        if (href.startsWith('#')) {
            this.scrollToSection(href);
        } else if (href.includes('.html')) {
            window.location.href = href;
        }
    },
    
    updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'services.html' && linkHref === 'services.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
    
    checkUrlHash() {
        if (window.location.hash) {
            const serviceId = window.location.hash.substring(1);
            setTimeout(() => {
                this.scrollToService(serviceId);
                this.updateServiceNav(serviceId);
            }, 800);
        }
    },
    
    initServiceNavigation() {
        const navButtons = document.querySelectorAll('.service-nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href').substring(1);
                this.scrollToService(targetId);
                this.updateServiceNav(targetId);
            });
        });
        
        window.addEventListener('scroll', () => {
            this.updateNavOnScroll();
        });
    },
    
    scrollToService(serviceId) {
        const serviceElement = document.getElementById(serviceId);
        if (!serviceElement) return;
        
        const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
        const navHeight = document.querySelector('.services-navigation')?.offsetHeight || 0;
        const offset = headerHeight + navHeight + 40;
        
        const targetPosition = serviceElement.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        history.replaceState(null, null, `#${serviceId}`);
    },
    
    updateServiceNav(serviceId) {
        const navButtons = document.querySelectorAll('.service-nav-btn');
        navButtons.forEach(button => {
            const targetId = button.getAttribute('href').substring(1);
            if (targetId === serviceId) {
                button.classList.add('active');
                this.centerNavButton(button);
            } else {
                button.classList.remove('active');
            }
        });
    },
    
    centerNavButton(activeButton) {
        const navScroll = document.querySelector('.nav-scroll');
        if (!navScroll) return;
        
        const scrollLeft = activeButton.offsetLeft - (navScroll.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        
        navScroll.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    },
    
    updateNavOnScroll() {
        const services = document.querySelectorAll('.service-detail');
        const scrollPosition = window.scrollY + 200;
        
        let currentService = '';
        
        services.forEach(service => {
            const serviceTop = service.offsetTop;
            const serviceHeight = service.offsetHeight;
            
            if (scrollPosition >= serviceTop && scrollPosition < serviceTop + serviceHeight) {
                currentService = service.id;
            }
        });
        
        if (currentService) {
            this.updateServiceNav(currentService);
        }
    },
    
    initVerticalGallery() {
        const allThumbs = document.querySelectorAll('.vertical-thumb');
        
        allThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const gallery = thumb.closest('.service-gallery-vertical');
                if (!gallery) return;
                
                const mainImage = gallery.querySelector('.vertical-image');
                const thumbStyle = window.getComputedStyle(thumb);
                const bgImage = thumbStyle.backgroundImage;
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(mainImage, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            mainImage.style.backgroundImage = bgImage;
                            gsap.to(mainImage, {
                                opacity: 1,
                                duration: 0.3,
                                onStart: () => {
                                    mainImage.style.transform = 'scale(1.05)';
                                },
                                onComplete: () => {
                                    gsap.to(mainImage, {
                                        transform: 'scale(1)',
                                        duration: 0.5,
                                        ease: 'power2.out'
                                    });
                                }
                            });
                        }
                    });
                } else {
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.style.backgroundImage = bgImage;
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            mainImage.style.transform = 'scale(1)';
                            mainImage.style.transition = 'transform 0.5s ease';
                        }, 50);
                    }, 300);
                }
                
                const galleryThumbs = gallery.querySelectorAll('.vertical-thumb');
                galleryThumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
        
        document.querySelectorAll('.service-gallery-vertical').forEach(gallery => {
            const firstThumb = gallery.querySelector('.vertical-thumb');
            if (firstThumb) {
                firstThumb.classList.add('active');
            }
        });
    },
    
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    setTimeout(() => {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 100);
                }
            });
        });
        
        console.log(`FAQ initialized with ${faqItems.length} items`);
    },
    
    initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateServiceDetail(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                }
            );
            
            const serviceDetails = document.querySelectorAll('.service-detail');
            serviceDetails.forEach(detail => observer.observe(detail));
            
            const processSteps = document.querySelectorAll('.process-step');
            processSteps.forEach(step => observer.observe(step));
        }
    },
    
    animateServiceDetail(element) {
        if (typeof gsap !== 'undefined') {
            gsap.from(element, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
    },
    
    bindEvents() {
        const bookButtons = document.querySelectorAll('.service-book-btn');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.getAttribute('href') === '../en/index.html#contact') {
                    e.preventDefault();
                    
                    const serviceDetail = button.closest('.service-detail');
                    const serviceTitle = serviceDetail?.querySelector('.service-title')?.textContent || 'Service';
                    
                    localStorage.setItem('selectedService', serviceTitle);
                    
                    window.location.href = '../en/index.html#contact';
                }
            });
        });
        
        const priceElements = document.querySelectorAll('.price-amount');
        priceElements.forEach(price => {
            price.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(price, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                } else {
                    price.style.transform = 'scale(1.1)';
                    price.style.transition = 'transform 0.3s ease';
                }
            });
            
            price.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(price, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    price.style.transform = 'scale(1)';
                }
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.navigateServices(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.navigateServices(-1);
            }
        });
        
        const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
        allAnchorLinks.forEach(link => {
            if (!link.classList.contains('nav-link') && 
                !link.classList.contains('mobile-nav-link') &&
                !link.classList.contains('service-nav-btn') &&
                !link.classList.contains('service-book-btn')) {
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    
                    if (href.startsWith('#')) {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                            const targetPosition = targetElement.offsetTop - headerHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        });
    },
    
    navigateServices(direction) {
        const services = ['bridal', 'editorial', 'events', 'masterclass', 'consultation'];
        const currentHash = window.location.hash.substring(1);
        const currentIndex = services.indexOf(currentHash);
        
        if (currentIndex !== -1) {
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = services.length - 1;
            if (newIndex >= services.length) newIndex = 0;
            
            this.scrollToService(services[newIndex]);
            this.updateServiceNav(services[newIndex]);
        }
    }
};

// ============================================
// INITIALIZATION
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ServicesPageLoader.init());
} else {
    ServicesPageLoader.init();
}

// Export modules for global access
window.ServicesPage = ServicesPage;
window.ServicesNavigation = ServicesNavigation;
window.ServicesLanguage = ServicesLanguage;
window.ServicesCursor = ServicesCursor;

// Handle selected service when navigating to contact page
document.addEventListener('DOMContentLoaded', () => {
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService && window.location.hash === '#contact') {
        const serviceMap = {
            'Bridal Couture': 'bridal',
            'Editorial Artistry': 'editorial',
            'Special Events': 'events',
            'Master Classes': 'masterclass',
            'Personal Consultation': 'consultation'
        };
        
        const serviceValue = serviceMap[selectedService];
        
        setTimeout(() => {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect && serviceValue) {
                serviceSelect.value = serviceValue;
                
                localStorage.removeItem('selectedService');
            }
        }, 1000);
    }
});

// Handle navigation link clicks
window.addEventListener('click', function(e) {
    const navLink = e.target.closest('.nav-link');
    if (navLink) {
        const href = navLink.getAttribute('href');
        
        if (href && href.includes('.html') && !href.includes('#')) {
            window.location.href = href;
        }
    }
});

// Handle Escape key for closing mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        if (mobileOverlay && mobileOverlay.classList.contains('active')) {
            if (window.ServicesNavigation && typeof window.ServicesNavigation.closeMobileMenu === 'function') {
                window.ServicesNavigation.closeMobileMenu();
            }
        }
    }
});