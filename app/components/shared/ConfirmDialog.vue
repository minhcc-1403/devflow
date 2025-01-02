<script setup lang="ts">
const { promise, handleCancel, handleConfirm, title, description, isLoading } =
  useConfirm();
</script>

<template>
  <AlertDialog :open="!!promise || isLoading">
    <AlertDialogContent class="z-[99]">
      <AlertDialogHeader>
        <AlertDialogTitle class="!text-dark400_light800">{{
          title
        }}</AlertDialogTitle>
        <AlertDialogDescription class="!text-dark400_light700"
          >{{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel
          class="dark:bg-gray-100 hover:dark:text-gray-800"
          @click="handleCancel"
          >Cancel</AlertDialogCancel
        >
        <AlertDialogAction
          :disabled="isLoading"
          class="primary-gradient"
          @click="handleConfirm"
        >
          <Icon
            v-if="isLoading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />

          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
