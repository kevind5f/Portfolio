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

<style>
    .project {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        background-color: #222;
        border-radius: 15px;
        overflow: hidden;
    }

    .project-image {
        grid-column: 1;
        grid-row: 1 / span 2;
        height: 100%;
        min-height: 300px;
        background-color: #444; /* Placeholder for project image */
    }

    .project-content {
        grid-column: 2;
        padding: 30px;
        display: flex;
        flex-direction: column;
    }

    .project-title {
        font-size: 24px;
        margin-bottom: 15px;
    }

    .project-description {
        font-size: 16px;
        color: #aaa;
        margin-bottom: 20px;
        line-height: 1.6;
        flex-grow: 1;
    }

    .project-tags {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .project-tag {
        padding: 5px 10px;
        background-color: #333;
        border-radius: 5px;
        font-size: 12px;
    }
</style>