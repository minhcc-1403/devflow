<script setup lang="ts">
const firebaseAuth = useFirebase();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isMobile = useMediaQuery("(max-width: 1024px)");

const query = useRoute().query;
const router = useRouter();
defineProps<{ disabled?: boolean }>();

const loginWithGoogle = async (e: MouseEvent) => {
  const idToken = await firebaseAuth.loginWithGoogle(e);

  await authStore.loginWithGoogle(idToken);

  // Redirect to the previous page
  if (user.value) {
    const from = query.from as string | undefined;
    if (!from) return router.push({ path: "/" });

    const [path = "", queryString = {}] = from.split("?");
    router.push({
      path,
      query: Object.fromEntries(new URLSearchParams(queryString)),
    });
  }
};
</script>

<template>
  <div class="flex gap-x-4">
    <Button
      variant="outline"
      class="hover:primary-text-gradient flex w-full items-center py-5 text-center text-sm text-gray-600 dark:text-gray-400"
      :disabled="disabled"
      @click="loginWithGoogle"
    >
      <Icon name="flat-color-icons:google" class="mr-2" />

      {{ isMobile ? "Google" : "Sign in with Google" }}
    </Button>

    <Button
      variant="outline"
      class="hover:primary-text-gradient flex w-full items-center py-5 text-center text-sm text-gray-600 dark:text-gray-400"
      disabled
    >
      <Icon name="logos:apple" class="mr-2" />

      {{ isMobile ? "Apple" : "Sign in with Apple" }}
    </Button>
  </div>
</template>
