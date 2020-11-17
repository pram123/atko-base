export default {
  oidc: {
    clientId: '0oa1mgvcnojpxMPPG1s6',
    issuer: 'https://prdemo1.clouditude.com/oauth2/default',
    redirectUri: 'https://generationbanks.com/callback',
    scopes: 'openid profile email address',
    baseUrl: 'https://prdemo1.clouditude.com',
    authParams: {
      responseType: ['id_token', 'token'],
      display: 'page',
      scopes: ['openid', 'email', 'profile', 'address'],
      issuer: 'https://prdemo1.clouditude.com/oauth2/default',
      pkce: false,
    },
    features: {
      idpDiscovery: true,
      registration: true,
      multiOptionalFactorEnroll: true,
      rememberMe: true,
      selfServiceUnlock: true,
      router:false
    },
  },
  oidcprod: {
      // Changes to widget functionality
      features: {
          idpDiscovery: true,
          registration: true,                 // Enable self-service registration flow
          rememberMe: true,                   // Setting to false will remove the checkbox to save username
          multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
          selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
          smsRecovery: true,                // Enable SMS-based account recovery
          callRecovery: true,               // Enable voice call-based account recovery
      },
      baseUrl: 'https://sso-generationbanks.okta.com',
      clientId: '0oafe7ztD9EW5GyKr5d5',
       issuer: 'https://sso-generationbanks.okta.com/oauth2/ausfe4seHLvswwvVL5d5',
      scopes: ['openid', 'email', 'profile', 'address'],
    redirectUri: 'https://generationbanks.com/callback',
   //   redirectUri: 'http://localhost:8100/callback',
      pkce:true,
      authParams: {
          pkce:true,
          issuer: 'https://sso-generationbanks.okta.com/oauth2/ausfe4seHLvswwvVL5d5',
          responseType: ['id_token', 'token'],
          scopes: ['openid', 'email', 'profile', 'address'],
      },
  }
};
