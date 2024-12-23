<script setup lang="ts">
import type { PaginationInfo } from "~/types/paginate-response.type";

defineProps<{
  data: PaginationInfo;
}>();

const route = useRoute();
const router = useRouter();

const onPageChange = (page?: number) => {
  router.push({ query: { ...route.query, _page: page } });
};
</script>

<template>
  <div class="mt-4 flex w-full justify-center">
    <Pagination
      v-slot="{ page }"
      :total="data._totalData"
      :sibling-count="1"
      show-edges
      :items-per-page="data._limit"
      :page="data._page"
      @update:page="onPageChange"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-2">
        <PaginationPrev
          class="light-border-2 text-dark200_light800 body-medium text-xs max-sm:size-8"
        />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="body-medium text-dark200_light800 rounded-md text-xs transition-all max-sm:size-8"
              :class="[
                {
                  'bg-main-500 !text-light-900 hover:bg-main-500':
                    item.value === page,
                },
              ]"
              variant="outline"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext
          class="light-border-2 text-dark200_light800 body-medium text-xs max-sm:size-8"
        />
      </PaginationList>
    </Pagination>
  </div>
</template>
