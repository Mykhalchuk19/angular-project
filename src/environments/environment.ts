const API_URL = $ENV && $ENV.API_URL ? $ENV.API_URL : 'http://localhost:4000';

export const environment = {
  production: false,
  baseUrl: `${API_URL}`,
  appUrl: 'http://localhost:4200',
};
