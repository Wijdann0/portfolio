<template>
  <section :id="id" class="max-w-6xl mx-auto px-4 py-20" ref="sectionRef">
    <div class="flex items-end justify-between mb-10">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-gray-400">
          Selected Work
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold mt-2">Projects</h2>
      </div>
      <RouterLink
        to="/projects"
        class="text-xs md:text-sm text-gray-400 hover:text-white underline underline-offset-4"
      >
        Lihat semua proyek
      </RouterLink>
    </div>
    <div class="flex-1 glass-card p-6 md:p-7 space-y-4">
      <div v-if="loading" class="text-gray-400 text-sm">Memuat proyek...</div>
      <div v-else-if="error" class="text-red-400 text-sm">
        Terjadi kesalahan: {{ error }}
      </div>
      <div v-else class="grid md:grid-cols-2 gap-6">
        <article
          v-for="project in projects"
          :key="project.id"
          class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent/60 transition-all hover:-translate-y-1 hover:shadow-soft-glow"
        >
          <div class="aspect-video overflow-hidden">
            <img
              :src="project.thumbnail_url || fallbackImage"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div class="p-5 md:p-6 space-y-3">
            <div
              class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400"
            >
              <span>Featured Project</span>
              <span class="h-[1px] w-10 bg-gray-700"></span>
            </div>
            <h3 class="text-lg md:text-xl font-semibold">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-400 line-clamp-2">
              {{ project.short_description }}
            </p>

            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tech in project.tech_stack || []"
                :key="tech"
                class="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-gray-300"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex items-center justify-between mt-4 text-xs">
              <RouterLink
                :to="`/projects/${project.slug}`"
                class="inline-flex items-center gap-1 text-accent-soft hover:text-accent"
              >
                Detail proyek
                <span>→</span>
              </RouterLink>
              <div class="flex items-center gap-3 text-gray-400">
                <a
                  v-if="project.github_url"
                  :href="project.github_url"
                  target="_blank"
                  class="hover:text-white"
                >
                  GitHub
                </a>
                <a
                  v-if="project.demo_url"
                  :href="project.demo_url"
                  target="_blank"
                  class="hover:text-white"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Menampilkan daftar proyek dari Supabase dengan desain kartu modern
import { onMounted, ref } from "vue";
import { useProjectsStore } from "@/store/useProjectsStore";
import { storeToRefs } from "pinia";
import { useIntersection } from "@/utils/useInterSection"; // kita bikin sendiri

const props = defineProps({
  id: String,
});

const projectsStore = useProjectsStore();
const { projects, loading, error } = storeToRefs(projectsStore);

const fallbackImage = "/fallback-project.jpg"; // taruh di public/

const sectionRef = ref(null);
const { isVisible } = useIntersection(sectionRef);
onMounted(() => {
  projectsStore.fetchProjects({ featuredOnly: true });
});
</script>

<style scoped>
/* bisa tambahkan style khusus kalau perlu */
</style>
