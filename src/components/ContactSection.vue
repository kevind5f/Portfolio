<template>
    <section id="contact">
        <h2 class="section-title">Contacto</h2>
        <div class="contact-container">
            <div class="contact-info">
                <h3>Redes Sociales</h3>
                <div class="social-links">
                    <a href="https://wa.me/+51930110963" class="social-button">
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://www.instagram.com/omegalull.1/" class="social-button">
                        <span>Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100068875626308" class="social-button">
                        <span>Facebook</span>
                    </a>
                </div>

                <h3>Perfil Profesional</h3>
                <div class="professional-links">
                    <a href="https://github.com/kevind5f" class="professional-button">
                        <span>GitHub</span>
                    </a>
                    <a href="https://codepen.io/kevin-felices-ledesma/pens/public" class="professional-button">
                        <span>CodePen</span>
                    </a>
                    <a href="https://www.linkedin.com/in/kevin-felices-ledesma-3210991bb/" class="professional-button">
                        <span>LinkedIn</span>
                    </a>
                    <a href="cv.Omega.pdf" class="button primary-button">Descargar CV</a>
                </div>
            </div>

            <div class="contact-form">
                <form>
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" placeholder="Tu nombre">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Tu email">
                    </div>
                    <div class="form-group">
                        <label for="message">Mensaje</label>
                        <textarea id="message" placeholder="Escribe tu mensaje aquí..."></textarea>
                    </div>
                    <button type="submit" class="button primary-button">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
section#contact {
    padding: 80px 20px;
    background-color: #181818;
    color: #fff;
    position: relative;
    overflow: hidden;
}

section#contact::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 10% 50%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 90% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 50% 10%, rgba(138, 43, 226, 0.08) 0%, transparent 50%);
    pointer-events: none;
    animation: pulseBackground 10s ease-in-out infinite;
}

.section-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 50px;
    position: relative;
    padding-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    animation: slideInUp 0.8s ease forwards, neonFlicker 2s ease-in-out infinite;
    opacity: 0;
    text-shadow: 
        0 0 10px rgba(255, 0, 128, 0.8),
        0 0 20px rgba(255, 0, 128, 0.6),
        0 0 30px rgba(255, 0, 128, 0.4),
        0 0 40px rgba(255, 0, 128, 0.2);
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, #ff0080, #00ffff, #8a2be2, #ff0080);
    background-size: 400% 100%;
    border-radius: 2px;
    animation: gradientMove 3s linear infinite;
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.8);
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.contact-info {
    animation: fadeInLeft 0.8s ease forwards;
    animation-delay: 0.3s;
    opacity: 0;
}

.contact-info h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff0080, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    padding-left: 20px;
}

.contact-info h3::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #ff0080, #00ffff);
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.6);
}

.social-links,
.professional-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;
}

.social-button,
.professional-button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    background: rgba(42, 42, 42, 0.8);
    color: #fff;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
}

.social-button::before,
.professional-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 0, 128, 0.3), transparent);
    transition: left 0.5s ease;
}

.social-button:hover::before,
.professional-button:hover::before {
    left: 100%;
}

.social-button:hover,
.professional-button:hover {
    background: rgba(255, 0, 128, 0.1);
    border-color: #ff0080;
    transform: translateX(10px);
    box-shadow: 
        0 10px 20px rgba(255, 0, 128, 0.3),
        0 5px 10px rgba(0, 255, 255, 0.2),
        inset 0 0 20px rgba(255, 255, 255, 0.05);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.contact-form {
    background: linear-gradient(135deg, rgba(34, 34, 34, 0.9), rgba(17, 17, 17, 0.9));
    padding: 40px 30px;
    border-radius: 20px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    animation: fadeInRight 0.8s ease forwards;
    animation-delay: 0.5s;
    opacity: 0;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
}

.contact-form::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0080, #00ffff, #8a2be2, #ff0080);
    border-radius: 20px;
    background-size: 400% 400%;
    animation: borderAnimation 4s linear infinite;
    z-index: -1;
    opacity: 0.5;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 0.95rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 14px;
    background-color: rgba(30, 30, 30, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #ff0080;
    background-color: rgba(30, 30, 30, 0.9);
    box-shadow: 
        0 0 15px rgba(255, 0, 128, 0.6),
        inset 0 0 10px rgba(255, 0, 128, 0.1);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.button.primary-button {
    background: linear-gradient(45deg, #ff0080, #8a2be2);
    color: white;
    padding: 14px 32px;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 
        0 4px 15px rgba(255, 0, 128, 0.4),
        inset 0 0 0 2px transparent;
    width: 100%;
    margin-top: 10px;
}

.button.primary-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
}

.button.primary-button:hover::before {
    left: 100%;
}

.button.primary-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
        0 6px 20px rgba(255, 0, 128, 0.5),
        0 0 30px rgba(0, 255, 255, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.3);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Animaciones */
@keyframes slideInUp {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
    0% { opacity: 0; transform: translateX(-50px); }
    100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
    0% { opacity: 0; transform: translateX(50px); }
    100% { opacity: 1; transform: translateX(0); }
}

@keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}

@keyframes borderAnimation {
    0% { background-position: 0% 50%; opacity: 0.5; }
    50% { background-position: 100% 50%; opacity: 0.8; }
    100% { background-position: 0% 50%; opacity: 0.5; }
}

@keyframes pulseBackground {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

/* Responsive */
@media (max-width: 900px) {
    .contact-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .contact-form {
        padding: 30px 20px;
    }
    
    .section-title {
        font-size: 2.5rem;
    }
}

@media (max-width: 480px) {
    section#contact {
        padding: 60px 15px;
    }
    
    .section-title {
        font-size: 2rem;
        letter-spacing: 1px;
    }
    
    .contact-info h3 {
        font-size: 1.3rem;
    }
    
    .social-button,
    .professional-button {
        font-size: 14px;
        padding: 10px 16px;
    }
}
</style>
