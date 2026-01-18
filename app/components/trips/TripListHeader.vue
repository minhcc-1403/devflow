<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Armchair, Clock, Zap } from "lucide-vue-next";

defineProps<{
  route: string;
  total: number;
}>();
</script>

<template>
  <div class="sticky top-0 z-30 space-y-3 border-b bg-background">
    <!-- Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">
        {{ route }}
        <span class="text-muted-foreground"> ({{ total }}) </span>
      </h2>
    </div>

    <!-- Filter chips -->
    <div class="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="outline"
        class="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50"
      >
        <Zap class="mr-1 h-4 w-4" />
        Giá rẻ bất ngờ
      </Button>

      <Button size="sm" variant="outline" class="rounded-full">
        <Clock class="mr-1 h-4 w-4" />
        Giờ khởi hành
      </Button>

      <Button size="sm" variant="outline" class="rounded-full">
        <Armchair class="mr-1 h-4 w-4" />
        Ghế trống
      </Button>
    </div>
  </div>
</template>
