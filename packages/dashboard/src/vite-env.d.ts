/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_SUFIX: string
  readonly VITE_SITE_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
  readonly VITE_LOGSNAG_TOKEN: string
  readonly VITE_LOGSNAG_PROJECT: string
  readonly VITE_LOGSNAG_DISABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
