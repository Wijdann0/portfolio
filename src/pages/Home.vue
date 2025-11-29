<template>
  <div>
    <HeroSection id="hero" />
    <AboutSection id="about" />
    <ServicesSection id="services" />
    <ProjectsSection id="projects" />
    <ExperienceSection id="experience" />
    <TestimonialsSection id="testimonials" />
    <BlogSection id="blog" />
    <ContactSection id="contact" />
  </div>
</template>

<script setup>
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ServicesSection from '@/sections/ServicesSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import TestimonialsSection from '@/sections/TestimonialsSection.vue'
import BlogSection from '@/sections/BlogSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
</script>
