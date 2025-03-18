<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          註冊新帳戶
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          或
          <NuxtLink
            to="/auth/login"
            class="font-medium text-primary hover:text-primary-dark"
          >
            返回登入
          </NuxtLink>
        </p>
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-md">
        <p class="text-sm text-red-700 dark:text-red-200">{{ error }}</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">電子郵件</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-800"
              placeholder="電子郵件"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密碼</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-800"
              placeholder="密碼"
              v-model="password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">確認密碼</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-800"
              placeholder="確認密碼"
              v-model="confirmPassword"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <span v-if="loading">處理中...</span>
            <span v-else>註冊</span>
          </button>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-700"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-100 dark:bg-gray-900 text-gray-500">
                或使用其他方式註冊
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              @click="handleGoogleRegister"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <img
                class="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span v-if="loading">處理中...</span>
              <span v-else>使用 Google 帳戶註冊</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from '#app';
  import { useSupabase } from '@/composables/useSupabase';

  const { auth } = useSupabase();
  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  const error = ref('');

  const handleRegister = async () => {
    try {
      // 驗證密碼
      if (password.value !== confirmPassword.value) {
        error.value = '密碼不一致';
        return;
      }

      loading.value = true;
      error.value = '';

      // 使用 Supabase Auth 註冊
      const { data, error: signUpError } = await auth.signUpWithPassword({
        email: email.value,
        password: password.value,
      });

      if (signUpError) {
        error.value = signUpError.message;
        return;
      }

      if (data) {
        // 註冊成功，導向登入頁面
        await router.push('/auth/login');
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleRegister = async () => {
    try {
      loading.value = true;
      error.value = '';
      const { error: signUpError } = await auth.signInWithGoogle();

      if (signUpError) {
        error.value = signUpError.message;
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };
</script>
