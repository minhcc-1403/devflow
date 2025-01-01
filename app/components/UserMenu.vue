<script setup lang="ts">
const authStore = useAuthStore();
const { user, loading } = storeToRefs(authStore);

const onLogout = async () => {
  authStore.logout();
};
</script>

<template>
  <div class="relative">
    <template v-if="!user">
      <Button
        variant="secondary"
        class="text-dark400_light700 flex cursor-pointer items-center justify-center gap-x-1 border-none bg-white/10 font-light outline-none transition focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
        @click="useGoTo().goToSignIn()"
      >
        <span>Sign In</span>
        <span>
          <Icon name="iconoir:user" class="size-5" />
        </span>
      </Button>
    </template>

    <template v-else>
      <DropdownMenu>
        <DropdownMenuTrigger>
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
                v-if="user?.avatar"
                :src="user.avatar"
                alt="User avatar"
              />
              <AvatarFallback>{{
                user.fullName
                  ?.split(",")
                  ?.map((name) => name[0])
                  ?.join("")
                  .toUpperCase()
              }}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="mt-3 w-56">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
  </div>
</template>
