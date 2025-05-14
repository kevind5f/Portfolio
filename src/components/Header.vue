<template>
    <header class="header">
        <div class="logo">@OmegaLull</div>
        <nav class="nav-links">
            <a
                v-for="item in links"
                :key="item.text"
                :href="item.link"
                class="nav-link"
            >{{ item.text }}</a>
        </nav>
    </header>
</template>

<script>
export default {
    props: {
    links: {
        type: Array,
        required: true
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    position: sticky;
    top: 0;
    background-color: rgba(24, 24, 24, 0.85);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    background-image: linear-gradient(rgba(24, 24, 24, 0.95), rgba(24, 24, 24, 0.95)),
                      linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ffff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    animation: borderGlow 4s linear infinite;
}

@keyframes borderGlow {
    0%, 100% { 
        background-position: 0% 50%;
        box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
    }
    50% { 
        background-position: 100% 50%;
        box-shadow: 0 2px 20px rgba(255, 0, 255, 0.3);
    }
}

.header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
        transparent 0%, 
        #00ffff 25%, 
        #ff00ff 50%, 
        #00ffff 75%, 
        transparent 100%);
    animation: scanline 3s linear infinite;
}

@keyframes scanline {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.logo {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 900;
    color: #00ffff;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    text-shadow: 
        0 0 10px #00ffff,
        0 0 20px #00ffff,
        0 0 30px #00ffff,
        0 0 40px #00ffff;
    animation: logoGlow 2s ease-in-out infinite alternate;
}

@keyframes logoGlow {
    from {
        text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 30px #00ffff,
            0 0 40px #00ffff;
    }
    to {
        text-shadow: 
            0 0 20px #00ffff,
            0 0 30px #00ffff,
            0 0 40px #00ffff,
            0 0 50px #00ffff;
    }
}

.logo:hover {
    transform: scale(1.1) rotateZ(-2deg);
    color: #ff00ff;
    text-shadow: 
        0 0 10px #ff00ff,
        0 0 20px #ff00ff,
        0 0 30px #ff00ff,
        0 0 40px #ff00ff;
}

.logo::before {
    content: '@OmegaLull';
    position: absolute;
    top: 0;
    left: 0;
    color: #ff00ff;
    opacity: 0;
    transform: translateZ(10px);
    transition: all 0.3s ease;
    z-index: -1;
}

.logo:hover::before {
    opacity: 0.5;
    transform: translateX(2px) translateY(2px) translateZ(10px);
}

.nav-links {
    display: flex;
    gap: 32px;
    align-items: center;
}

.nav-link {
    color: #ffffff;
    text-decoration: none;
    font-family: 'Exo 2', sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.nav-link::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, #00ffff 0%, #ff00ff 100%);
    transition: all 0.5s ease;
    border-radius: 50%;
    z-index: -1;
}

.nav-link:hover {
    color: #181818;
    transform: translateY(-2px) scale(1.05);
    text-shadow: none;
    box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.6),
        inset 0 0 20px rgba(255, 0, 255, 0.3);
}

.nav-link:hover::before {
    width: 200%;
    height: 200%;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #00ffff, #ff00ff);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
}

.nav-link:hover::after {
    transform: scaleX(1);
}

/* Animated background grid effect */
.header::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 15s linear infinite;
    z-index: -1;
    opacity: 0.5;
}

@keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
}

/* Mobile menu button (hidden by default) */
.menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    z-index: 1001;
}

.menu-toggle span {
    width: 25px;
    height: 3px;
    background: #00ffff;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #00ffff;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .header {
        padding: 16px 20px;
        position: relative;
    }
    
    .logo {
        font-size: 24px;
    }
    
    .menu-toggle {
        display: flex;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .nav-links {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: rgba(24, 24, 24, 0.98);
        flex-direction: column;
        justify-content: center;
        gap: 40px;
        transition: left 0.3s ease;
        backdrop-filter: blur(20px);
    }
    
    .nav-links.active {
        left: 0;
    }
    
    .nav-link {
        font-size: 20px;
        padding: 12px 30px;
    }
    
    /* Menu toggle animation */
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

/* Scroll effect */
.header.scrolled {
    padding: 12px 32px;
    background-color: rgba(24, 24, 24, 0.98);
    box-shadow: 0 5px 30px rgba(0, 255, 255, 0.2);
}

/* Easter egg: logo click effect */
.logo:active {
    animation: glitchLogo 0.3s ease-in-out;
}

@keyframes glitchLogo {
    0%, 100% { 
        text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff;
    }
    25% { 
        text-shadow: 
            -2px 0 #ff00ff,
            2px 0 #00ff00,
            0 0 10px #00ffff;
    }
    50% { 
        text-shadow: 
            2px 0 #ff00ff,
            -2px 0 #ffff00,
            0 0 20px #00ffff;
    }
    75% { 
        text-shadow: 
            0 2px #00ff00,
            0 -2px #ff00ff,
            0 0 30px #00ffff;
    }
}
</style>