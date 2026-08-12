import { CustomException } from '../customException';

// Shared SSRF guard for every outbound call this server makes to a
// caller/tenant-configurable URL. Mandatory, fail-closed: OUTBOUND_HOST_ALLOWLIST
// must be set, or every outbound call is rejected. There is no opt-out — an
// operator must explicitly enumerate the hosts this server is allowed to reach
// outbound. Kept as one copy (common.Service.ts and the scheduler's HttpHandler
// both call it) so the two call sites can't drift out of sync.
export function assertAllowedOutboundHost(url: string): void {
  const allowlist = (process.env.OUTBOUND_HOST_ALLOWLIST || '')
    .split(',')
    .map(h => h.trim().toLowerCase())
    .filter(Boolean);
  if (!allowlist.length) {
    throw new CustomException('OUTBOUND_HOST_ALLOWLIST is not configured; outbound requests are denied by default', 500);
  }
  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch (e) {
    throw new CustomException(`Invalid outbound URL: ${url}`, 400);
  }
  const isAllowed = allowlist.some(h => hostname === h || hostname.endsWith(`.${h}`));
  if (!isAllowed) {
    throw new CustomException(`Outbound host not allow-listed: ${hostname}`, 400);
  }
}
