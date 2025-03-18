export default defineNuxtRouteMiddleware(async (to) => {
  const { auth } = useSupabase();
  const { user } = await auth.getUser();

  // 如果用戶未登入且不在登入相關頁面，重定向到登入頁面
  if (!user && !to.path.startsWith('/auth/')) {
    return navigateTo('/auth/login');
  }

  // 如果用戶已登入且在登入相關頁面，重定向到儀表板
  if (user && to.path.startsWith('/auth/')) {
    return navigateTo('/dashboard');
  }
});
