<script setup lang="ts">
const firebaseAuth = useFirebaseAuth();
const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

const isMobile = useMediaQuery("(max-width: 1024px)");

const loginWithGoogle = async (e: MouseEvent) => {
  const idToken = await firebaseAuth.loginWithGoogle(e);

  await authStore.loginWithGoogle(idToken);

  const query = useRoute().query;
  if (authUser.value) useGoTo().goToQueryFrom(query?.from as string);
};
</script>

<template>
  <div class="flex gap-x-5 gap-y-3">
    <Button
      variant="outline"
      class="flex w-full items-center py-5 text-center text-sm text-gray-600 hover:text-primary dark:text-gray-300"
      @click="loginWithGoogle"
    >
      <Icon name="flat-color-icons:google" class="mr-2" />

      {{ isMobile ? "Google" : "Sign in with Google" }}
    </Button>

    <Button
      variant="outline"
      class="flex w-full items-center py-5 text-center text-sm text-gray-600 hover:text-primary dark:text-gray-300"
      disabled
    >
      <Icon name="logos:apple" class="mr-2" />

      {{ isMobile ? "Apple" : "Sign in with Apple" }}
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
