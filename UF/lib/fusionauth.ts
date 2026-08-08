export async function buildAuthorizationUrl(
  state: string,
  appTenantParam: string | null,
) {
  try {
    const queryParams = new URLSearchParams();

    if (appTenantParam) {
      queryParams.append('tenant', appTenantParam);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/fusionauth-credentials?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch FusionAuth registration details: ${response.status}`);
    }

    // No client secret requested here — building the authorization URL only
    // needs the public discovery fields (they appear in the redirect URL anyway).
    const {
      tenantUniqueId,
      applicationId,
      appTenantId,
      fusionAuthBaseUrl,
    } = await response.json();

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: applicationId,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_BASE_PATH}/next-api/auth/callback`,
      scope: 'openid profile email offline_access',
      tenantId: tenantUniqueId,
      state,
      prompt: 'login',
    });

    return {
      url: `${fusionAuthBaseUrl}/oauth2/authorize?${params.toString()}`,
      appTenantId,
    };
  } catch (error) {
    throw error;
  }
}

export async function exchangeCodeForTokens(
  code: string,
  appTenantParam: string | null | undefined,
) {
  const queryParams = new URLSearchParams();

  if (appTenantParam) {
    queryParams.append('tenant', appTenantParam);
  }

  // This is the only flow that needs the OAuth client secret. The backend now
  // releases it solely to a caller presenting the shared internal-service key,
  // so an anonymous request to the same endpoint gets discovery data only.
  // Server-side module — INTERNAL_SERVICE_KEY is deliberately not NEXT_PUBLIC_*
  // and must never be exposed to the browser bundle.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/fusionauth-credentials?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-service-key': process.env.INTERNAL_SERVICE_KEY ?? '',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch FusionAuth registration details: ${response.status}`,
    );
  }

  const {
    tenantUniqueId,
    applicationId,
    fusionAuthAppClientSecret,
    fusionAuthBaseUrl
  } = await response.json();

  if (!fusionAuthAppClientSecret) {
    throw new Error(
      'FusionAuth client secret was not returned — set INTERNAL_SERVICE_KEY to the same value on both the UF server and the DF backend.',
    );
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_BASE_PATH}/next-api/auth/callback`,
    client_id: applicationId,
    client_secret: fusionAuthAppClientSecret,
  });

  const res = await fetch(
    `${fusionAuthBaseUrl}/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-FusionAuth-TenantId': tenantUniqueId,
      },
      body: params.toString(),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  return await res.json();
}
