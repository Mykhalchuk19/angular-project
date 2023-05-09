export const DYNAMIC_ID = ':id';
export const AUTH = 'auth';
export const ROUTES = {
  ROOT: '',
  PROFILE: 'profile',
  AUTH: {
    LOGIN: 'login',
    REGISTER: `${AUTH}/register`,
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
  },
  USERS: {
    ROOT: 'users',
  },
  BOTS: {
    ROOT: 'bots',
  },
  CLIENTS: {
    ROOT: 'clients',
  },
  CHAT: {
    ROOT: 'chat',
  },
};
