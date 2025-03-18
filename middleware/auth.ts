export default defineNuxtRouteMiddleware((to, from) => {
  // 如果用戶訪問首頁，重定向到登入頁面
  if (to.path === '/') {
    return navigateTo('/auth/login');
  }
});
