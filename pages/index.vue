<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        載入中...
      </h1>
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
      ></div>
    </div>
  </div>
</template>
