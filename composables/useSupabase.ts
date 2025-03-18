import { createClient } from '@supabase/supabase-js';

export const useSupabase = () => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  );

  // 認證相關
  const auth = {
    // 使用 Email 註冊
    signUpWithPassword: async (credentials: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      return { data, error };
    },

    // 使用 Google 登入
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { data, error };
    },

    // 使用 Email 登入
    signInWithEmail: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    },

    // 登出
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },

    // 獲取當前用戶
    getUser: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      return { user, error };
    },
  };

  // 預算相關
  const budgets = {
    // 創建預算
    create: async (budgetData: any) => {
      const { data, error } = await supabase
        .from('budgets')
        .insert(budgetData)
        .select();
      return { data, error };
    },

    // 創建預算類別
    createCategories: async (categoryData: any) => {
      const { data, error } = await supabase
        .from('budget_categories')
        .insert(categoryData)
        .select();
      return { data, error };
    },

    // 獲取部門預算
    getByDepartment: async (department: string, year: number) => {
      // 先獲取預算資料
      const { data: budgetData, error: budgetError } = await supabase
        .from('budgets')
        .select('*')
        .eq('department', department)
        .eq('year', year)
        .order('created_at', { ascending: false })
        .limit(1);

      if (budgetError) return { error: budgetError };

      if (budgetData && budgetData.length > 0) {
        // 再獲取對應的預算類別資料
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('budget_categories')
          .select('*')
          .eq('budget_id', budgetData[0].id);

        if (categoriesError) return { error: categoriesError };

        // 組合資料
        return {
          data: [
            {
              ...budgetData[0],
              categories: categoriesData,
            },
          ],
          error: null,
        };
      }

      return { data: null, error: null };
    },
  };

  // 支出相關
  const expenses = {
    // 創建支出
    create: async (expenseData: any) => {
      const { data, error } = await supabase
        .from('expenses')
        .insert(expenseData)
        .select();
      return { data, error };
    },

    // 獲取支出列表
    list: async (filters: any = {}) => {
      let query = supabase.from('expenses').select(`
          *,
          expense_categories (
            name
          ),
          users (
            full_name
          )
        `);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.startDate && filters.endDate) {
        query = query
          .gte('submitted_at', filters.startDate)
          .lte('submitted_at', filters.endDate);
      }

      const { data, error } = await query.order('submitted_at', {
        ascending: false,
      });
      return { data, error };
    },

    // 更新支出狀態
    updateStatus: async (id: string, status: string) => {
      const { data, error } = await supabase
        .from('expenses')
        .update({ status })
        .eq('id', id)
        .select();
      return { data, error };
    },

    // 上傳收據
    uploadReceipt: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(filePath, file);

      if (error) return { error };

      const {
        data: { publicUrl },
      } = supabase.storage.from('receipts').getPublicUrl(filePath);

      return { data: publicUrl, error: null };
    },
  };

  return {
    auth,
    budgets,
    expenses,
  };
};
