export default defineNuxtRouteMiddleware((to) => {
  const { tokens } = useAuthStore();

  if (!tokens) {
    return useGoTo().goToSignIn({
      from: to.fullPath,
    });
  }
});
