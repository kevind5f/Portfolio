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

<style>
    .hero {
        display: flex;
        align-items: center;
        padding: 60px 0;
        background-color: #222;
        margin: 20px 0;
        border-radius: 15px;
        overflow: hidden;
    }
    .hero-content {
        width: 60%;
        padding: 0 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .hero-image-container {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .hero-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 400px;
        background-color: #1e1e1e;
        border-radius: 15px;
        border: 2px solid #555;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .hero-image img{
        width: 100%;
        height: 100%;
        object-fit: none;
        object-position: contain;
    }
    .hero-image:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
    .hero h1 {
        font-size: 42px;
        margin-bottom: 20px;
    }

    .hero p {
        font-size: 18px;
        margin-bottom: 30px;
        color: #aaa;
        line-height: 1.6;
    }

    .cta-buttons {
        display: flex;
        gap: 15px;
    }

    .button {
        padding: 10px 25px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
    }

    .primary-button {
        background-color: #ff4d4d;
        color: white;
    }

    .primary-button:hover {
        background-color: #ff3333;
        transform: translateY(-2px);
    }

    .secondary-button {
        background-color: transparent;
        border: 1px solid #666;
        color: white;
    }

    .secondary-button:hover {
        border-color: #ff4d4d;
        color: #ff4d4d;
        transform: translateY(-2px);
    }
</style>