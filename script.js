// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect - Professional dark theme
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(75, 85, 99, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(55, 65, 81, 0.3)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.summary-card, .team-member, .feature, .pricing-card, .testimonial-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Chart animations
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar, .revenue-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
        }, index * 200);
    });
}

// Initialize chart bars
document.querySelectorAll('.chart-bar, .revenue-bar').forEach(bar => {
    bar.style.transformOrigin = 'bottom';
    bar.style.transform = 'scaleY(0)';
    bar.style.transition = 'transform 0.8s ease';
});

// Trigger chart animation when in view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCharts();
            chartObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const chartContainer = document.querySelector('.market-chart, .chart-container');
if (chartContainer) {
    chartObserver.observe(chartContainer);
}

// Button interactions - Professional style
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create subtle ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add professional ripple CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactBtns = document.querySelectorAll('.contact-btn, .btn-primary, .btn-secondary, .pricing-btn, .form-submit');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
        
            // Placeholder for other buttons
            if (this.textContent.includes('Contact') || 
                this.textContent.includes('Schedule') || 
                this.textContent.includes('Request') ||
                this.textContent.includes('Get Started') ||
                this.textContent.includes('Contact Sales')) {
                window.location.href = 'mailto:decentramind.info@gmail.com';
            }
        });
    });
});

// Performance optimization: Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animations for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const finalValue = entry.target.textContent;
            animateValue(entry.target, 0, finalValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });



function animateValue(element, start, end) {
    // Professional animation for numbers
    const duration = 2000;
    const increment = (parseFloat(end) - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= parseFloat(end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            if (end.includes('$')) {
                element.textContent = '$' + current.toFixed(1) + (end.includes('M') ? 'M' : 'K');
            } else if (end.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + ' Months';
            }
        }
    }, 16);
}

// Animate KPI numbers
const kpiStats = document.querySelectorAll('.stat-info h4');
const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const finalValue = entry.target.textContent;
            animateKPIValue(entry.target, finalValue);
            kpiObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

kpiStats.forEach(stat => {
    kpiObserver.observe(stat);
});

function animateKPIValue(element, finalValue) {
    const duration = 2000;
    let startValue = 0;
    
    if (finalValue.includes('10,000+')) {
        startValue = 0;
        const endValue = 10000;
        const increment = endValue / (duration / 16);
        let current = startValue;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                element.textContent = '10,000+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 16);
    } else if (finalValue.includes('$2.5M')) {
        startValue = 0;
        const endValue = 2.5;
        const increment = endValue / (duration / 16);
        let current = startValue;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                element.textContent = '$2.5M';
                clearInterval(timer);
            } else {
                element.textContent = '$' + current.toFixed(1) + 'M';
            }
        }, 16);
    } else if (finalValue.includes('99.9%')) {
        startValue = 0;
        const endValue = 99.9;
        const increment = endValue / (duration / 16);
        let current = startValue;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                element.textContent = '99.9%';
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(1) + '%';
            }
        }, 16);
    } else if (finalValue.includes('4.9/5')) {
        startValue = 0;
        const endValue = 4.9;
        const increment = endValue / (duration / 16);
        let current = startValue;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                element.textContent = '4.9/5';
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(1) + '/5';
            }
        }, 16);
    }
}