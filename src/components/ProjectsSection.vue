<template>
    <section id="projects">
        <h2 class="section-title">Proyectos</h2>
        <div class="projects-container">
            <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            :project="project"
            />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import ProjectCard from './ProjectCard.vue'

export default {
    name: 'ProjectsSection',
    components: {
        ProjectCard
    },
    computed: {
        ...mapState(['projects'])
    }
}
</script>

<style scoped>
section {
    margin: 60px;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 15px;
    animation: fadeInDown 0.8s ease forwards;
    opacity: 0;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background-color: #ff4d4d;
    border-radius: 2px;
}

.projects-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.2s;
}

/* Animaciones de entrada */
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsividad */
@media (max-width: 1024px) {
    .section-title {
        font-size: 2.25rem;
        margin-bottom: 35px;
    }
    .projects-container {
        gap: 30px;
    }
}

@media (max-width: 768px) {
    .section-title {
        font-size: 2rem;
        margin-bottom: 30px;
    }
    .projects-container {
        grid-template-columns: 1fr 1fr;
        gap: 25px;
    }
}

@media (max-width: 480px) {
    .section-title {
        font-size: 1.75rem;
        margin-bottom: 25px;
    }
    .projects-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>
