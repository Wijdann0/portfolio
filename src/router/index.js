import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import AdminLogin from "@/pages/AdminLogin.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import { useUserStore } from "@/store/useUserStore";
import Blog from "@/pages/Blog.vue";
import BlogDetail from "@/pages/BlogDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/admin/login", name: "admin-login", component: AdminLogin },
    {
      path: "/admin",
      name: "admin-dashboard",
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },
    { path: "/blog", name: "blog", component: Blog },
    { path: "/blog/:slug", name: "blog-detail", component: BlogDetail },
    // ...route lain
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.initialized) {
    await userStore.fetchUser();
  }

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: "admin-login" });
  } else {
    next();
  }
});

export default router;
