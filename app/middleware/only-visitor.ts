export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { tokens } = storeToRefs(authStore);

  if (tokens.value?.user) return "/";
});
