export function getPublicEnv(key: string): string {
  // if (typeof window !== 'undefined') {
    // client: read from injected runtime config
    // return (window as any).__ENV?.[key] ?? '';
  // }
  // server: read normally
  return process.env[key] ?? '';
}