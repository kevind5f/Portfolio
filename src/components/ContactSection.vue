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

<style>
    .contact-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;
    }

    .contact-info h3 {
        font-size: 22px;
        margin-bottom: 20px;
    }

    .social-links, .professional-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }

    .social-button, .professional-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s;
    }

    .social-button {
        background-color: #333;
        color: white;
    }

    .social-button:hover {
        transform: translateX(5px);
    }

    .professional-button {
        background-color: #2a2a2a;
        color: white;
        border: 1px solid #444;
    }

    .professional-button:hover {
        background-color: #3a3a3a;
        transform: translateX(5px);
    }

    .contact-form {
        background-color: #222;
        padding: 30px;
        border-radius: 15px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
    }

    .form-group input, .form-group textarea {
        width: 100%;
        padding: 12px;
        background-color: #333;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
    }

    .form-group textarea {
        min-height: 150px;
        resize: vertical;
    }
</style>