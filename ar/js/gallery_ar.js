// ============================================
// CONFIGURATION & UTILITIES
// ============================================
const GalleryConfig = {
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

const GalleryUtils = {
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
    }
};

// ============================================
// MODULE: GALLERY CURSOR
// ============================================
const GalleryCursor = {
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
        
        console.log('Gallery cursor initialized');
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
                ease: GalleryConfig.animation.easing.power3
            });
            
            gsap.to(this.cursorOuter, {
                x: this.state.x,
                y: this.state.y,
                duration: 0.3,
                ease: GalleryConfig.animation.easing.power3
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
        const isInteractive = target.matches('a, button, .nav-link, .filter-nav-btn, .view-btn, .category-link, .footer-link, .mobile-cta-btn, .lang-toggle, .mobile-close-btn, .service-book-btn, .faq-question, .cta-btn');
        
        if (isInteractive && this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1.5,
                    duration: GalleryConfig.animation.duration.fast,
                    ease: GalleryConfig.animation.easing.smooth
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1.2,
                    duration: GalleryConfig.animation.duration.fast,
                    ease: GalleryConfig.animation.easing.smooth
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
        const isInteractive = target.matches('a, button, .nav-link, .filter-nav-btn, .view-btn, .category-link, .footer-link, .mobile-cta-btn, .lang-toggle, .mobile-close-btn, .service-book-btn, .faq-question, .cta-btn');
        
        if (isInteractive && this.cursorInner && this.cursorOuter) {
            if (typeof gsap !== 'undefined') {
                gsap.to(this.cursorInner, {
                    scale: 1,
                    duration: GalleryConfig.animation.duration.fast,
                    ease: GalleryConfig.animation.easing.smooth
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1,
                    duration: GalleryConfig.animation.duration.fast,
                    ease: GalleryConfig.animation.easing.smooth
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
                    duration: GalleryConfig.animation.duration.fast
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 0.8,
                    duration: GalleryConfig.animation.duration.fast
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
                    duration: GalleryConfig.animation.duration.fast
                });
                
                gsap.to(this.cursorOuter, {
                    scale: 1,
                    duration: GalleryConfig.animation.duration.fast
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
const GalleryPageLoader = {
    init() {
        console.log('Gallery page loader initializing...');
        
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
        
        // Arabic loading messages
        const messages = [
            "جاري تحميل معرض الأعمال",
            "جاري تهيئة الصور",
            "جاري إعداد التجربة",
            "جاهز تقريباً"
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            
            // Convert to Arabic numerals for percentage display
            if (percentage) {
                const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                const progressStr = progress.toString();
                let arabicProgress = '';
                for (let char of progressStr) {
                    if (char >= '0' && char <= '9') {
                        arabicProgress += arabicNumerals[parseInt(char)];
                    } else {
                        arabicProgress += char;
                    }
                }
                percentage.textContent = `${arabicProgress}%`;
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
                ease: GalleryConfig.animation.easing.power3,
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
        console.log('Initializing gallery page...');
        
        try {
            // Initialize cursor first
            GalleryCursor.init();
            GalleryNavigation.init();
            GalleryLanguage.init();
            Gallery.init();
            GalleryModal.init();
            
            console.log('Gallery page fully loaded! ✨');
        } catch (error) {
            console.error('Error initializing gallery page:', error);
        }
    }
};

// ============================================
// MODULE: GALLERY NAVIGATION
// ============================================
const GalleryNavigation = {
    init() {
        this.nav = document.querySelector('.luxury-nav');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileOverlay = null;
        
        if (!this.nav) return;
        
        this.bindEvents();
        this.handleScroll();
        this.updateNavVisibility();
        
        window.addEventListener('resize', () => this.updateNavVisibility());
        
        console.log('Gallery Navigation initialized');
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
        
        window.addEventListener('scroll', GalleryUtils.throttle(() => this.handleScroll(), 100));
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
        const activeLang = document.querySelector('.lang-code')?.textContent || 'AR';
        const currentPage = window.location.pathname.split('/').pop();
        
        return `
            <div class="mobile-menu-container">
                <button class="mobile-close-btn" aria-label="إغلاق القائمة">
                    <span class="close-icon"></span>
                </button>
                
                <div class="mobile-menu-logo">
                    <div class="symbol">A</div>
                    <div class="brand">AMIRA STUDIO</div>
                </div>
                
                <nav class="mobile-menu-nav">
                    <a href="../../makeup-artist-website-amira/ar/index_ar.html" class="mobile-nav-link ${currentPage === 'index_ar.html' || currentPage === '' ? 'active' : ''}">
                        <span class="link-number">٠١</span>
                        <span class="link-text">الرئيسية</span>
                    </a>
                    
                    <a href="../../makeup-artist-website-amira/ar/index_ar.html#philosophy" class="mobile-nav-link">
                        <span class="link-number">٠٢</span>
                        <span class="link-text">الفلسفة</span>
                    </a>
                    
                    <a href="../../makeup-artist-website-amira/ar/services_ar.html" class="mobile-nav-link">
                        <span class="link-number">٠٣</span>
                        <span class="link-text">الخدمات</span>
                    </a>
                    
                    <a href="../../makeup-artist-website-amira/ar/gallery_ar.html" class="mobile-nav-link ${currentPage === 'gallery_ar.html' ? 'active' : ''}">
                        <span class="link-number">٠٤</span>
                        <span class="link-text">المعرض</span>
                    </a>
                    
                    <a href="../../makeup-artist-website-amira/ar/index_ar.html#contact" class="mobile-nav-link">
                        <span class="link-number">٠٥</span>
                        <span class="link-text">اتصل بنا</span>
                    </a>
                </nav>
                
                <div class="mobile-language-section">
                    <div class="language-label">اختر اللغة</div>
                    <div class="language-buttons">
                        <button class="language-btn ${activeLang === 'AR' ? 'active' : ''}" data-lang="ar">
                            <span class="lang-text">العربية</span>
                            <span class="lang-code">AR</span>
                        </button>
                        
                        <button class="language-btn ${activeLang === 'EN' ? 'active' : ''}" data-lang="en">
                            <span class="lang-text">English</span>
                            <span class="lang-code">EN</span>
                        </button>
                        
                        <button class="language-btn ${activeLang === 'SV' ? 'active' : ''}" data-lang="sv">
                            <span class="lang-text">Svenska</span>
                            <span class="lang-code">SV</span>
                        </button>
                    </div>
                </div>
                
                <a href="../../makeup-artist-website-amira/ar/index_ar.html#contact" class="mobile-cta-btn">
                    <span>حجز استشارة</span>
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
            case 'ar':
                targetUrl = '../../makeup-artist-website-amira/ar/gallery_ar.html';
                break;
            case 'en':
                targetUrl = '/makeup-artist-website-amira/makeup-artist-website-amira/en/gallery.html';
                break;
            case 'sv':
                targetUrl = '../../sv/gallery_sv.html';
                break;
            default:
                targetUrl = '../../makeup-artist-website-amira/ar/gallery_ar.html';
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
                ease: GalleryConfig.animation.easing.smooth,
                delay: index * 0.1
            }, 0);
        });
        
        tl.to(langSection, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: GalleryConfig.animation.easing.smooth
        }, navLinks.length * 0.1 + 0.1);
        
        tl.to(ctaBtn, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: GalleryConfig.animation.easing.smooth
        }, '+=0.2');
    },
    
    handleMobileNavLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        this.closeMobileMenu();
        
        setTimeout(() => {
            if (href.includes('.html')) {
                window.location.href = href;
            } else if (href.startsWith('#')) {
                if (href === '#hero' && window.location.pathname.includes('gallery_ar.html')) {
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
                ease: GalleryConfig.animation.easing.smooth,
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
// MODULE: LANGUAGE SELECTOR (FIXED VERSION)
// ============================================
const GalleryLanguage = {
    init() {
        console.log('Initializing Gallery Language selector...');
        
        this.langToggle = document.getElementById('langToggle');
        this.langDropdown = document.querySelector('.lang-dropdown');
        this.langOptions = document.querySelectorAll('.lang-option');
        
        console.log('Language toggle found:', this.langToggle);
        console.log('Language dropdown found:', this.langDropdown);
        console.log('Language options found:', this.langOptions?.length || 0);
        
        if (!this.langToggle) {
            console.error('Language toggle not found!');
            return;
        }
        
        if (!this.langDropdown) {
            console.error('Language dropdown not found!');
            return;
        }
        
        this.bindEvents();
        
        // Restore saved language
        this.restoreLanguage();
        
        console.log('Gallery Language selector initialized successfully');
    },
    
    bindEvents() {
        console.log('Binding language selector events...');
        
        // Toggle dropdown on button click
        if (this.langToggle) {
            this.langToggle.addEventListener('click', (e) => {
                console.log('Language toggle clicked');
                this.toggleDropdown(e);
            });
        }
        
        // Handle option selection
        if (this.langOptions && this.langOptions.length > 0) {
            this.langOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    console.log('Language option clicked');
                    this.selectLanguage(e);
                });
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            this.closeDropdown(e);
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.langDropdown && this.langDropdown.classList.contains('active')) {
                this.closeAllDropdowns();
            }
        });
        
        console.log('Language selector events bound');
    },
    
    toggleDropdown(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        console.log('Toggling language dropdown, current state:', this.langDropdown?.classList.contains('active'));
        
        const isActive = this.langDropdown.classList.contains('active');
        
        // Close all dropdowns first
        this.closeAllDropdowns();
        
        // Toggle current dropdown
        if (!isActive) {
            this.langDropdown.classList.add('active');
            this.langToggle.classList.add('active');
            
            console.log('Dropdown opened');
            
            // Add animation if GSAP is available
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(this.langDropdown, 
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
                );
            }
        } else {
            console.log('Dropdown closed');
        }
    },
    
    selectLanguage(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const option = e.currentTarget;
        const lang = option.dataset.lang;
        const langCode = lang ? lang.toUpperCase() : 'AR';
        
        console.log(`Language selected: ${langCode}`);
        
        // Update the toggle button text
        const langCodeElement = this.langToggle.querySelector('.lang-code');
        if (langCodeElement) {
            langCodeElement.textContent = langCode;
        }
        
        // Close dropdown
        this.closeAllDropdowns();
        
        // Save to localStorage
        if (lang) {
            localStorage.setItem('preferredLanguage', lang);
        }
        
        // Animate the selected option if GSAP is available
        if (typeof gsap !== 'undefined') {
            gsap.to(option, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Determine redirect URL
                    this.redirectToLanguage(lang);
                }
            });
        } else {
            // Redirect immediately if no GSAP
            this.redirectToLanguage(lang);
        }
    },
    
    redirectToLanguage(lang) {
        let targetUrl = '';
        
        switch(lang) {
            case 'ar':
                targetUrl = '../../makeup-artist-website-amira/ar/gallery_ar.html';
                break;
            case 'en':
                targetUrl = '/makeup-artist-website-amira/makeup-artist-website-amira/en/gallery.html';
                break;
            case 'sv':
                targetUrl = '../../sv/gallery_sv.html';
                break;
            default:
                targetUrl = '../../makeup-artist-website-amira/ar/gallery_ar.html';
        }
        
        console.log(`Redirecting to: ${targetUrl}`);
        
        // Small delay for animation, then redirect
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 150);
    },
    
    restoreLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && this.langToggle) {
            const langCode = savedLang.toUpperCase();
            const langCodeElement = this.langToggle.querySelector('.lang-code');
            if (langCodeElement) {
                langCodeElement.textContent = langCode;
                console.log(`Restored language: ${langCode}`);
            }
        }
    },
    
    closeAllDropdowns() {
        if (this.langDropdown) {
            this.langDropdown.classList.remove('active');
        }
        if (this.langToggle) {
            this.langToggle.classList.remove('active');
        }
    },
    
    closeDropdown(e) {
        // Don't close if click is inside the language selector elements
        if (this.langToggle && this.langToggle.contains(e.target)) {
            return;
        }
        
        if (this.langDropdown && this.langDropdown.contains(e.target)) {
            return;
        }
        
        // Otherwise, close the dropdown
        this.closeAllDropdowns();
    }
};

// ============================================
// GALLERY MODULE (main gallery functionality)
// ============================================
const Gallery = {
    init() {
        console.log('Initializing Gallery...');
        
        this.galleryItems = [];
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.visibleCount = 12;
        this.totalItems = 0;
        
        // Initialization
        this.collectGalleryItems();
        this.bindGalleryEvents();
        
        // APPLY initial filtering and sorting
        this.applyFilterAndSort();
        
        console.log('Gallery initialized with', this.totalItems, 'items');
    },
    
    collectGalleryItems() {
        console.log('Collecting gallery items...');
        
        const items = document.querySelectorAll('.gallery-item');
        this.galleryItems = Array.from(items).map((item, index) => {
            // Get date from data attribute
            let dateStr = item.dataset.date || '';
            let date = new Date();
            
            if (dateStr) {
                try {
                    date = new Date(dateStr);
                    if (isNaN(date.getTime())) {
                        console.warn('Invalid date:', dateStr, 'for item', index);
                        date = new Date(); // fallback
                    }
                } catch (e) {
                    console.warn('Error parsing date:', dateStr, e);
                    date = new Date();
                }
            }
            
            return {
                element: item,
                category: item.dataset.category || 'all',
                date: date,
                dateStr: dateStr,
                featured: item.dataset.featured === 'true',
                index: index,
                originalOrder: index // Keep original order
            };
        });
        
        this.totalItems = this.galleryItems.length;
        
        console.log('Gallery items collected:', this.galleryItems.length);
    },
    
    bindGalleryEvents() {
        console.log('Binding gallery events...');
        
        // Filters
        const filterButtons = document.querySelectorAll('.filter-nav-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Sorting
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.handleSort(e));
        }
        
        // Load More button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
        
        // Gallery view buttons
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openGalleryModal(index);
            });
        });
        
        // Gallery card clicks
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.view-btn')) {
                    this.openGalleryModal(index);
                }
            });
        });
        
        // Category links
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleCategoryLink(e));
        });
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleFooterLink(e));
        });
        
        console.log('Gallery events bound');
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
    
    handleFilter(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const filter = button.dataset.filter;
        
        console.log('Filter clicked:', filter);
        
        // Update active button
        const filterButtons = document.querySelectorAll('.filter-nav-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Button animation
        if (typeof gsap !== 'undefined') {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
        
        // Apply filter
        this.currentFilter = filter;
        this.visibleCount = 12; // Reset counter
        this.applyFilterAndSort();
        
        // Scroll to gallery
        this.scrollToGallery();
    },
    
    handleSort(e) {
        this.currentSort = e.target.value;
        console.log('Sort changed to:', this.currentSort);
        this.visibleCount = 12; // Reset counter when sorting changes
        this.applyFilterAndSort();
    },
    
    applyFilterAndSort() {
        console.log('Applying filter:', this.currentFilter, 'and sort:', this.currentSort);
        
        // 1. Get filtered items
        let filteredItems = this.getFilteredItems();
        
        // 2. Sort filtered items
        let sortedItems = this.sortItems(filteredItems);
        
        // 3. Update display
        this.updateDisplay(sortedItems);
        
        // 4. Update UI
        this.updateUI(sortedItems.length);
    },
    
    getFilteredItems() {
        return this.galleryItems.filter(item => {
            if (this.currentFilter === 'all') return true;
            return item.category === this.currentFilter;
        });
    },
    
    sortItems(items) {
        // Create copy for sorting
        const sorted = [...items];
        
        sorted.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-desc':
                    return b.date - a.date; // Newest first
                    
                case 'date-asc':
                    return a.date - b.date; // Oldest first
                    
                case 'featured':
                    // Featured first, then by date (newest first)
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.date - a.date;
                    
                case 'category':
                    // First by category, then by date (newest first)
                    const catCompare = a.category.localeCompare(b.category);
                    return catCompare !== 0 ? catCompare : b.date - a.date;
                    
                default:
                    return a.originalOrder - b.originalOrder; // Original order
            }
        });
        
        return sorted;
    },
    
    updateDisplay(sortedItems) {
        console.log('Updating display. Total filtered:', sortedItems.length, 'Showing:', Math.min(this.visibleCount, sortedItems.length));
        
        // 1. First hide ALL elements
        this.galleryItems.forEach(item => {
            item.element.style.display = 'none';
            item.element.style.opacity = '0';
            item.element.style.transform = 'scale(0.9)';
        });
        
        // 2. Show only visible elements
        const visibleItems = sortedItems.slice(0, this.visibleCount);
        
        visibleItems.forEach((item, index) => {
            setTimeout(() => {
                item.element.style.display = 'block';
                if (typeof gsap !== 'undefined') {
                    gsap.to(item.element, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "power2.out"
                    });
                } else {
                    item.element.style.opacity = '1';
                    item.element.style.transform = 'scale(1)';
                    item.element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                }
            }, 10);
        });
    },
    
    updateUI(filteredCount) {
        // Update counters
        this.updateGalleryCounter(filteredCount);
        
        // Update Load More button
        this.updateLoadMoreButton(filteredCount);
    },
    
    updateGalleryCounter(filteredCount) {
        const totalElement = document.getElementById('totalImages');
        const filteredElement = document.getElementById('filteredImages');
        
        if (totalElement) {
            // Convert to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const totalStr = this.totalItems.toString();
            let arabicTotal = '';
            for (let char of totalStr) {
                if (char >= '0' && char <= '9') {
                    arabicTotal += arabicNumerals[parseInt(char)];
                } else {
                    arabicTotal += char;
                }
            }
            totalElement.textContent = arabicTotal;
        }
        
        if (filteredElement) {
            const showingCount = Math.min(filteredCount, this.visibleCount);
            // Convert to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const showingStr = showingCount.toString();
            let arabicShowing = '';
            for (let char of showingStr) {
                if (char >= '0' && char <= '9') {
                    arabicShowing += arabicNumerals[parseInt(char)];
                } else {
                    arabicShowing += char;
                }
            }
            filteredElement.textContent = arabicShowing;
        }
    },
    
    updateLoadMoreButton(filteredCount) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        
        if (!loadMoreBtn || !loadMoreContainer) return;
        
        const remaining = filteredCount - this.visibleCount;
        console.log('Load More check - Total filtered:', filteredCount, 'Visible:', this.visibleCount, 'Remaining:', remaining);
        
        if (remaining > 0) {
            // There are more items to load
            loadMoreContainer.style.display = 'block';
            
            // Convert remaining to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const remainingStr = remaining.toString();
            let arabicRemaining = '';
            for (let char of remainingStr) {
                if (char >= '0' && char <= '9') {
                    arabicRemaining += arabicNumerals[parseInt(char)];
                } else {
                    arabicRemaining += char;
                }
            }
            
            loadMoreBtn.innerHTML = `
                <span>تحميل المزيد (${arabicRemaining} متبقي)</span>
                <i class="fas fa-chevron-down"></i>
            `;
            loadMoreBtn.disabled = false;
        } else {
            // All items already shown
            loadMoreContainer.style.display = 'none';
            loadMoreBtn.disabled = true;
        }
    },
    
    loadMore() {
        console.log('Load More clicked');
        
        // Get current filtered and sorted items
        const filteredItems = this.getFilteredItems();
        const sortedItems = this.sortItems(filteredItems);
        
        // Check if there are more items to load
        const remaining = sortedItems.length - this.visibleCount;
        
        if (remaining <= 0) {
            console.log('No more items to load');
            this.updateLoadMoreButton(sortedItems.length);
            return;
        }
        
        // Determine how many items to load (max 6 or remaining)
        const itemsToLoad = Math.min(6, remaining);
        console.log('Loading', itemsToLoad, 'more items');
        
        // Increase visible count
        const oldVisibleCount = this.visibleCount;
        this.visibleCount += itemsToLoad;
        
        // Show new items
        const newItems = sortedItems.slice(oldVisibleCount, this.visibleCount);
        
        newItems.forEach((item, index) => {
            setTimeout(() => {
                item.element.style.display = 'block';
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(item.element,
                        {
                            opacity: 0,
                            y: 30,
                            scale: 0.9
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "power2.out"
                        }
                    );
                } else {
                    item.element.style.opacity = '0';
                    item.element.style.transform = 'translateY(30px) scale(0.9)';
                    setTimeout(() => {
                        item.element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        item.element.style.opacity = '1';
                        item.element.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            }, 50);
        });
        
        // Update UI
        this.updateUI(sortedItems.length);
        
        // Button animation
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn && typeof gsap !== 'undefined') {
            gsap.to(loadMoreBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
        
        // Scroll down a bit to show new items
        setTimeout(() => {
            if (newItems.length > 0 && newItems[0].element) {
                const elementTop = newItems[0].element.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                
                window.scrollTo({
                    top: elementTop - headerHeight - 50,
                    behavior: 'smooth'
                });
            }
        }, 300);
    },
    
    handleCategoryLink(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            const category = href.substring(1).replace('-gallery', '');
            console.log('Category link clicked:', category);
            
            // Find corresponding filter button
            const filterButton = document.querySelector(`.filter-nav-btn[data-filter="${category}"]`);
            if (filterButton) {
                filterButton.click();
            }
        }
    },
    
    scrollToGallery() {
        const gallerySection = document.querySelector('.gallery-grid-section');
        if (gallerySection) {
            const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
            const targetPosition = gallerySection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    openGalleryModal(index) {
        console.log('Opening gallery modal for index:', index);
        
        // Use GalleryModal
        if (window.AMIRA && window.AMIRA.GalleryModal) {
            window.AMIRA.GalleryModal.openModal(index);
        } else if (GalleryModal) {
            GalleryModal.openModal(index);
        } else {
            console.error('GalleryModal not available');
            // Fallback
            const item = this.galleryItems[index];
            if (item && item.element) {
                const img = item.element.querySelector('img');
                if (img && img.src) {
                    window.open(img.src, '_blank');
                }
            }
        }
    }
};

// ============================================
// GALLERY MODAL (for gallery)
// ============================================
const GalleryModal = {
    init() {
        console.log('Initializing Gallery Modal...');
        
        this.modal = document.getElementById('galleryModal');
        this.modalImage = this.modal?.querySelector('.modal-image');
        this.modalTitle = this.modal?.querySelector('.modal-title');
        this.modalCategory = this.modal?.querySelector('.modal-category');
        this.modalDescription = this.modal?.querySelector('.modal-description p');
        this.currentIndex = 0;
        this.imagesData = this.collectGalleryImages();
        
        if (!this.modal) {
            console.error('Gallery modal not found');
            return;
        }
        
        this.bindModalEvents();
        console.log('Gallery Modal initialized with', this.imagesData.length, 'images');
    },
    
    collectGalleryImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        return Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('img');
            const title = item.querySelector('.image-title')?.textContent || `صورة المعرض ${index + 1}`;
            const category = item.querySelector('.image-category')?.textContent || 'المعرض';
            const date = item.querySelector('.image-date')?.textContent || '';
            
            return {
                src: img?.src || '',
                alt: img?.alt || title,
                title: title,
                category: category,
                date: date,
                description: this.generateDescription(title, category),
                index: index
            };
        });
    },
    
    generateDescription(title, category) {
        const descriptions = {
            bridal: `تحول مذهل للعروس بعنوان "${title}". هذا المظهر يجمع بين تقنيات العروس الشرقية التقليدية والأناقة الحديثة، مع تفاصيل معقدة وتشطيبات فاخرة تخلق جمالاً خالداً مثاليًا ليومك الخاص.`,
            editorial: `تحفة فنية تحريرية "${title}" تعرض فن مكياج الأزياء الراقية. تم إنشاء هذا المظهر لجلسة تصوير احترافية، تدمج التعبير الإبداعي مع الدقة التقنية لإنتاج صور تروي قصة بصرية مقنعة.`,
            traditional: `مظهر المكياج التقليدي "${title}" الذي يكرم التراث الثقافي. يتضمن هذا التصميم تقنيات الجمال الشرقية الأصيلة التي تم تناقلها عبر الأجيال، مع إعادة تخيلها بأناقة معاصرة للاحتفالات الحديثة.`,
            events: `مكياج المناسبات الخاصة "${title}" المصمم للمناسبات التي لا تنسى. يضمن هذا المظهر المبهر أن تبرزي بثقة، مع تركيبات طويلة الأمد وتشطيبات جاهزة للكاميرا تتحمل ساعات من الاحتفال.`,
            special: `مكياج المؤثرات الخاصة الإبداعي "${title}" الذي يوضح الابتكار الفني. يدفع هذا المظهر التحويلي حدود فن المكياج، مدمجًا المهارة التقنية مع التصميم الخيالي لخلق تجارب بصرية فريدة حقًا.`
        };
        
        return descriptions[category.toLowerCase()] || 
               `عمل فني مذهل لفن المكياج بعنوان "${title}" من مجموعة أعمال أميرة. هذه التحفة الفنية تظهر التوازن المثالي بين التقنيات التقليدية والجماليات الحديثة، مما يخلق جمالًا يتجاوز الموضات ويحتفل بالفردية.`;
    },
    
    bindModalEvents() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        // Navigation buttons
        const prevBtn = this.modal.querySelector('.modal-prev');
        const nextBtn = this.modal.querySelector('.modal-next');
        
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
        
        // Close on overlay click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.prevImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });
    },
    
    openModal(index) {
        console.log('Gallery Modal: Opening for index', index);
        
        // Check data
        if (this.imagesData.length === 0) {
            console.error('No gallery images found');
            return;
        }
        
        // Check index
        if (index < 0 || index >= this.imagesData.length) {
            console.error('Invalid index:', index);
            index = 0;
        }
        
        this.currentIndex = index;
        const imageData = this.imagesData[index];
        
        // Update modal content
        this.updateModalContent(imageData);
        
        // Show modal
        this.showModal();
        
        // Block page scroll
        document.body.style.overflow = 'hidden';
    },
    
    updateModalContent(imageData) {
        if (!this.modal) return;
        
        // Modal elements
        const modalImage = this.modal.querySelector('.modal-image');
        const modalTitle = this.modal.querySelector('.modal-title');
        const modalCategory = this.modal.querySelector('.modal-category');
        const modalDescription = this.modal.querySelector('.modal-description p');
        const modalLoading = this.modal.querySelector('.modal-loading');
        const currentIndex = this.modal.querySelector('.current-index');
        const totalImages = this.modal.querySelector('.total-images');
        
        // Update meta data
        const metaDate = this.modal.querySelector('.meta-item:nth-child(2) .meta-value');
        const metaService = this.modal.querySelector('.meta-item:nth-child(4) .meta-value');
        
        // Show loading
        if (modalLoading) {
            modalLoading.style.display = 'grid';
        }
        
        // Set image
        if (modalImage) {
            modalImage.style.opacity = '0';
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;
            
            // When image loads
            modalImage.onload = () => {
                if (modalLoading) {
                    modalLoading.style.display = 'none';
                }
                modalImage.style.opacity = '1';
                modalImage.classList.add('loaded');
            };
            
            // Handle load error
            modalImage.onerror = () => {
                console.error('Failed to load image:', imageData.src);
                if (modalLoading) {
                    modalLoading.style.display = 'none';
                }
                modalImage.style.opacity = '1';
            };
        }
        
        // Update text
        if (modalTitle) {
            modalTitle.textContent = imageData.title;
        }
        
        if (modalCategory) {
            modalCategory.textContent = imageData.category;
        }
        
        if (modalDescription) {
            modalDescription.textContent = imageData.description;
        }
        
        // Convert to Arabic numerals for index display
        if (currentIndex) {
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const indexStr = (this.currentIndex + 1).toString();
            let arabicIndex = '';
            for (let char of indexStr) {
                if (char >= '0' && char <= '9') {
                    arabicIndex += arabicNumerals[parseInt(char)];
                } else {
                    arabicIndex += char;
                }
            }
            currentIndex.textContent = arabicIndex;
        }
        
        if (totalImages) {
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const totalStr = this.imagesData.length.toString();
            let arabicTotal = '';
            for (let char of totalStr) {
                if (char >= '0' && char <= '9') {
                    arabicTotal += arabicNumerals[parseInt(char)];
                } else {
                    arabicTotal += char;
                }
            }
            totalImages.textContent = arabicTotal;
        }
        
        // Update meta data
        if (metaDate) {
            metaDate.textContent = imageData.date || new Date().getFullYear();
        }
        
        if (metaService) {
            metaService.textContent = imageData.category;
        }
        
        // Update progress dots
        this.updateProgressDots();
        
        // Update tags
        this.updateTechTags(imageData.category);
    },
    
    updateProgressDots() {
        const dotsContainer = this.modal.querySelector('.progress-dots');
        if (!dotsContainer) return;
        
        // Clear container
        dotsContainer.innerHTML = '';
        
        // Create new dots
        this.imagesData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `progress-dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                const imageData = this.imagesData[index];
                this.updateModalContent(imageData);
            });
            dotsContainer.appendChild(dot);
        });
    },
    
    updateTechTags(category) {
        const techContainer = this.modal.querySelector('.modal-tech');
        if (!techContainer) return;
        
        // Tags by category
        const tags = {
            bridal: ['تقليدي', 'لمسات ذهبية', 'مرسوم يدويًا', 'عروس', 'فاخر'],
            editorial: ['تحريري', 'أزياء راقية', 'جاهز للكاميرا', 'إبداعي', 'فني'],
            traditional: ['ثقافي', 'تراث', 'تقليدي', 'أصيل', 'شرقي'],
            events: ['مناسبات', 'مبهر', 'طويل الأمد', 'مقاوم للفلاش', 'أنيق'],
            special: ['مؤثرات خاصة', 'إبداعي', 'فني', 'تحويلي', 'ابتكاري']
        };
        
        // Clear container
        techContainer.innerHTML = '';
        
        // Add tags
        const categoryTags = tags[category.toLowerCase()] || ['مكياج', 'فن', 'جمال', 'فاخر'];
        categoryTags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tag;
            techContainer.appendChild(span);
        });
    },
    
    showModal() {
        if (!this.modal) return;
        
        // Show modal
        this.modal.classList.add('active');
        
        // Appearance animation
        const modalContainer = this.modal.querySelector('.modal-container');
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
        if (!this.modal) return;
        
        console.log('Gallery Modal: Closing');
        
        // Disappearance animation
        const modalContainer = this.modal.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'scale(0.9)';
            modalContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
        
        setTimeout(() => {
            // Hide modal
            this.modal.classList.remove('active');
            
            // Allow page scroll
            document.body.style.overflow = '';
            
            console.log('Gallery Modal: Closed');
        }, 300);
    },
    
    prevImage() {
        if (this.imagesData.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.imagesData.length) % this.imagesData.length;
        const imageData = this.imagesData[this.currentIndex];
        this.updateModalContent(imageData);
    },
    
    nextImage() {
        if (this.imagesData.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.imagesData.length;
        const imageData = this.imagesData[this.currentIndex];
        this.updateModalContent(imageData);
    }
};

// ============================================
// GALLERY PAGE INITIALIZATION
// ============================================
const GalleryPage = {
    init() {
        console.log('Initializing Gallery Page...');
        
        // ADDED: Check current page
        console.log('Current page:', window.location.pathname);
        
        // Add scroll animations
        this.initScrollAnimations();
        
        // ADDED: Initialize additional handlers
        this.initAdditionalHandlers();
        
        console.log('Gallery Page fully loaded!');
    },
    
    initScrollAnimations() {
        // Animation for category cards
        const categoryCards = document.querySelectorAll('.category-card');
        const statsItems = document.querySelectorAll('.stat-item');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(entry.target, {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    } else {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        categoryCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
        
        statsItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            observer.observe(item);
        });
    },
    
    // ADDED: Additional handlers
    initAdditionalHandlers() {
        // Handle all anchor links
        const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
        allAnchorLinks.forEach(link => {
            if (!link.classList.contains('nav-link') && 
                !link.classList.contains('mobile-nav-link') &&
                !link.classList.contains('filter-nav-btn') &&
                !link.classList.contains('view-btn')) {
                
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
        
        // Handler for buttons in CTA section
        const ctaButtons = document.querySelectorAll('.cta-btn-primary, .cta-btn-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href) {
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerHeight = document.querySelector('.luxury-nav')?.offsetHeight || 0;
                            const targetPosition = targetElement.offsetTop - headerHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    } else if (href.includes('.html')) {
                        // Normal navigation
                        return true;
                    }
                }
            });
        });
    }
};

// ============================================
// INITIALIZATION
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GalleryPageLoader.init());
} else {
    GalleryPageLoader.init();
}

// Export for global access
window.AMIRA = window.AMIRA || {};
window.AMIRA.Gallery = Gallery;
window.AMIRA.GalleryModal = GalleryModal;
window.AMIRA.GalleryPage = GalleryPage;
window.AMIRA.GalleryNavigation = GalleryNavigation;
window.AMIRA.GalleryLanguage = GalleryLanguage;
window.AMIRA.GalleryCursor = GalleryCursor;

// Global function for testing navigation
window.testNavigation = function() {
    console.log('Testing navigation...');
    console.log('All nav links:', document.querySelectorAll('.nav-link').length);
    console.log('Current URL:', window.location.href);
};

// Simple fallback if something goes wrong
window.addEventListener('click', function(e) {
    // If user clicked on navigation link and it didn't work
    const navLink = e.target.closest('.nav-link');
    if (navLink) {
        const href = navLink.getAttribute('href');
        
        // If it's a normal page navigation
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
            if (window.GalleryNavigation && typeof window.GalleryNavigation.closeMobileMenu === 'function') {
                window.GalleryNavigation.closeMobileMenu();
            }
        }
    }
});

// Debug function to check language selector
window.debugLanguageSelector = function() {
    console.log('=== Debug Language Selector ===');
    console.log('langToggle:', document.getElementById('langToggle'));
    console.log('langDropdown:', document.querySelector('.lang-dropdown'));
    console.log('langOptions:', document.querySelectorAll('.lang-option'));
    console.log('current active class on dropdown:', document.querySelector('.lang-dropdown')?.classList.contains('active'));
    console.log('current active class on toggle:', document.getElementById('langToggle')?.classList.contains('active'));
    console.log('=== End Debug ===');
};