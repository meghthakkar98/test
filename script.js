// ==================== Falling Rose Petals Animation ====================
function createPetals() {
    const petalsContainer = document.getElementById('petalsContainer');
    const petalEmojis = ['🌹', '🌺', '💐', '🥀', '💮'];
    const numberOfPetals = 20;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        // Random horizontal position
        petal.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (slower fall)
        const duration = 10 + Math.random() * 10; // 10-20 seconds
        petal.style.animationDuration = duration + 's';
        
        // Random delay for staggered effect
        petal.style.animationDelay = Math.random() * 5 + 's';
        
        // Random size variation
        const size = 20 + Math.random() * 20;
        petal.style.fontSize = size + 'px';
        
        petalsContainer.appendChild(petal);
    }
}

// ==================== Surprise Button Interaction ====================
function initializeSurpriseButton() {
    const roseButton = document.getElementById('roseButton');
    const surpriseCard = document.getElementById('surpriseCard');
    let isRevealed = false;

    roseButton.addEventListener('click', function() {
        if (!isRevealed) {
            // Show the surprise card
            surpriseCard.classList.add('show');
            
            // Update button text
            roseButton.querySelector('.button-text').textContent = 'Thank you for being you!';
            roseButton.querySelector('.button-icon').textContent = '💕';
            
            // Scroll to surprise card smoothly
            setTimeout(() => {
                surpriseCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
            
            // Create celebration effect
            createCelebrationHearts();
            
            isRevealed = true;
        } else {
            // Hide the surprise card
            surpriseCard.classList.remove('show');
            
            // Reset button text
            roseButton.querySelector('.button-text').textContent = 'Click for a Special Surprise';
            roseButton.querySelector('.button-icon').textContent = '🌹';
            
            isRevealed = false;
        }
    });
}

// ==================== Celebration Hearts Effect ====================
function createCelebrationHearts() {
    const numberOfHearts = 15;
    const container = document.querySelector('.interactive-section');

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.fontSize = (20 + Math.random() * 20) + 'px';
        heart.style.left = (container.offsetLeft + Math.random() * container.offsetWidth) + 'px';
        heart.style.top = container.offsetTop + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.opacity = '0';
        heart.style.transition = 'all 2s ease-out';
        
        document.body.appendChild(heart);
        
        // Animate the heart
        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = `translateY(-${200 + Math.random() * 200}px) translateX(${-50 + Math.random() * 100}px) rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        // Remove the heart after animation
        setTimeout(() => {
            heart.style.opacity = '0';
            setTimeout(() => {
                heart.remove();
            }, 500);
        }, 1500);
    }
}

// ==================== Interactive Hover Effects ====================
function initializeHoverEffects() {
    const reasonItems = document.querySelectorAll('.reason-item');
    
    reasonItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Add a gentle pulse effect
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// ==================== Smooth Scroll Enhancement ====================
function enhanceSmoothScroll() {
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
}

// ==================== Add Sparkle Effect on Card ====================
function addSparkleEffect() {
    const cards = document.querySelectorAll('.card, .surprise-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create a subtle glow effect that follows the mouse
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 179, 193, 0.15) 0%, transparent 50%)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset background
            if (this.classList.contains('surprise-content')) {
                this.style.background = 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)';
            } else {
                this.style.background = 'var(--white)';
            }
        });
    });
}

// ==================== Initialize All Features ====================
function initialize() {
    createPetals();
    initializeSurpriseButton();
    initializeHoverEffects();
    enhanceSmoothScroll();
    addSparkleEffect();
    
    // Add a welcome animation
    setTimeout(() => {
        document.querySelector('.rose-icon').style.transform = 'scale(1.2)';
        setTimeout(() => {
            document.querySelector('.rose-icon').style.transform = 'scale(1)';
        }, 300);
    }, 500);
}

// ==================== Run on Page Load ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
