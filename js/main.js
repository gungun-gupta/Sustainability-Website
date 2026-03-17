/**
 * Solarva Main JS
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 2. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle (stub for now)
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        alert('Mobile menu off-canvas would open here.');
    });

    // 3. Accordion logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-body').style.display = 'none';
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                body.style.display = 'block';
            }
        });
    });

    // 4. Panel Slider Update
    const panelSlider = document.getElementById('panel-slider');
    const panelVal = document.getElementById('panel-val');
    
    if(panelSlider && panelVal) {
        panelSlider.addEventListener('input', function() {
            panelVal.textContent = this.value;
        });
    }

    // 5. Pricing Toggle Logic
    const pricingSwitch = document.getElementById('pricing-switch');
    const monthlyLabel = document.getElementById('monthly-label');
    const annuallyLabel = document.getElementById('annually-label');
    const amounts = document.querySelectorAll('.pricing-card .amount');
    
    if(pricingSwitch) {
        pricingSwitch.addEventListener('change', function() {
            if(this.checked) {
                // Annually
                annuallyLabel.classList.add('active');
                monthlyLabel.classList.remove('active');
                amounts.forEach(amount => {
                    amount.textContent = amount.getAttribute('data-annually');
                });
            } else {
                // Monthly
                monthlyLabel.classList.add('active');
                annuallyLabel.classList.remove('active');
                amounts.forEach(amount => {
                    amount.textContent = amount.getAttribute('data-monthly');
                });
            }
        });
    }

    // 6. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Provide elements to be observed
    const animatedElements = document.querySelectorAll('.animate-from-left, .animate-from-right');
    animatedElements.forEach(el => observer.observe(el));
});
