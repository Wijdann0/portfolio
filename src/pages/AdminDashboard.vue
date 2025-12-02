<template>
  <div class="min-h-[80vh] bg-bg-main">
    <!-- Header Dashboard -->
    <header class="border-b border-white/10 bg-bg-main/80 backdrop-blur-xl">
      <div
        class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4"
      >
        <div class="space-y-1">
          <p class="text-[11px] uppercase tracking-[0.3em] text-gray-500">
            Admin Panel
          </p>
          <h1 class="text-xl md:text-2xl font-semibold">Portfolio CMS</h1>
          <p class="text-xs text-gray-400">
            Kelola projects, blog posts, dan testimonials untuk website
            portofolio kamu.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden md:flex flex-col items-end text-xs text-gray-400">
            <span class="text-gray-300 font-medium">
              {{ userStore.user?.email || "Admin" }}
            </span>
            <span class="text-gray-500"> Supabase Auth </span>
          </div>
          <button
            @click="handleLogout"
            class="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Konten utama -->
    <main class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <!-- Ringkasan angka di atas -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-card p-4 flex items-center justify-between">
          <div>
            <p class="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Projects
            </p>
            <p class="text-2xl font-semibold mt-1">
              {{ projects.length }}
            </p>
          </div>
          <span class="text-xl">💻</span>
        </div>
        <div class="glass-card p-4 flex items-center justify-between">
          <div>
            <p class="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Blog Posts
            </p>
            <p class="text-2xl font-semibold mt-1">
              {{ blogCount }}
            </p>
          </div>
          <span class="text-xl">✍️</span>
        </div>
        <div class="glass-card p-4 flex items-center justify-between">
          <div>
            <p class="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Testimonials
            </p>
            <p class="text-2xl font-semibold mt-1">
              {{ testimonialCount }}
            </p>
          </div>
          <span class="text-xl">💬</span>
        </div>
      </section>

      <!-- Tabs section -->
      <section class="glass-card p-4 md:p-6">
        <!-- Tabs -->
        <div class="flex flex-wrap gap-3 border-b border-white/10 pb-4 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="relative px-3 py-1.5 text-xs md:text-sm rounded-full transition-all"
            :class="
              activeTab === tab.key
                ? 'bg-accent text-white shadow-soft-glow'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Isi tab -->
        <!-- ================== PROJECTS ================== -->
        <div v-if="activeTab === 'projects'" class="space-y-6">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div>
              <h2 class="text-lg md:text-xl font-semibold">Projects</h2>
              <p class="text-xs text-gray-400 mt-1">
                Tambah, edit, dan hapus project portofolio kamu di sini.
              </p>
            </div>
            <button
              @click="startCreateProject"
              class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent hover:bg-accent-soft text-xs md:text-sm font-medium shadow-soft-glow"
            >
              + Tambah Project
            </button>
          </div>

          <!-- List projects -->
          <div v-if="loadingProjects" class="text-sm text-gray-400">
            Memuat daftar projects...
          </div>

          <div v-else-if="projects.length === 0" class="text-sm text-gray-400">
            Belum ada project. Klik
            <span class="font-medium text-accent-soft">"Tambah Project"</span>
            untuk menambahkan.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="project in projects"
              :key="project.id"
              class="flex flex-col md:flex-row md:items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/10"
            >
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500">
                  {{ formatDate(project.created_at) }}
                </p>
                <h3 class="text-sm md:text-base font-semibold mt-1 truncate">
                  {{ project.title }}
                </h3>
                <p class="text-[11px] text-gray-400">
                  /projects/{{ project.slug }}
                </p>
                <p class="text-xs text-gray-300 mt-1 line-clamp-2">
                  {{ project.short_description }}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <span
                    v-for="tech in project.tech_stack || []"
                    :key="tech"
                    class="text-[10px] px-2 py-[3px] rounded-full bg-white/10 text-gray-200"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <button
                  @click="editProject(project)"
                  class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20"
                >
                  Edit
                </button>
                <button
                  @click="deleteProject(project.id)"
                  class="px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/20"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <!-- Form tambah / edit project -->
          <div
            v-if="showProjectForm"
            class="mt-6 border-t border-white/10 pt-5"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-semibold">
                  {{ editingProject ? "Edit Project" : "Tambah Project" }}
                </h3>
                <p class="text-xs text-gray-400 mt-1">
                  Lengkapi form di bawah, slug akan menjadi URL detail proyek.
                </p>
              </div>
              <button
                @click="cancelProjectForm"
                class="text-xs text-gray-400 hover:text-white"
              >
                Batalkan
              </button>
            </div>

            <form
              @submit.prevent="submitProject"
              class="grid md:grid-cols-2 gap-4 text-sm"
            >
              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400">Title</label>
                <input
                  v-model="form.title"
                  required
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="Contoh: Portfolio Website"
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Slug (URL)</label
                >
                <input
                  v-model="form.slug"
                  required
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="contoh: portfolio-website"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block mb-1 text-xs text-gray-400"
                  >Short Description</label
                >
                <textarea
                  v-model="form.short_description"
                  rows="2"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  placeholder="Ringkasan singkat tentang proyek ini."
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block mb-1 text-xs text-gray-400"
                  >Description</label
                >
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  placeholder="Deskripsi detail proyek, fitur-fitur utama, dan peran kamu di proyek ini."
                ></textarea>
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Thumbnail URL</label
                >
                <input
                  v-model="form.thumbnail_url"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="https://..."
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Tech Stack (pisahkan dengan koma)</label
                >
                <input
                  v-model="form.tech_stack_raw"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="Vue 3, Supabase, Tailwind CSS"
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >GitHub URL</label
                >
                <input
                  v-model="form.github_url"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="https://github.com/..."
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400">Demo URL</label>
                <input
                  v-model="form.demo_url"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="https://..."
                />
              </div>

              <div class="md:col-span-2 flex items-center gap-2 mt-1">
                <input
                  id="featured"
                  v-model="form.is_featured"
                  type="checkbox"
                  class="rounded border-white/20 bg-bg-main"
                />
                <label for="featured" class="text-xs text-gray-300">
                  Tandai sebagai featured project
                </label>
              </div>

              <div class="md:col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl bg-white/10 text-xs font-medium hover:bg-white/20"
                  @click="cancelProjectForm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 rounded-xl bg-accent hover:bg-accent-soft text-xs font-medium shadow-soft-glow"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ================== BLOG ================== -->
        <div v-else-if="activeTab === 'blog'" class="space-y-6">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div>
              <h2 class="text-lg md:text-xl font-semibold">Blog Posts</h2>
              <p class="text-xs text-gray-400 mt-1">
                Tulis artikel seputar coding, produk, atau catatan teknis di
                sini.
              </p>
            </div>
            <button
              @click="startCreateBlog"
              class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent hover:bg-accent-soft text-xs md:text-sm font-medium shadow-soft-glow"
            >
              + Tambah Artikel
            </button>
          </div>

          <!-- List artikelnya -->
          <div v-if="loadingBlogs" class="text-sm text-gray-400">
            Memuat daftar artikel...
          </div>

          <div v-else-if="blogPosts.length === 0" class="text-sm text-gray-400">
            Belum ada artikel. Klik
            <span class="font-medium text-accent-soft">"Tambah Artikel"</span>
            untuk membuat tulisan pertama kamu.
          </div>

          <div v-else class="space-y-3">
            <article
              v-for="post in blogPosts"
              :key="post.id"
              class="flex flex-col md:flex-row md:items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/10"
            >
              <div class="flex-1 min-w-0">
                <p class="text-[11px] text-gray-500">
                  {{ formatDate(post.published_at) }}
                </p>
                <h3 class="text-sm md:text-base font-semibold mt-1 truncate">
                  {{ post.title }}
                </h3>
                <p class="text-[11px] text-gray-400">/blog/{{ post.slug }}</p>
                <p class="text-xs text-gray-300 mt-1 line-clamp-2">
                  {{ post.excerpt }}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <span
                    v-for="tag in post.tags || []"
                    :key="tag"
                    class="text-[10px] px-2 py-[3px] rounded-full bg-white/10 text-gray-200"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <button
                  @click="editBlog(post)"
                  class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20"
                >
                  Edit
                </button>
                <button
                  @click="deleteBlog(post.id)"
                  class="px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/20"
                >
                  Hapus
                </button>
              </div>
            </article>
          </div>

          <!-- Form tambah / edit artikel -->
          <div v-if="showBlogForm" class="mt-6 border-t border-white/10 pt-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-semibold">
                  {{ editingBlog ? "Edit Artikel" : "Tambah Artikel" }}
                </h3>
                <p class="text-xs text-gray-400 mt-1">
                  Slug akan digunakan sebagai URL artikel pada halaman blog.
                </p>
              </div>
              <button
                @click="cancelBlogForm"
                class="text-xs text-gray-400 hover:text-white"
              >
                Batalkan
              </button>
            </div>

            <form
              @submit.prevent="submitBlog"
              class="grid md:grid-cols-2 gap-4 text-sm"
            >
              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400">Judul</label>
                <input
                  v-model="blogForm.title"
                  required
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="Contoh: Belajar Vue 3 Composition API"
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Slug (URL)</label
                >
                <input
                  v-model="blogForm.slug"
                  required
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="contoh: belajar-vue3-composition-api"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block mb-1 text-xs text-gray-400"
                  >Excerpt (ringkasan singkat)</label
                >
                <textarea
                  v-model="blogForm.excerpt"
                  rows="2"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  placeholder="Ringkasan pendek isi artikel."
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block mb-1 text-xs text-gray-400">Konten</label>
                <textarea
                  v-model="blogForm.content"
                  rows="6"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent resize-y"
                  placeholder="Isi lengkap artikel. Bisa dalam bentuk paragraf biasa atau markdown."
                ></textarea>
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Thumbnail URL (opsional)</label
                >
                <input
                  v-model="blogForm.thumbnail_url"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="https://..."
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Tags (pisahkan dengan koma)</label
                >
                <input
                  v-model="blogForm.tags_raw"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="vue, supabase, tailwind"
                />
              </div>

              <div class="md:col-span-1">
                <label class="block mb-1 text-xs text-gray-400"
                  >Tanggal publish (opsional)</label
                >
                <input
                  v-model="blogForm.published_at"
                  type="date"
                  class="w-full bg-bg-main border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
                />
              </div>

              <div class="md:col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl bg-white/10 text-xs font-medium hover:bg-white/20"
                  @click="cancelBlogForm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 rounded-xl bg-accent hover:bg-accent-soft text-xs font-medium shadow-soft-glow"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ================== TESTIMONIALS ================== -->
        <div v-else-if="activeTab === 'testimonials'" class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg md:text-xl font-semibold">Testimonials</h2>
              <p class="text-sm text-gray-400">
                Kelola testimoni klien yang akan ditampilkan di halaman utama.
              </p>
            </div>

            <button
              type="button"
              @click="resetTestimonialForm"
              class="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium"
            >
              Testimonial baru
            </button>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- FORM -->
            <div class="glass-card p-5 space-y-4">
              <h3 class="text-sm font-semibold">
                {{
                  editingTestimonialId
                    ? "Edit testimonial"
                    : "Tambah testimonial"
                }}
              </h3>

              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Nama</label>
                  <input
                    v-model="testimonialForm.name"
                    type="text"
                    class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-400 mb-1">Role</label>
                    <input
                      v-model="testimonialForm.role"
                      type="text"
                      class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder="CTO, Product Manager, dsb."
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-400 mb-1"
                      >Perusahaan</label
                    >
                    <input
                      v-model="testimonialForm.company"
                      type="text"
                      class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Avatar URL</label
                  >
                  <input
                    v-model="testimonialForm.avatar_url"
                    type="text"
                    class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                  <p class="text-[11px] text-gray-500 mt-1">
                    Bisa gunakan URL gambar dari Supabase Storage atau CDN lain.
                  </p>
                </div>

                <div>
                  <label class="block text-xs text-gray-400 mb-1">Pesan</label>
                  <textarea
                    v-model="testimonialForm.message"
                    rows="4"
                    class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent resize-y"
                  ></textarea>
                </div>

                <p v-if="testimonialsError" class="text-xs text-red-400">
                  {{ testimonialsError }}
                </p>

                <button
                  type="button"
                  @click="saveTestimonial"
                  class="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-soft text-xs font-medium shadow-soft-glow transition-all"
                >
                  {{
                    editingTestimonialId
                      ? "Simpan perubahan"
                      : "Tambah testimonial"
                  }}
                </button>
              </div>
            </div>

            <!-- LIST -->
            <div class="glass-card p-5 space-y-3 max-h-[480px] overflow-y-auto">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">Daftar testimonials</h3>
                <span class="text-[11px] text-gray-500">
                  {{ testimonials.length }} item
                </span>
              </div>

              <div v-if="testimonialsLoading" class="text-sm text-gray-400">
                Memuat testimonials...
              </div>

              <div
                v-else-if="testimonials.length === 0"
                class="text-sm text-gray-500"
              >
                Belum ada testimonial.
              </div>

              <ul v-else class="space-y-3">
                <li
                  v-for="t in testimonials"
                  :key="t.id"
                  class="flex items-start gap-3 border border-white/10 rounded-xl px-3 py-3 text-sm bg-white/5"
                >
                  <img
                    v-if="t.avatar_url"
                    :src="t.avatar_url"
                    :alt="t.name"
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                      <div>
                        <p class="font-medium text-sm">{{ t.name }}</p>
                        <p class="text-[11px] text-gray-400">
                          {{ t.role }}
                          <span v-if="t.company">· {{ t.company }}</span>
                        </p>
                      </div>
                      <div
                        class="flex items-center gap-2 text-[11px] text-gray-400"
                      >
                        <button
                          class="hover:text-accent-soft"
                          @click="startEditTestimonial(t)"
                        >
                          Edit
                        </button>
                        <button
                          class="hover:text-red-400"
                          @click="deleteTestimonial(t.id)"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                    <p class="mt-1 text-xs text-gray-300 line-clamp-3">
                      “{{ t.message }}”
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Halaman AdminDashboard dengan desain modern dan CRUD Projects terintegrasi Supabase
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/store/useUserStore";
import { ProjectService } from "@/services/projectService";
import { BlogService } from "@/services/blogService";
import { TestimonialService } from "@/services/testimonialService"


const userStore = useUserStore();

// Tab yang tersedia di dashboard
const tabs = [
  { key: "projects", label: "Projects" },
  { key: "blog", label: "Blog Posts" },
  { key: "testimonials", label: "Testimonials" },
];

const activeTab = ref("projects");

// STATE untuk ringkasan (dummy untuk blog & testimonials, bisa connect Supabase nanti)
const blogCount = ref(0);
const testimonialCount = ref(0);

// STATE BLOG
const blogPosts = ref([]);
const loadingBlogs = ref(false);
const showBlogForm = ref(false);
const editingBlog = ref(null);

// Form blog
const blogForm = reactive({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  thumbnail_url: "",
  tags_raw: "",
  published_at: "",
});

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// STATE PROJECT
const projects = ref([]);
const loadingProjects = ref(false);
const showProjectForm = ref(false);
const editingProject = ref(null);

const form = reactive({
  title: "",
  slug: "",
  short_description: "",
  description: "",
  thumbnail_url: "",
  tech_stack_raw: "",
  github_url: "",
  demo_url: "",
  is_featured: false,
});

// Ambil data projects dari Supabase
const loadProjects = async () => {
  loadingProjects.value = true;
  try {
    projects.value = await ProjectService.getProjects();
  } catch (err) {
    console.error("Gagal memuat projects:", err);
  } finally {
    loadingProjects.value = false;
  }
};

// Reset form ke kondisi awal
const resetForm = () => {
  Object.assign(form, {
    title: "",
    slug: "",
    short_description: "",
    description: "",
    thumbnail_url: "",
    tech_stack_raw: "",
    github_url: "",
    demo_url: "",
    is_featured: false,
  });
};

// Mulai tambah project baru
const startCreateProject = () => {
  editingProject.value = null;
  resetForm();
  showProjectForm.value = true;
};

// Edit project yang sudah ada
const editProject = (project) => {
  editingProject.value = project;
  Object.assign(form, {
    title: project.title,
    slug: project.slug,
    short_description: project.short_description || "",
    description: project.description || "",
    thumbnail_url: project.thumbnail_url || "",
    tech_stack_raw: (project.tech_stack || []).join(", "),
    github_url: project.github_url || "",
    demo_url: project.demo_url || "",
    is_featured: !!project.is_featured,
  });
  showProjectForm.value = true;
};

// Batal dari form project
const cancelProjectForm = () => {
  showProjectForm.value = false;
  resetForm();
};

// Submit form project (create / update)
const submitProject = async () => {
  const payload = {
    title: form.title,
    slug: form.slug,
    short_description: form.short_description,
    description: form.description,
    thumbnail_url: form.thumbnail_url,
    tech_stack: form.tech_stack_raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    github_url: form.github_url,
    demo_url: form.demo_url,
    is_featured: form.is_featured,
  };

  try {
    if (editingProject.value) {
      await ProjectService.updateProject(editingProject.value.id, payload);
    } else {
      await ProjectService.createProject(payload);
    }
    await loadProjects();
    showProjectForm.value = false;
    resetForm();
  } catch (err) {
    console.error("Gagal menyimpan project:", err);
  }
};

// Hapus project
const deleteProject = async (id) => {
  const ok = window.confirm("Yakin ingin menghapus project ini?");
  if (!ok) return;

  try {
    await ProjectService.deleteProject(id);
    await loadProjects();
  } catch (err) {
    console.error("Gagal menghapus project:", err);
  }
};

// Logout admin
const handleLogout = async () => {
  await userStore.logout();
  window.location.href = "/";
};

// ====== BLOG FUNCTIONS ======

// load daftar artikel
const loadBlogPosts = async () => {
  loadingBlogs.value = true;
  try {
    blogPosts.value = await BlogService.getPosts();
    blogCount.value = blogPosts.value.length;
  } catch (err) {
    console.error("Gagal memuat blog posts:", err);
  } finally {
    loadingBlogs.value = false;
  }
};

// reset form blog
const resetBlogForm = () => {
  Object.assign(blogForm, {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    thumbnail_url: "",
    tags_raw: "",
    published_at: "",
  });
};

// mulai tambah artikel baru
const startCreateBlog = () => {
  editingBlog.value = null;
  resetBlogForm();
  showBlogForm.value = true;
};

// edit artikel
const editBlog = (post) => {
  editingBlog.value = post;
  Object.assign(blogForm, {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    thumbnail_url: post.thumbnail_url || "",
    tags_raw: (post.tags || []).join(", "),
    // published_at biarkan string ISO kalau ada
    published_at: post.published_at ? post.published_at.slice(0, 10) : "",
  });
  showBlogForm.value = true;
};

// batal form blog
const cancelBlogForm = () => {
  showBlogForm.value = false;
  resetBlogForm();
};

// submit form blog (create / update)
const submitBlog = async () => {
  const payload = {
    title: blogForm.title,
    slug: blogForm.slug,
    excerpt: blogForm.excerpt,
    content: blogForm.content,
    thumbnail_url: blogForm.thumbnail_url,
    tags: blogForm.tags_raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    // jika kosong, biarkan Supabase isi default now()
    published_at: blogForm.published_at || null,
  };

  try {
    if (editingBlog.value) {
      await BlogService.updatePost(editingBlog.value.id, payload);
    } else {
      await BlogService.createPost(payload);
    }
    await loadBlogPosts();
    showBlogForm.value = false;
    resetBlogForm();
  } catch (err) {
    console.error("Gagal menyimpan blog post:", err);
  }
};

// hapus artikel
const deleteBlog = async (id) => {
  const ok = window.confirm("Yakin ingin menghapus artikel ini?");
  if (!ok) return;

  try {
    await BlogService.deletePost(id);
    await loadBlogPosts();
  } catch (err) {
    console.error("Gagal menghapus blog post:", err);
  }
};

// ===== STATE TESTIMONIALS =====
const testimonials = ref([])
const testimonialsLoading = ref(false)
const testimonialsError = ref("")
const editingTestimonialId = ref(null)

const testimonialForm = ref({
  name: "",
  role: "",
  company: "",
  message: "",
  avatar_url: "",
})

const resetTestimonialForm = () => {
  testimonialForm.value = {
    name: "",
    role: "",
    company: "",
    message: "",
    avatar_url: "",
  }
  editingTestimonialId.value = null
}

const loadTestimonials = async () => {
  testimonialsLoading.value = true
  testimonialsError.value = ""

  try {
    testimonials.value = await TestimonialService.getTestimonials()
  } catch (err) {
    console.error("Gagal memuat testimonials:", err)
    testimonialsError.value = err.message ?? "Gagal memuat testimonials"
  } finally {
    testimonialsLoading.value = false
  }
}

const saveTestimonial = async () => {
  testimonialsError.value = ""

  // validasi sangat sederhana
  if (!testimonialForm.value.name.trim() || !testimonialForm.value.message.trim()) {
    testimonialsError.value = "Nama dan pesan wajib diisi."
    return
  }

  try {
    if (editingTestimonialId.value) {
      // UPDATE
      await TestimonialService.updateTestimonial(
        editingTestimonialId.value,
        testimonialForm.value,
      )
    } else {
      // CREATE
      await TestimonialService.createTestimonial(testimonialForm.value)
    }

    resetTestimonialForm()
    await loadTestimonials()
  } catch (err) {
    console.error("Gagal menyimpan testimonial:", err)
    testimonialsError.value = err.message ?? "Gagal menyimpan testimonial"
  }
}

const startEditTestimonial = (item) => {
  editingTestimonialId.value = item.id
  testimonialForm.value = {
    name: item.name ?? "",
    role: item.role ?? "",
    company: item.company ?? "",
    message: item.message ?? "",
    avatar_url: item.avatar_url ?? "",
  }
}

const deleteTestimonial = async (id) => {
  const ok = window.confirm("Yakin ingin menghapus testimonial ini?")
  if (!ok) return

  try {
    await TestimonialService.deleteTestimonial(id)
    await loadTestimonials()
  } catch (err) {
    console.error("Gagal menghapus testimonial:", err)
    alert("Gagal menghapus testimonial. Cek console untuk detail.")
  }
}



// Saat component mount, ambil data awal
onMounted(() => {
  loadProjects();
  loadBlogPosts();
  loadTestimonials();
});
</script>

<style scoped>
/* Style kecil tambahan untuk glass-card, memanfaatkan warna dari Tailwind */
.glass-card {
  background-color: rgba(15, 23, 42, 0.7); /* kira-kira mirip bg-slate-900/70 */
  border-radius: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  backdrop-filter: blur(24px);
}
</style>
