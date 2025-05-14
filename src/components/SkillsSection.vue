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
    padding: 80px 20px;
    background-color: #181818;
    min-height: 100vh;
    color: #fff;
    overflow: hidden;
    position: relative;
}

.skills::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 50%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 100%, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: pulseBackground 8s ease-in-out infinite;
}

.section-title {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 60px;
    position: relative;
    padding-bottom: 20px;
    animation: slideInUp 0.8s ease forwards, neonFlicker 2s ease-in-out infinite;
    opacity: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
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
    width: 200px;
    height: 4px;
    background: linear-gradient(90deg, #ff0080, #00ffff, #8a2be2, #ff0080);
    background-size: 400% 100%;
    border-radius: 2px;
    animation: gradientMove 3s linear infinite;
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.8);
}

.skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 50px;
    max-width: 1400px;
    margin: 0 auto;
}

.skill-category {
    background: linear-gradient(135deg, rgba(34, 34, 34, 0.9), rgba(17, 17, 17, 0.9));
    border: 2px solid transparent;
    border-radius: 20px;
    padding: 40px 30px;
    transition: all 0.4s ease;
    animation: fadeIn 0.8s ease forwards;
    opacity: 0;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.skill-category::before {
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

.skill-category:hover::before {
    opacity: 1;
}

.skill-category:nth-child(1) { animation-delay: 0.2s; }
.skill-category:nth-child(2) { animation-delay: 0.4s; }
.skill-category:nth-child(3) { animation-delay: 0.6s; }
.skill-category:nth-child(4) { animation-delay: 0.8s; }

.skill-category:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
        0 20px 40px rgba(255, 0, 128, 0.3),
        0 15px 30px rgba(0, 255, 255, 0.2),
        inset 0 0 30px rgba(255, 255, 255, 0.05);
}

.skill-category h3 {
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid transparent;
    background: linear-gradient(90deg, #ff0080, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    text-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
}

.skill-category h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ff0080, #00ffff, #8a2be2);
    background-size: 200% 100%;
    animation: gradientMove 2s linear infinite;
}

.skill-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.skill-item {
    background: rgba(51, 51, 51, 0.8);
    color: #fff;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 0, 128, 0.6), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
}

.skill-item:hover::before {
    width: 100%;
    height: 100%;
}

.skill-item:hover {
    background: rgba(255, 0, 128, 0.2);
    border-color: #ff0080;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 
        0 10px 20px rgba(255, 0, 128, 0.4),
        0 5px 10px rgba(0, 255, 255, 0.3),
        inset 0 0 15px rgba(255, 255, 255, 0.1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Animaciones */
@keyframes slideInUp {
    0% { 
        opacity: 0; 
        transform: translateY(50px);
    }
    100% { 
        opacity: 1; 
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    0% { 
        opacity: 0; 
        transform: translateY(30px) scale(0.9);
    }
    100% { 
        opacity: 1; 
        transform: translateY(0) scale(1);
    }
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
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes pulseBackground {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

/* Efectos de partículas flotantes */
.skills::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: 
        radial-gradient(circle, rgba(255, 0, 128, 0.3) 1px, transparent 1px),
        radial-gradient(circle, rgba(0, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 50px 50px, 80px 80px;
    background-position: 0 0, 25px 25px;
    animation: particleFloat 20s linear infinite;
    pointer-events: none;
}

@keyframes particleFloat {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-50px, -50px); }
}

/* Responsive Design */
@media (max-width: 992px) {
    .section-title { 
        font-size: 2.5rem; 
        margin-bottom: 40px;
    }
    .skills-container { gap: 40px; }
}

@media (max-width: 768px) {
    .skills { padding: 60px 15px; }
    .section-title { 
        font-size: 2rem;
        letter-spacing: 1px;
    }
    .skill-category { padding: 30px 20px; }
    .skill-category h3 { 
        font-size: 1.3rem; 
        margin-bottom: 20px;
    }
    .skill-items { gap: 12px; }
    .skill-item { 
        font-size: 0.9rem; 
        padding: 8px 16px;
    }
}

@media (max-width: 480px) {
    .section-title { font-size: 1.75rem; }
    .skills-container { 
        grid-template-columns: 1fr; 
        gap: 30px;
    }
    .skill-item {
        font-size: 0.85rem;
        padding: 6px 12px;
    }
}
</style>