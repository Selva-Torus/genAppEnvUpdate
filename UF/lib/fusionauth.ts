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

    const {
      tenantUniqueId,
      applicationId,
      fusionAuthAppClientSecret,
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
    throw new Error(
      `Failed to fetch FusionAuth registration details: ${response.status}`,
    );
  }

  const {
    tenantUniqueId,
    applicationId,
    fusionAuthAppClientSecret,
    fusionAuthBaseUrl,
    fusionAuthApiKey
  } = await response.json();

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
