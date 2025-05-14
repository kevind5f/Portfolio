<template>
  <div class="container">
    <Header :links="navlinks"/>

    <Hero projectsLink="#projects" contactLink="#contact" id="about"/>

    <SkillsSection id="skills"/>

    <ProjetcsSection id="projects"/>

    <ContactSection id="contact"/>

    <FooterSection />

    <router-view />

  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjetcsSection from './components/ProjectsSection.vue';
import FooterSection from './components/FooterSection.vue';
import ContactSection from './components/ContactSection.vue';

export default {
  name: 'App',
  data(){
    return{
      navlinks: [
        {text: 'About Me', link: '#about'},
        {text: 'Skills', link: '#skills'},
        {text: 'Projects', link: '#projects'},
        {text: 'Contact', link: '#contact'}
      ]
    }
  },
  components: {
    Header,
    Hero,
    SkillsSection,
    ProjetcsSection,
    FooterSection,
    ContactSection
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }
  body{
    background-color: #181818;
    color: #fff;
  }
  .container{
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  section{
    margin: 60px 0;
  }
</style>
