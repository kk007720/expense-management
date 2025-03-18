<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        預算管理
      </h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        設定和追蹤部門預算
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 預算設定表單 -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              預算設定
            </h2>

            <!-- 錯誤訊息 -->
            <div
              v-if="error"
              class="mb-4 bg-red-50 dark:bg-red-900 p-4 rounded-md"
            >
              <p class="text-sm text-red-700 dark:text-red-200">{{ error }}</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="department"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    部門
                  </label>
                  <select
                    id="department"
                    v-model="form.department"
                    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                  >
                    <option value="">選擇部門</option>
                    <option value="rd">研發部</option>
                    <option value="marketing">行銷部</option>
                    <option value="sales">業務部</option>
                    <option value="hr">人資部</option>
                  </select>
                </div>

                <div>
                  <label
                    for="year"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    年度
                  </label>
                  <select
                    id="year"
                    v-model="form.year"
                    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="total-budget"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    總預算
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="total-budget"
                      v-model="form.totalBudget"
                      class="block w-full pl-7 pr-12 rounded-md border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="period"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    預算週期
                  </label>
                  <select
                    id="period"
                    v-model="form.period"
                    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-900 dark:text-white"
                  >
                    <option value="monthly">每月</option>
                    <option value="quarterly">每季</option>
                    <option value="yearly">每年</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  預算分配
                </label>
                <div class="mt-4 space-y-4">
                  <div
                    v-for="(category, index) in categories"
                    :key="index"
                    class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                  >
                    <div class="col-span-1">
                      <span class="text-sm text-gray-700 dark:text-gray-300">{{
                        category.name
                      }}</span>
                    </div>
                    <div class="col-span-2">
                      <div class="flex items-center space-x-2">
                        <input
                          type="range"
                          v-model="category.percentage"
                          min="0"
                          max="100"
                          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span
                          class="text-sm text-gray-700 dark:text-gray-300 w-12"
                          >{{ category.percentage }}%</span
                        >
                      </div>
                    </div>
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
                  :disabled="loading"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  <span v-if="loading">處理中...</span>
                  <span v-else>儲存</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- 預算使用狀況 -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            預算使用狀況
          </h3>
          <div class="space-y-4">
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="space-y-2"
            >
              <div class="flex justify-between items-center">
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >{{ category.name }}</span
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  ${{ formatNumber(category.used) }} / ${{
                    formatNumber(category.total)
                  }}
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full"
                  :style="{
                    width: `${(category.used / category.total) * 100}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >總計</span
              >
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                ${{ formatNumber(totalUsed) }} / ${{
                  formatNumber(totalBudget)
                }}
              </span>
            </div>
            <div
              class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
            >
              <div
                class="bg-primary h-2 rounded-full"
                :style="{ width: `${(totalUsed / totalBudget) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  const { budgets, auth } = useSupabase();
  const loading = ref(false);
  const error = ref('');

  const form = ref({
    department: '',
    year: '2024',
    totalBudget: '',
    period: 'monthly',
  });

  // 預算類別和使用狀況
  const categories = ref([
    { name: '辦公用品', percentage: 20, used: 0, total: 0 },
    { name: '差旅', percentage: 30, used: 0, total: 0 },
    { name: 'SaaS 訂閱', percentage: 25, used: 0, total: 0 },
    { name: '餐飲', percentage: 15, used: 0, total: 0 },
    { name: '其他', percentage: 10, used: 0, total: 0 },
  ]);

  // 更新預算類別的總額
  const updateCategoryTotals = () => {
    const total = parseFloat(form.value.totalBudget) || 0;
    categories.value.forEach((category) => {
      category.total = (total * category.percentage) / 100;
    });
  };

  // 監聽總預算變化
  watch(
    () => form.value.totalBudget,
    () => {
      updateCategoryTotals();
    }
  );

  // 監聽百分比變化
  watch(
    () => categories.value.map((c) => c.percentage),
    () => {
      updateCategoryTotals();
    },
    { deep: true }
  );

  // 載入預算資料
  const loadBudgetData = async () => {
    try {
      const { user } = await auth.getUser();
      if (!user) return;

      const { data: budgetData, error: budgetError } =
        await budgets.getByDepartment(
          form.value.department,
          parseInt(form.value.year)
        );

      if (budgetError) {
        error.value = budgetError.message;
        return;
      }

      if (budgetData && budgetData.length > 0) {
        const budget = budgetData[0];
        form.value.totalBudget = budget.total_budget.toString();
        form.value.period = budget.period;

        // 更新類別資料
        if (budget.categories) {
          budget.categories.forEach((cat: any) => {
            const category = categories.value.find((c) => c.name === cat.name);
            if (category) {
              category.percentage = cat.percentage;
              category.total = cat.amount;
              // TODO: 這裡可以加入實際使用金額的計算
              category.used = 0; // 暫時設為 0，之後可以從支出記錄中計算
            }
          });
        }
      }
    } catch (e: any) {
      error.value = e.message;
    }
  };

  // 在組件載入時載入資料
  onMounted(() => {
    loadBudgetData();
  });

  // 當部門或年度變更時重新載入資料
  watch([() => form.value.department, () => form.value.year], () => {
    if (form.value.department) {
      loadBudgetData();
    }
  });

  const totalBudget = computed(() => {
    return categories.value.reduce((sum, category) => sum + category.total, 0);
  });

  const totalUsed = computed(() => {
    return categories.value.reduce((sum, category) => sum + category.used, 0);
  });

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSubmit = async () => {
    try {
      if (!form.value.department) {
        error.value = '請選擇部門';
        return;
      }

      if (!form.value.totalBudget) {
        error.value = '請輸入總預算';
        return;
      }

      loading.value = true;
      error.value = '';

      // 獲取當前用戶
      const { user } = await auth.getUser();
      if (!user) {
        error.value = '請先登入';
        return;
      }

      // 準備預算資料
      const budgetData = {
        department: form.value.department,
        year: parseInt(form.value.year),
        total_budget: parseFloat(form.value.totalBudget),
        period: form.value.period,
        user_id: user.id, // 加入用戶 ID
      };

      // 儲存預算設定
      const { data: budget, error: saveError } = await budgets.create(
        budgetData
      );

      if (saveError) {
        error.value = saveError.message;
        return;
      }

      // 準備預算類別資料
      const categoryData = categories.value.map((category) => ({
        budget_id: budget[0].id,
        name: category.name,
        percentage: category.percentage,
        amount:
          (parseFloat(form.value.totalBudget) * category.percentage) / 100,
      }));

      // 儲存預算類別
      const { error: categoryError } = await budgets.createCategories(
        categoryData
      );

      if (categoryError) {
        error.value = categoryError.message;
        return;
      }

      // 重新載入預算資料
      await loadBudgetData();

      // 顯示成功訊息
      alert('預算設定已儲存');
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };
</script>
