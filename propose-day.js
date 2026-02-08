// ================================
// PROPOSE DAY - INTERACTIVE EXPERIENCE
// ================================

let currentScene = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeHearts();
    initializeSparkles();

    // Optional: Add background music
    // const music = document.getElementById('bgMusic');
    // music.volume = 0.3;
    // music.play().catch(e => console.log('Audio autoplay prevented'));
});

// ========== SCENE NAVIGATION ==========
function goToScene(sceneNumber) {
    // Hide current scene
    const currentSceneEl = document.getElementById(`scene${currentScene}`);
    currentSceneEl.classList.remove('active');

    // Show new scene
    setTimeout(() => {
        currentScene = sceneNumber;
        const newSceneEl = document.getElementById(`scene${sceneNumber}`);
        newSceneEl.classList.add('active');

        // Special animations for specific scenes
        if (sceneNumber === 2) {
            animateTimeline();
        }
    }, 500);
}

// ========== TIMELINE ANIMATION ==========
function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// ========== GIFT BOX INTERACTION ==========
function openGift() {
    const loveGift = document.getElementById('loveGift');
    const openBtn = document.getElementById('openBoxBtn');

    // Open the gift
    loveGift.classList.add('open');
    openBtn.style.display = 'none';

    // Add sparkle effect
    createSparkleExplosion();

    // Move to next scene after animation
    setTimeout(() => {
        goToScene(4);
    }, 3000);
}

// ========== THE BIG QUESTION ==========
let noButtonMoves = 0;

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.question-content');

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within container
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply position
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Increase button moves counter
    noButtonMoves++;

    // After several moves, make the Yes button bigger and more attractive
    if (noButtonMoves > 3) {
        const yesBtn = document.getElementById('yesBtn');
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.innerHTML = '<span class="btn-text">Yes! Yes! Yes! 💕💕💕</span>';
    }

    // After many moves, hide the No button
    if (noButtonMoves > 7) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';

        const yesBtn = document.getElementById('yesBtn');
        yesBtn.style.transform = 'scale(1.5)';
        yesBtn.innerHTML = '<span class="btn-text">The Only Answer is YES! 💕</span>';
    }
}

function answerYes() {
    // Trigger celebration
    startCelebration();

    // Move to celebration scene
    setTimeout(() => {
        goToScene(5);
    }, 1000);
}

// ========== CELEBRATION EFFECTS ==========
function startCelebration() {
    // Confetti
    launchConfetti();

    // Fireworks
    createFireworks();

    // Sound effect (if available)
    // playSound('celebration');
}

// ========== CONFETTI ==========
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('active');

    const confetti = [];
    const confettiCount = 150;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ffd700', '#ff6b6b'];

    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    // Animate confetti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((piece, index) => {
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;

            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();

            // Reset confetti that falls off screen
            if (piece.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    size: Math.random() * 10 + 5,
                    speedY: Math.random() * 3 + 2,
                    speedX: Math.random() * 2 - 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                };
            }
        });

        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();

    // Fade out after 10 seconds
    setTimeout(() => {
        canvas.style.opacity = '0.3';
    }, 10000);
}

// ========== FIREWORKS ==========
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework-particle';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';

            const colors = ['#667eea', '#f093fb', '#ffd700', '#ff6b6b', '#4ecdc4'];
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];

            fireworksContainer.appendChild(firework);

            // Create explosion
            setTimeout(() => {
                for (let j = 0; j < 12; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'explosion-particle';
                    particle.style.left = firework.style.left;
                    particle.style.top = firework.style.top;
                    particle.style.background = firework.style.background;

                    const angle = (j * 30) * Math.PI / 180;
                    const velocity = 100;
                    particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
                    particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');

                    fireworksContainer.appendChild(particle);

                    setTimeout(() => particle.remove(), 1000);
                }

                firework.remove();
            }, 500);
        }, i * 300);
    }
}

// Add CSS for fireworks particles
const fireworksStyle = document.createElement('style');
fireworksStyle.textContent = `
    .firework-particle {
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        pointer-events: none;
    }
    
    .explosion-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        pointer-events: none;
        animation: explode 1s ease-out forwards;
    }
    
    @keyframes explode {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
`;
document.head.appendChild(fireworksStyle);

// ========== SPARKLE EXPLOSION ==========
function createSparkleExplosion() {
    const sparklesContainer = document.getElementById('sparklesContainer');

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = '50%';
            sparkle.style.top = '30%';

            const angle = (i * 12) * Math.PI / 180;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            sparkle.style.animation = `sparkleExplosion 1s ease-out forwards`;
            sparkle.style.setProperty('--tx', tx + 'px');
            sparkle.style.setProperty('--ty', ty + 'px');

            sparklesContainer.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

// Add explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes sparkleExplosion {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// ========== FLOATING HEARTS BACKGROUND ==========
function initializeHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];

    // Create hearts periodically
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 800);
}

// ========== SPARKLES BACKGROUND ==========
function initializeSparkles() {
    const sparklesContainer = document.getElementById('sparklesContainer');

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';

        sparklesContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 300);
}

// ========== SHARE MOMENT ==========
function shareOurMoment() {
    // Take a screenshot effect
    const celebration = document.querySelector('.celebration-content');
    celebration.style.animation = 'flash 0.3s ease';

    setTimeout(() => {
        celebration.style.animation = '';

        // Show download/share options
        alert('💕 This magical moment is saved in your heart forever! 💕\n\nScreenshot this beautiful memory or share it with the world!');
    }, 300);
}

// Add flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flash {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.8;
            background: rgba(255, 255, 255, 0.3);
        }
    }
`;
document.head.appendChild(flashStyle);

// ========== RESPONSIVE ADJUSTMENTS ==========
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas.classList.contains('active')) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ========== PREVENT ACCIDENTAL EXIT ==========
window.addEventListener('beforeunload', (e) => {
    if (currentScene > 1 && currentScene < 5) {
        e.preventDefault();
        e.returnValue = '';
        return 'Are you sure you want to leave? Your special moment is waiting!';
    }
});
