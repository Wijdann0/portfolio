<template>
  <div class="relative min-h-screen overflow-hidden">

    <!-- 🌈 GLOBAL BACKGROUND: neon waves + glow -->
    <div
      class="fixed inset-0 -z-10 bg-gradient-to-b from-[#050816] via-[#050824] to-[#1b0830] overflow-hidden"
    >
      <!-- Glow besar -->
      <div
        class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[140%] h-[140%]
               bg-[radial-gradient(circle_at_20%_0%,#4f46e5_0,#050816_55%),radial-gradient(circle_at_80%_10%,#22d3ee_0,#050816_55%)]
               opacity-35 blur-3xl bg-pulse"
      ></div>

      <!-- Neon Waves -->
      <svg
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-auto opacity-90 pointer-events-none select-none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#22d3ee" />
            <stop offset="50%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>

          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#c4b5fd" />
            <stop offset="100%" stop-color="#f97316" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Wave 1 -->
        <path
          class="wave wave-fast"
          d="M -50 260 Q 150 180 320 210 T 650 220 T 1000 190 T 1300 210"
          fill="none"
          stroke="url(#wave1)"
          stroke-width="6"
          stroke-linecap="round"
          filter="url(#glow)"
          stroke-dasharray="14 10"
        />

        <!-- Wave 2 -->
        <path
          class="wave wave-reverse"
          d="M -80 290 Q 140 220 350 245 T 700 255 T 1050 235 T 1350 255"
          fill="none"
          stroke="url(#wave2)"
          stroke-width="5"
          stroke-linecap="round"
          opacity="0.85"
          stroke-dasharray="18 12"
          filter="url(#glow)"
        />

        <!-- Wave 3 -->
        <path
          class="wave wave-slow"
          d="M -100 320 Q 120 260 360 285 T 720 295 T 1080 280 T 1380 295"
          fill="none"
          stroke="url(#wave1)"
          stroke-width="3"
          opacity="0.7"
          stroke-dasharray="22 14"
          filter="url(#glow)"
        />
      </svg>
    </div>

    <!-- ✨ Main content (halaman kamu) -->
    <main class="relative z-10">
      <slot />
    </main>

  </div>
</template>

<style scoped>
/* === Animasi Waves === */
.wave {
  transform-box: fill-box;
  transform-origin: center;
  animation: waveFlow linear infinite;
}

.wave-fast {
  animation-duration: 12s;
}

.wave-reverse {
  animation-duration: 18s;
  animation-direction: reverse;
}

.wave-slow {
  animation-duration: 22s;
}

@keyframes waveFlow {
  0% {
    stroke-dashoffset: 0;
    transform: translateY(0px);
  }
  50% {
    stroke-dashoffset: -260;
    transform: translateY(-4px);
  }
  100% {
    stroke-dashoffset: -520;
    transform: translateY(0px);
  }
}

/* Glow background bergerak pelan */
.bg-pulse {
  animation: bgPulse 18s ease-in-out infinite alternate;
}

@keyframes bgPulse {
  0% {
    opacity: 0.25;
    transform: translate(-50%, 0) scale(1);
  }
  100% {
    opacity: 0.45;
    transform: translate(-50%, -15px) scale(1.08);
  }
}
</style>
