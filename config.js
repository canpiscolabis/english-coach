/*
 * Runtime configuration. Only browser-safe public values belong here.
 * Keep Azure Speech and Anthropic secrets in Supabase Edge Function secrets.
 * Supabase URL/key and the database schema are already configured. This file
 * can be updated on the host without rebuilding the app.
 */
window.__EFM_CONFIG__ = {
  SUPABASE_URL: 'https://flsleeshmwyjvdgomsty.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_ESHEnZonvHsNLCYrhF5StA_mdeTlQe5', // public client key; protected by RLS
  SPEECH_PROVIDER: 'auto',   // 'auto' | 'azure' | 'browser'
  AZURE_REGION: 'westeurope',// region of your Azure Speech resource
  ACCENT: 'en-GB',
  ASSESSMENT_LOCALE: 'en-GB',// 'en-US' gives richer phoneme-level detail on Azure; 'en-GB' keeps accent consistent
  AI_ENABLED: false          // enable after deploying tutor and setting ANTHROPIC_API_KEY
};
