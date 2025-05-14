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

<style>
    section {
        margin: 60px 0;
    }

    .section-title {
        font-size: 32px;
        margin-bottom: 30px;
        position: relative;
        padding-bottom: 10px;
    }

    .section-title:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 80px;
        height: 4px;
        background-color: #ff4d4d;
    }
    .projects-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }
</style>