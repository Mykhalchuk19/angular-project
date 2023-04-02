export const DYNAMIC_ID = ':id';
export const AUTH = '/auth';
export const ROUTES = {
  ROOT: '/',
  PROFILE: '/profile',
  AUTH: {
    LOGIN: `${AUTH}/login`,
    REGISTER: `${AUTH}/register`,
    FORGOT_PASSWORD: `${AUTH}/forgot-password`,
    RESET_PASSWORD: `${AUTH}/reset-password`,
  },
  USERS: {
    ROOT: '/users',
  },
  BOTS: {
    ROOT: '/bots',
  },
  CLIENTS: {
    ROOT: '/clients',
  },
  CHAT: {
    ROOT: '/chat',
  },
};
