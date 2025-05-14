<template>
    <div class="project">
        <div class="project-image">
            <img :src="project.img" :alt="project.name" style="height: 100%; width: 100%; object-fit: cover;" />
        </div>
        <div class="project-content">
            <h3 class="project-title">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
                <span class="project-tag" v-for="(tech, index) in project.technologies" :key="index">
                {{ tech }}
                </span>
            </div>
            <a :href="project.link" target="_blank" class="button primary-button">Ver Proyecto</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: {
        project: {
            type: Object,
        required: true
        }
    }
}
</script>

<style scoped>
.project {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(24, 24, 24, 0.9));
    border: 2px solid transparent;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    transition: all 0.4s ease;
    animation: fadeInUp 0.6s ease forwards;
    backdrop-filter: blur(10px);
}

.project::before {
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
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project:hover::before {
    opacity: 1;
}

.project:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
        0 20px 40px rgba(255, 0, 128, 0.3),
        0 15px 30px rgba(0, 255, 255, 0.2),
        inset 0 0 30px rgba(255, 255, 255, 0.05);
}

.project-image {
    position: relative;
    grid-column: 1;
    grid-row: 1 / span 2;
    min-height: 280px;
    overflow: hidden;
    background-color: #181818;
}

.project-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 0, 128, 0.2), transparent, rgba(0, 255, 255, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.project:hover .project-image::after {
    opacity: 1;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, filter 0.3s ease;
}

.project:hover .project-image img {
    transform: scale(1.1);
    filter: contrast(1.2) saturate(1.3);
}

.project-content {
    grid-column: 2;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.project-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #ff0080, #00ffff, #8a2be2);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project:hover .project-content::before {
    opacity: 1;
}

.project-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #fff, #ff0080, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: gradientText 3s linear infinite;
}

.project-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff0080, #00ffff, #8a2be2);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.project:hover .project-title::after {
    transform: scaleX(1);
}

.project-description {
    font-size: 1rem;
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
    transition: color 0.3s ease;
}

.project:hover .project-description {
    color: #fff;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.project-tag {
    display: inline-block;
    background: rgba(42, 42, 42, 0.8);
    color: #fff;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.project-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 0, 128, 0.4), transparent);
    transition: left 0.5s ease;
}

.project-tag:hover::before {
    left: 100%;
}

.project-tag:hover {
    background: rgba(255, 0, 128, 0.2);
    border-color: #ff0080;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 0, 128, 0.3);
}

.button.primary-button {
    align-self: start;
    padding: 12px 24px;
    background: linear-gradient(45deg, #ff0080, #8a2be2);
    color: #fff;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 
        0 4px 15px rgba(255, 0, 128, 0.4),
        inset 0 0 0 2px transparent;
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
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
        0 6px 20px rgba(255, 0, 128, 0.5),
        0 0 30px rgba(0, 255, 255, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.3);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Animaciones */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes borderAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes gradientText {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

/* Efecto de partículas */
.project::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project:hover::after {
    opacity: 1;
}

/* Responsivo */
@media (max-width: 768px) {
    .project {
        grid-template-columns: 1fr;
    }
    .project-image {
        grid-row: 1;
        min-height: 200px;
    }
    .project-content {
        grid-column: 1;
        padding: 20px;
    }
    .project-title {
        font-size: 1.5rem;
    }
    .project-description {
        font-size: 0.95rem;
    }
}

@media (max-width: 480px) {
    .project {
        gap: 20px;
    }
    .project-tags {
        gap: 8px;
    }
    .project-tag {
        padding: 5px 10px;
        font-size: 0.8rem;
    }
    .button.primary-button {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
}
</style>