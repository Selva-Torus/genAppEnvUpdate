// Single source of truth for env values that client code may see.
// Only keys listed here can ever reach the browser; everything else
// (AUTH_SECRET, ENCRYPTIONKEY, INTERNAL_SERVICE_KEY, REDIS_*, ...) stays server-only.
export const PUBLIC_ENV_KEYS = [
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_TENANT_CODE',
  'NEXT_PUBLIC_APPGROUPCODE',
  'NEXT_PUBLIC_APPCODE',
  'NEXT_PUBLIC_TORUS_API_URL',
  'NEXT_PUBLIC_FTP_OUTPUT_HOST',
  'NEXT_PUBLIC_BASE_PATH',
  'NEXT_PUBLIC_DFS_BUCKETNAME',
  'NEXT_PUBLIC_DFS_PATH',
  'NEXT_PUBLIC_IS_SAAS_APPLICATION',
  'NEXT_PUBLIC_APP_URL',
] as const

export type PublicEnvKey = (typeof PUBLIC_ENV_KEYS)[number]
export type PublicEnv = Record<PublicEnvKey, string>

/** SERVER ONLY: call from a server component (layout.tsx). Builds the allowlisted snapshot. */
export function getServerPublicEnv(): PublicEnv {
  const env = {} as PublicEnv
  for (const key of PUBLIC_ENV_KEYS) {
    // dynamic access on purpose: read at request time, not inlined at build time
    env[key] = process.env[key] ?? ''
  }
  return env
}

// Client-side store, filled once by GlobalProvider.
// Lets non-React code (axios, utils, handlers) read the same values.
let clientEnv: Partial<PublicEnv> = {}

export function setClientPublicEnv(env: Partial<PublicEnv>) {
  if (typeof window === 'undefined') return // never keep state on the server (shared across requests)
  clientEnv = env
}

/** Works everywhere: server -> process.env, client -> values supplied via context. */
export function getPublicEnv(key: PublicEnvKey): string {

  console.log(clientEnv , "clientEnv");
  
  if (typeof window === 'undefined') return process.env[key] ?? ''
  return clientEnv[key] ?? ''
}