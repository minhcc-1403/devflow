<script setup lang="ts">
const authStore = useAuthStore();
const { user, loading } = storeToRefs(authStore);

const onLogout = async () => {
  authStore.logout();
};
</script>

<template>
  <div class="relative">
    <Button
      v-if="!user"
      variant="secondary"
      class="flex cursor-pointer items-center justify-center gap-x-1 border-none bg-white/10 font-light text-white outline-none transition hover:bg-white/20 focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
      @click="useGoTo().goToSignIn()"
    >
      <span>Sign In</span>
      <span>
        <Icon name="iconoir:user" class="size-5" />
      </span>
    </Button>

    <DropdownMenu v-else>
      <DropdownMenuTrigger as-child>
        <Icon
          v-if="loading"
          name="lucide:loader-circle"
          class="size-7 animate-spin text-white"
          color="white"
        />

        <Button
          v-else
          variant="secondary"
          class="flex size-8 cursor-pointer items-center justify-center rounded-full"
        >
          <Avatar class="size-10">
            <AvatarImage
              v-if="user.avatar"
              :src="user.avatar"
              alt="User avatar"
            />
            <AvatarFallback>{{
              user.fullName
                .split(",")
                .map((name) => name[0])
                .join("")
                .toUpperCase()
            }}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56" align="end">
        <template v-if="user">
          <DropdownMenuItem @click="navigateTo(`/profile/${user._id}`)">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo(`/profile/edit/${user._id}`)">
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onLogout">
            <Icon name="lucide:log-out" class="mr-2" size="16" />
            Logout
          </DropdownMenuItem>
        </template>

        <template v-else>
          <DropdownMenuItem @click="navigateTo('/auth/sign-up')">
            Register
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/auth/sign-in')">
            Login
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
