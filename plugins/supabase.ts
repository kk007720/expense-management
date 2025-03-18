import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#app';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  );

  return {
    provide: {
      supabase,
    },
  };
});
