<template>
    <div class="hero">
        <div class="hero-content">
                <h1>Web Developer and Systems Engineer</h1>
                <p>I am an Information Systems Engineering student, passionate about technology and web development. My goal is to use technology to solve problems and create innovative solutions that positively impact people and build technology tools that make a difference and reflect my commitment to quality and creativity. Explore my website to learn more about me and what I have to offer</p>
                <div class="cta-buttons">
                    <a :href="projectsLink" class="button primary-button">Projects</a>
                    <a :href="contactLink" class="button secondary-button">Contact Me</a>
                </div>
            </div>
            <div class="hero-image-container">
                <div class="hero-image">
                    <img src="../assets/OmegaLull.png" alt="OmegaLull Imagen">
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props: {
        projectsLink: {
            type: String,
            default: '#projects'
        },
        contactLink: {
            type: String,
            default: '#contact'
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700&display=swap');

.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 80px 60px;
    background: #1a1a1a;
    margin: 40px 0;
    border-radius: 20px;
    overflow: hidden;
    gap: 60px;
    flex-wrap: nowrap; /* Cambiado a nowrap para mantener la imagen a la derecha */
    position: relative;
    border: 2px solid transparent;
    background-image: 
        linear-gradient(#1a1a1a, #1a1a1a),
        linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    animation: borderRotate 4s linear infinite;
}

@keyframes borderRotate {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 50%, #ff00ff 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, #00ffff 0%, transparent 50%);
    opacity: 0.1;
    animation: pulseGlow 4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes pulseGlow {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
}

.hero-content {
    flex: 1 1 60%;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 20px;
    color: #ffffff;
    animation: fadeInLeft 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.2s;
    z-index: 2;
}

.hero h1 {
    font-family: 'Orbitron', monospace;
    font-size: 52px;
    font-weight: 900;
    background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin-bottom: 20px;
    position: relative;
    animation: textGlow 3s ease-in-out infinite;
    text-transform: uppercase;
    letter-spacing: 2px;
}

@keyframes textGlow {
    0%, 100% { 
        filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.8));
    }
    50% { 
        filter: drop-shadow(0 0 50px rgba(255, 0, 255, 0.8));
    }
}

.hero h1::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ff00ff, #00ffff, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: -1;
    filter: blur(10px);
    opacity: 0.5;
}

.hero p {
    font-family: 'Exo 2', sans-serif;
    font-size: 18px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    max-width: 700px;
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.hero p:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 0, 255, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.cta-buttons {
    display: flex;
    gap: 30px;
    margin-top: 20px;
    flex-wrap: wrap;
}

.button {
    font-family: 'Orbitron', monospace;
    padding: 16px 40px;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.primary-button {
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    color: #181818;
    box-shadow: 
        0 4px 20px rgba(0, 255, 255, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.primary-button::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
}

.primary-button:hover::before {
    animation: shimmer 0.5s ease;
}

@keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.primary-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
        0 8px 30px rgba(0, 255, 255, 0.6),
        0 0 60px rgba(255, 0, 255, 0.4);
}

.secondary-button {
    background: transparent;
    border: 2px solid #00ffff;
    color: #00ffff;
    position: relative;
    z-index: 1;
}

.secondary-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    transition: all 0.3s ease;
    z-index: -1;
    border-radius: 50px;
}

.secondary-button:hover {
    color: #181818;
    border-color: #ff00ff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
}

.secondary-button:hover::before {
    width: 100%;
}

.hero-image-container {
    flex: 0 0 35%;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: fadeInRight 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.4s;
    z-index: 2;
}

.hero-image {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1 / 1;
    background: #1e1e1e;
    border-radius: 20px;
    border: 3px solid transparent;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    background-image: 
        linear-gradient(#1e1e1e, #1e1e1e),
        linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    animation: imageGlow 4s ease-in-out infinite;
}

@keyframes imageGlow {
    0%, 100% { 
        box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.5),
            inset 0 0 30px rgba(0, 255, 255, 0.1);
    }
    50% { 
        box-shadow: 
            0 0 50px rgba(255, 0, 255, 0.5),
            inset 0 0 30px rgba(255, 0, 255, 0.1);
    }
}

.hero-image::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00);
    border-radius: 20px;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
    animation: rotateGradient 4s linear infinite;
}

@keyframes rotateGradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hero-image:hover::before {
    opacity: 1;
}

.hero-image:hover {
    transform: scale(1.05) translateY(-10px);
    filter: brightness(1.2);
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: all 0.3s ease;
}

.hero-image:hover img {
    filter: grayscale(0%) contrast(1.1);
}

/* Cyber lines effect */
.hero::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
    animation: scanLine 3s linear infinite;
}

@keyframes scanLine {
    0% { transform: translateY(0); }
    100% { transform: translateY(100vh); }
}

/* Animaciones */
@keyframes fadeInLeft {
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translateX(50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Glitch effect for title */
.hero h1:hover {
    animation: glitchText 0.5s ease-in-out;
}

@keyframes glitchText {
    0%, 100% { 
        text-shadow: 
            0 0 30px rgba(0, 255, 255, 0.8);
    }
    20% { 
        text-shadow: 
            3px 0 10px rgba(255, 0, 255, 0.8),
            -3px 0 10px rgba(0, 255, 255, 0.8);
    }
    40% { 
        text-shadow: 
            -3px 0 10px rgba(255, 255, 0, 0.8),
            3px 0 10px rgba(0, 255, 0, 0.8);
    }
    60% { 
        text-shadow: 
            0 3px 10px rgba(255, 0, 255, 0.8),
            0 -3px 10px rgba(0, 255, 255, 0.8);
    }
}

/* Responsividad */
@media (max-width: 1024px) {
    .hero {
        gap: 40px;
        padding: 60px 40px;
    }
    
    .hero-content {
        min-width: 300px;
    }
    
    .hero-image-container {
        min-width: 250px;
    }
    
    .hero-image {
        max-width: 350px;
    }
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        flex-wrap: wrap;
        padding: 40px 20px;
        text-align: center;
        gap: 40px;
    }

    .hero-content,
    .hero-image-container {
        flex: 1 1 100%;
        padding: 0;
        min-width: unset;
    }

    .hero h1 {
        font-size: 36px;
    }

    .hero p {
        font-size: 16px;
        padding: 15px;
    }

    .cta-buttons {
        justify-content: center;
    }

    .button {
        padding: 14px 30px;
        font-size: 14px;
    }

    .hero-image {
        max-width: 300px;
    }
}

/* Particulas flotantes */
.hero {
    position: relative;
}

.hero::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 0, 0.1) 0%, transparent 50%);
    animation: floatParticles 20s ease-in-out infinite;
}

@keyframes floatParticles {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
}
</style>
