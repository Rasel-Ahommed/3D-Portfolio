/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_SHOW_DRAFTS?: string;
  readonly VITE_SHOW_PLACEHOLDERS?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
