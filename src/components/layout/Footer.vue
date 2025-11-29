<template>
  <footer class="border-t border-white/5 mt-12">
    <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-xs text-gray-400">
        © {{ new Date().getFullYear() }} Nama Kamu. All rights reserved.
      </p>
      <div class="flex items-center gap-4 text-sm text-gray-400">
        <a href="https://github.com/username" target="_blank" class="hover:text-white">GitHub</a>
        <a href="https://linkedin.com/in/username" target="_blank" class="hover:text-white">LinkedIn</a>
        <a href="https://instagram.com/username" target="_blank" class="hover:text-white">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
/* simple footer */
</script>
