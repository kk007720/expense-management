<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        支出報銷
      </h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        提交新的支出報銷申請
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 報銷表單 -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                支出標題
              </label>
              <input
                type="text"
                id="title"
                v-model="form.title"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                placeholder="請輸入支出標題"
              />
            </div>

            <div>
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                金額
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  v-model="form.amount"
                  class="block w-full pl-7 pr-12 rounded-md border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                for="category"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                支出類別
              </label>
              <select
                id="category"
                v-model="form.category"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
              >
                <option value="">請選擇類別</option>
                <option value="office">辦公用品</option>
                <option value="food">餐飲</option>
                <option value="saas">SaaS 訂閱</option>
                <option value="travel">差旅</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label
                for="date"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                支出日期
              </label>
              <input
                type="date"
                id="date"
                v-model="form.date"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                說明
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                placeholder="請輸入詳細說明"
              ></textarea>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                上傳收據
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>上傳檔案</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        @change="handleFileUpload"
                      />
                    </label>
                    <p class="pl-1">或拖放檔案</p>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                取消
              </button>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                提交
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 說明卡片 -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            報銷說明
          </h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  收據要求
                </h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  請上傳清晰的收據照片或掃描檔，確保金額和日期清晰可見
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  審核時間
                </h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  一般審核時間為 1-3 個工作天
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  注意事項
                </h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  單筆報銷金額超過 10,000 元需要主管審核
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const form = ref({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: '',
    receipt: null as File | null,
  });

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      form.value.receipt = target.files[0];
    }
  };

  const handleSubmit = async () => {
    try {
      // TODO: 實作表單提交邏輯
      console.log('Form submitted:', form.value);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };
</script>
