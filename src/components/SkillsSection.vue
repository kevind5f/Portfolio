<template>
    <div class="skills">
        <h2 class="section-title">Technical Skills</h2>
        
        <div class="skills-container">
            <div 
                v-for="(skillGroup, index) in skills"
                :key="index"
                class="skill-category">
                <h3>{{ skillGroup.category }}</h3>
                <div class="skill-items">
                    <span
                        v-for="(item, idx) in skillGroup.items"
                        :key="idx"
                        class="skill-item">
                        {{ item }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['skills'])
    }
}
</script>

<style scoped>
.skills {
    padding: 60px 20px;
    background-color: #1a1a1a;
    min-height: 100vh;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 50px;
    position: relative;
    padding-bottom: 15px;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 3px;
    background-color: #ff4d4d;
}

.skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 40px;
    max-width: 1400px;
    margin: 0 auto;
}

.skill-category {
    background-color: #252525;
    border-radius: 15px;
    padding: 30px;
    transition: all 0.3s ease;
}

.skill-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.skill-category h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #ff4d4d;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #333;
}

.skill-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.skill-item {
    background-color: #333;
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    cursor: default;
    border: 1px solid transparent;
}

.skill-item:hover {
    background-color: #404040;
    border-color: #ff4d4d;
    transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
    .section-title {
        font-size: 2rem;
    }
    
    .skills-container {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .skill-category {
        padding: 25px;
    }
    
    .skill-category h3 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .skill-items {
        gap: 8px;
    }
    
    .skill-item {
        font-size: 0.85rem;
        padding: 6px 12px;
    }
}
</style>