<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- 側邊欄 -->
    <aside
      class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg"
    >
      <div class="flex items-center justify-center h-16 border-b">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">
          預算管理系統
        </h1>
      </div>
      <nav class="mt-5">
        <NuxtLink
          to="/dashboard"
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span class="mx-4">儀表板</span>
        </NuxtLink>
        <NuxtLink
          to="/budget"
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span class="mx-4">預算管理</span>
        </NuxtLink>
        <NuxtLink
          to="/expense"
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span class="mx-4">支出報銷</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- 主要內容區 -->
    <div class="ml-64">
      <!-- 頂部導航 -->
      <header class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="flex items-center justify-between h-16 px-4">
          <div class="flex items-center">
            <input
              type="text"
              placeholder="搜尋..."
              class="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div class="flex items-center space-x-4">
            <button
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span class="sr-only">切換主題</span>
              <!-- 這裡可以放置主題切換圖標 -->
            </button>
            <div class="relative">
              <button class="flex items-center space-x-2">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=User"
                  alt="用戶頭像"
                />
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >用戶名稱</span
                >
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 頁面內容 -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 這裡可以添加需要的組件邏輯
</script>
