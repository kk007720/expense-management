<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        儀表板
      </h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        查看您的預算使用情況和支出統計
      </p>
    </div>

    <!-- 統計卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
          本月總支出
        </h3>
        <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
          $45,231
        </p>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 text-sm font-medium">↗ 12%</span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400"
              >相比上月</span
            >
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
          預算使用率
        </h3>
        <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
          67.8%
        </p>
        <div class="mt-4">
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full"
              style="width: 67.8%"
            ></div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
          待審核請款
        </h3>
        <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
          12
        </p>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-red-500 text-sm font-medium">↗ 8%</span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400"
              >相比上週</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 圖表區域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          支出趨勢
        </h3>
        <div class="h-80">
          <div ref="expenseChart" class="w-full h-full"></div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          支出分類
        </h3>
        <div class="h-80">
          <div ref="categoryChart" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <!-- 最近交易 -->
    <div class="mt-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            最近交易
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  日期
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  描述
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  類別
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  金額
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  狀態
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-for="transaction in recentTransactions"
                :key="transaction.id"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ transaction.date }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ transaction.description }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ transaction.category }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  ${{ transaction.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      transaction.status === '已核准'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : transaction.status === '待審核'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
                    ]"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';

  const expenseChart = ref<HTMLElement | null>(null);
  const categoryChart = ref<HTMLElement | null>(null);

  // 模擬交易數據
  const recentTransactions = ref([
    {
      id: 1,
      date: '2024-03-15',
      description: '辦公用品採購',
      category: '辦公用品',
      amount: '1,234',
      status: '已核准',
    },
    {
      id: 2,
      date: '2024-03-14',
      description: '團隊餐費',
      category: '餐飲',
      amount: '567',
      status: '待審核',
    },
    {
      id: 3,
      date: '2024-03-13',
      description: '軟體訂閱',
      category: 'SaaS',
      amount: '899',
      status: '已核准',
    },
  ]);

  onMounted(() => {
    // 初始化支出趨勢圖表
    if (expenseChart.value) {
      const chart = echarts.init(expenseChart.value);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [15000, 18000, 22000, 19000, 25000, 23000],
            type: 'line',
            smooth: true,
          },
        ],
      });
    }

    // 初始化支出分類圖表
    if (categoryChart.value) {
      const chart = echarts.init(categoryChart.value);
      chart.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 35, name: '辦公用品' },
              { value: 25, name: '餐飲' },
              { value: 20, name: 'SaaS' },
              { value: 15, name: '差旅' },
              { value: 5, name: '其他' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  });
</script>
