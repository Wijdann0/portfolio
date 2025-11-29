<template>
  <section
    :id="id"
    ref="heroRef"
    class="container-main section-y flex flex-col md:flex-row items-center gap-12"
  >
    <!-- Kiri -->
    <div class="flex-1 glass-card p-6 md:p-7 space-y-4">
      <p class="section-eyebrow">Front-end Engineer · Full Stack Developer</p>

      <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        Portfolio Website
        <p class="text-2xl md:text-2xl lg:text-2xl font-semibold leading-tigh">
          Wijdan Fathu Rohman
        </p>
      </h1>

      <p class="text-gray-300 text-base md:text-lg max-w-xl">
        I'm a developer, I focus on user experience, performance, and code
        quality. I work with Vue 3, Supabase, and other modern technologies.
      </p>

      <!-- Tombol -->
      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="scrollTo('projects')"
          class="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-soft text-sm font-medium shadow-soft-glow transition-all hover:-translate-y-[1px]"
        >
          Lihat Proyek
        </button>

        <a
          href="/cv.pdf"
          target="_blank"
          class="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition"
        >
          Download CV
        </a>

        <button
          @click="scrollTo('contact')"
          class="px-5 py-2.5 rounded-full border border-white/15 hover:border-accent text-sm font-medium transition"
        >
          Hubungi Saya
        </button>
      </div>

      <p class="text-xs text-gray-400 pt-2">
        Tersedia untuk freelance & remote collaboration.
      </p>
    </div>

    <!-- Kanan: Avatar -->
    <div class="flex-1 flex justify-center">
      <div
        class="relative h-64 w-64 md:h-72 md:w-72 rounded-[32px] bg-gradient-to-br from-accent/40 via-bg-main to-accent-soft/40 overflow-hidden border border-white/10 shadow-soft-glow"
      >
        <img
          :src="avatarImg"
          alt="Avatar"
          class="w-full h-full object-cover mix-blend-lighten"
        />

        <!-- Glow dekorasi -->
        <div
          class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent-soft/30 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";
import avatarImg from "@/assets/Avatar.jpg";

const props = defineProps({ id: String });
const router = useRouter();
const heroRef = ref(null);

const scrollTo = async (id) => {
  if (router.currentRoute.value.name !== "home") {
    await router.push({ name: "home", hash: `#${id}` });
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  if (!heroRef.value) return;
  gsap.from(heroRef.value.children, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
  });
});
</script>
