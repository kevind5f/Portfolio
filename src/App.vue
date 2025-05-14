<template>
  <div class="container">
    <Header :links="navlinks"/>

    <Hero projectsLink="#projects" contactLink="#contact" id="about"/>

    <SkillsSection id="skills"/>

    <ProjetcsSection id="projects"/>

    <ContactSection id="contact"/>

    <FooterSection />

    <router-view />

  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjetcsSection from './components/ProjectsSection.vue';
import FooterSection from './components/FooterSection.vue';
import ContactSection from './components/ContactSection.vue';

export default {
  name: 'App',
  data(){
    return{
      navlinks: [
        {text: 'About Me', link: '#about'},
        {text: 'Skills', link: '#skills'},
        {text: 'Projects', link: '#projects'},
        {text: 'Contact', link: '#contact'}
      ]
    }
  },
  components: {
    Header,
    Hero,
    SkillsSection,
    ProjetcsSection,
    FooterSection,
    ContactSection
  }
}
</script>


<style>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700&display=swap');

:root {
  --max-width: 1200px;
  --padding-base: 20px;
  --text-color: #fff;
  --font-primary: 'Exo 2', sans-serif;
  --font-accent: 'Orbitron', monospace;
  --bg-dark: #181818;
  
  /* Neon Colors */
  --neon-cyan: #00ffff;
  --neon-pink: #ff00ff;
  --neon-yellow: #ffff00;
  --neon-green: #00ff00;
  --neon-purple: #9d00ff;
  --neon-orange: #ff9100;
  
  /* Shadows */
  --neon-glow: 0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan);
  --text-glow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-primary);
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-color);
  overflow-x: hidden;
}

/* Animated background effect */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 20% 50%, var(--neon-purple) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, var(--neon-cyan) 0%, transparent 50%),
    radial-gradient(circle at 50% 80%, var(--neon-pink) 0%, transparent 50%);
  opacity: 0.05;
  animation: floatingBg 20s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes floatingBg {
  0%, 100% { transform: rotate(0deg) scale(1); }
  33% { transform: rotate(120deg) scale(1.1); }
  66% { transform: rotate(240deg) scale(0.9); }
}

.container {
  background-color: var(--bg-dark);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-base);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

section {
  padding: 30px 0;
  position: relative;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

section:nth-child(1) { animation-delay: 0.1s; }
section:nth-child(2) { animation-delay: 0.2s; }
section:nth-child(3) { animation-delay: 0.3s; }
section:nth-child(4) { animation-delay: 0.4s; }
section:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 16px;
  line-height: 1.2;
  font-family: var(--font-accent);
  color: var(--neon-cyan);
  text-shadow: var(--text-glow);
  transform: perspective(300px);
  animation: neonFlicker 3s ease-in-out infinite;
}

@keyframes neonFlicker {
  0%, 100% { opacity: 1; text-shadow: var(--text-glow); }
  80% { opacity: 0.8; }
  90% { opacity: 1; }
  92% { opacity: 0.9; }
}

p {
  margin-bottom: 24px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

p:hover {
  color: var(--text-color);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  transform: translateX(5px);
}

a {
  color: var(--neon-cyan);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;
}

a:hover {
  color: var(--neon-pink);
  text-shadow: 0 0 10px var(--neon-pink);
  transform: translateY(-2px) scale(1.05);
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink), var(--neon-yellow));
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--neon-cyan);
}

a:hover::after {
  width: 100%;
}

button {
  font-family: var(--font-accent);
  font-weight: 700;
  border: 2px solid var(--neon-cyan);
  background: transparent;
  color: var(--neon-cyan);
  padding: 12px 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--neon-cyan);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
  z-index: -1;
}

button:hover {
  color: var(--bg-dark);
  border-color: var(--neon-pink);
  text-shadow: none;
  box-shadow: 0 0 20px var(--neon-pink), inset 0 0 20px var(--neon-pink);
  transform: translateY(-3px) scale(1.05);
}

button:hover::before {
  width: 300%;
  height: 300%;
}

/* Add neon glow animation to elements */
.neon-glow {
  animation: neonPulse 2s ease-in-out infinite;
}

@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 20px var(--neon-cyan); }
  50% { box-shadow: 0 0 40px var(--neon-cyan), 0 0 60px var(--neon-cyan); }
}

/* Scroll indicator animation */
.scroll-indicator {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid var(--neon-cyan);
  border-radius: 25px;
  opacity: 0.8;
  animation: bounce 2s ease-in-out infinite;
}

.scroll-indicator::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 10px;
  background: var(--neon-cyan);
  border-radius: 2px;
  animation: scrollDown 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

@keyframes scrollDown {
  0% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  section {
    padding: 40px 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-size: 90%;
  }
  
  button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Parallax effect for sections */
section {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

section:hover {
  transform: translateZ(20px) rotateX(2deg);
}

/* Loading animation */
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-top-color: var(--neon-cyan);
  border-bottom-color: var(--neon-pink);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Glitch effect for text */
.glitch {
  position: relative;
  color: var(--neon-cyan);
  animation: glitch 2s ease-in-out infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  animation: glitchBefore 0.3s ease-in-out infinite;
  color: var(--neon-pink);
  z-index: -1;
}

.glitch::after {
  animation: glitchAfter 0.3s ease-in-out infinite;
  color: var(--neon-green);
  z-index: -1;
}

@keyframes glitch {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}

@keyframes glitchBefore {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px) translateY(1px); }
  40% { transform: translateX(2px) translateY(-1px); }
  60% { transform: translateX(-1px) translateY(2px); }
  80% { transform: translateX(1px) translateY(-2px); }
}

@keyframes glitchAfter {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(2px) translateY(-1px); }
  40% { transform: translateX(-2px) translateY(1px); }
  60% { transform: translateX(1px) translateY(-2px); }
  80% { transform: translateX(-1px) translateY(2px); }
}
</style>