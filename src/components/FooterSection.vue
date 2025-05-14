<template>
    <footer class="footer" role="contentinfo" aria-label="Pie de página">
        <div class="container">
            <p class="footer__copy">
            © {{ currentYear }} <strong>OmegaLull</strong> — Desarrollador Web &amp; Ingeniero de Sistemas.
            </p>
            <nav class="footer__nav" aria-label="Redes sociales">
                <ul class="footer__list">
                    <li class="footer__item">
                        <a
                            href="https://github.com/OmegaLull"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub de OmegaLull"
                        >
                        GitHub
                        </a>
                    </li>
                    <li class="footer__item">
                        <a
                            href="https://www.linkedin.com/in/omegalull/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn de OmegaLull"
                        >
                        LinkedIn
                        </a>
                    </li>
                    <li class="footer__item">
                        <a
                            href="mailto:omegalull@example.com"
                            aria-label="Enviar correo a OmegaLull"
                        >
                        Email
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentYear = ref(new Date().getFullYear());

  // (Opcional) Si quisieras animar algo al cargar el footer
onMounted(() => {
    // console.log('Footer montado 🎉');
});
</script>

<style scoped>
.footer {
    text-align: center;
    padding: 3rem 0 2rem;
    margin-top: 5rem;
    background: #181818;
    position: relative;
    overflow: hidden;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff0080, #00ffff, #8a2be2, #ff0080);
    background-size: 400% 100%;
    animation: gradientMove 4s linear infinite;
}

.footer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 50%, rgba(255, 0, 128, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
    animation: pulseBackground 6s ease-in-out infinite;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
}

.footer__copy {
    font-size: 0.95rem;
    color: #ccc;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    animation: fadeIn 1s ease forwards;
    opacity: 0;
}

.footer__copy strong {
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: linear-gradient(90deg, #ff0080, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
}

.footer__nav {
    font-size: 0.95rem;
    animation: fadeIn 1s ease forwards;
    animation-delay: 0.2s;
    opacity: 0;
}

.footer__list {
    list-style: none;
    display: inline-flex;
    gap: 2rem;
    padding: 0;
    margin: 0;
}

.footer__item a {
    color: #ccc;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
    display: inline-block;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
}

.footer__item a::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff0080, #00ffff);
    transform: translateX(-50%);
    transition: width 0.3s ease;
}

.footer__item a::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 0, 128, 0.3), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
    border-radius: 50%;
}

.footer__item a:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 0, 128, 0.8);
    transform: translateY(-2px);
}

.footer__item a:hover::before {
    width: 100%;
}

.footer__item a:hover::after {
    width: 100px;
    height: 100px;
}

/* Efecto de icono en hover */
.footer__item {
    position: relative;
}

.footer__item::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #ff0080, #00ffff);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.8);
}

.footer__item:hover::before {
    opacity: 1;
    top: -25px;
    animation: floatIcon 1s ease-in-out infinite;
}

/* Animaciones */
@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}

@keyframes pulseBackground {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
}

@keyframes fadeIn {
    0% { 
        opacity: 0; 
        transform: translateY(20px);
    }
    100% { 
        opacity: 1; 
        transform: translateY(0);
    }
}

@keyframes floatIcon {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-3px); }
}

/* Responsive */
@media (max-width: 768px) {
    .footer {
        padding: 2.5rem 0 1.5rem;
    }
    
    .footer__list {
        gap: 1.5rem;
    }
    
    .footer__item a {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .footer__list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .footer__copy {
        font-size: 0.85rem;
        margin-bottom: 1rem;
    }
    
    .footer__item a {
        font-size: 0.85rem;
    }
}
</style>
