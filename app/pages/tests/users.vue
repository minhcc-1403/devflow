<script setup lang="ts">
import { useCategoryPagination } from "~/features/categories/api/use-category-paginate";

const {
  categories,
  isLoading,
  loadMore,
  paginationInfo,
  setLimit,
  setPage,
  dataLoaded,
} = useCategoryPagination();

const onPageChange = (page?: number) => setPage(page || 1);
const limit = computed({
  get: () => `${paginationInfo.value?._limit || 1}`,
  set: (val: string) => setLimit(+val),
});
</script>

<template>
  <div>
    <Button @click="navigateTo('/tests/transactions')">Transactions</Button>
    <Button @click="navigateTo('/tests/accounts')">Accounts</Button>
    <Button @click="navigateTo('/tests/')">Categories</Button>
    <Button @click="navigateTo('/tests/users')">Users</Button>

    <hr />
    <div v-if="isLoading">Loading...</div>
    <hr />
    <div>
      <h1>Pagination</h1>
      <ul class="my-4">
        <li v-for="category in categories" :key="category._id">
          {{ category._id }} - {{ category.name }}
        </li>
      </ul>
    </div>

    <hr />
    <div>PageInfo: {{ paginationInfo }}</div>

    <hr />

    <hr />
    <div v-if="paginationInfo">
      <Pagination
        v-slot="{ page }"
        :total="paginationInfo._totalData"
        :sibling-count="1"
        show-edges
        :default-page="paginationInfo._page"
        :items-per-page="paginationInfo._limit"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                :disabled="item.value === page"
                @click="onPageChange(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext @update:page="onPageChange" />
          <PaginationLast @update:page="onPageChange" />
        </PaginationList>
      </Pagination>

      <Select v-model="limit">
        <SelectTrigger>
          <SelectValue placeholder="Select an page" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="option in new Array(10).fill(0).map((_, i) => i + 1)"
              :key="option"
              :value="`${option}`"
            >
              {{ option }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="h-10"></div>
    <hr />
    <h1>Loaded</h1>
    <ul class="my-4">
      <li v-for="category in dataLoaded" :key="category._id">
        {{ category._id }} - {{ category.name }}
      </li>
    </ul>
    <Button
      v-if="paginationInfo?._hasNextPage"
      @click="loadMore"
      :disabled="isLoading"
      >Load more</Button
    >
  </div>
</template>

<style lang="scss" scoped></style>
