/* jshint node: true */

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'client',
    environment,
    host: 'https://still-lake-57662.herokuapp.com',
    baseURL: '/',
    locationType: 'auto',
    namespace: '',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${ENV.host}/auth/token`,
    authorizationPrefix: 'JWT ',
    identificationField: 'email',
    passwordField: 'password'
  };

  ENV.torii = {
    sessionServiceName: 'session',
    providers: {
      'google-oauth2': {
        apiKey: '1071029381615-tucu38j7kboh2kk4f8tj9br832gihl03.apps.googleusercontent.com',
        redirectUri: 'http://127.0.0.1:4200',
        accessType: 'offline'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // eslint-disable-next-line no-console
    console.log('dev');
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.host = 'https://still-lake-57662.herokuapp.com';
    ENV.namespace = '';
    ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.namespace}/auth/token`;
    ENV.torii.providers['google-oauth2'].redirectUri = ENV.host;

    // eslint-disable-next-line no-console
    console.log(`API Namespace: ${ENV.namespace}`);
    // eslint-disable-next-line no-console
    console.log('prod');
  }

  return ENV;
};
