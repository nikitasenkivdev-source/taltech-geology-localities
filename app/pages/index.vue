<script setup lang="ts">
import { useLocalities } from '~/composables/useLocalities'

const { fetchLocalities } = useLocalities()

const { data, error } = await fetchLocalities()
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">
        Geological Localities
      </h1>

      <div v-if="error" class="text-red-500">
        Failed to load data.
      </div>

      <div v-else-if="!data">
        Loading...
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="locality in data.results"
            :key="locality.id"
            class="bg-white p-4 rounded-lg shadow"
        >
          <h2 class="font-semibold">
            {{ locality.name_en || locality.name }}
          </h2>
          <p class="text-sm text-gray-500">
            ID: {{ locality.id }}
          </p>
          <p class="text-sm text-gray-600">
            Country: {{ locality.country?.name_en || locality.country?.name || 'N/A' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>