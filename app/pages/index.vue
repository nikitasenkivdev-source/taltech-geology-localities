<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLocalities } from '~/composables/useLocalities'

const search = ref('')
const limit = 12
const offset = ref(0)

const { fetchLocalities } = useLocalities()

const { data, error, pending, refresh } = await useAsyncData(
    'localities',
    () => fetchLocalities(search.value, limit, offset.value),
    { watch: [offset] }
)

// Reset to first page when search changes
watch(search, () => {
  offset.value = 0
  refresh()
})

const localities = computed(() => data.value?.results ?? [])
const totalCount = computed(() => data.value?.count ?? 0)

const currentPage = computed(() =>
    Math.floor(offset.value / limit) + 1
)

const totalPages = computed(() =>
    Math.ceil(totalCount.value / limit)
)

const errorMessage = computed(() => {
  if (!error.value) return null
  return error.value.message || 'Failed to load data'
})

const handleRetry = () => {
  refresh()
}

const nextPage = () => {
  if (offset.value + limit < totalCount.value) {
    offset.value += limit
  }
}

const previousPage = () => {
  if (offset.value >= limit) {
    offset.value -= limit
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-6 text-center">
      Geological Localities
    </h1>

    <input
        v-model="search"
        type="text"
        placeholder="Search by name..."
        class="w-full mb-6 p-3 border rounded-lg"
    />

    <div v-if="pending" class="text-center">
      Loading...
    </div>

    <div
        v-else-if="errorMessage"
        class="text-center mt-6"
    >
      <p class="text-red-500 mb-4">
        {{ errorMessage }}
      </p>

      <button
          @click="handleRetry"
          class="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Retry
      </button>
    </div>

    <div
        v-else-if="localities.length"
        class="grid md:grid-cols-3 gap-6"
    >
      <div
          v-for="item in localities"
          :key="item.id"
          class="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
      >
        <h2 class="font-semibold text-lg">
          {{ item.name || item.name_en }}
        </h2>

        <p class="text-sm text-gray-500">
          ID: {{ item.id }}
        </p>

        <p class="text-sm">
          Country:
          {{ item.country?.name_en || item.country?.name || 'N/A' }}
        </p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      No results found
    </div>

    <div
        v-if="totalPages > 1 && !errorMessage"
        class="flex items-center justify-center gap-4 mt-10"
    >
      <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded disabled:opacity-40"
      >
        Previous
      </button>

      <span>
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
</template>