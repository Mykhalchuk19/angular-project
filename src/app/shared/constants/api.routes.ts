export const API_ROUTES = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    CHANGE_PASSWORD: 'auth/change-password',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    CHECK_TOKEN: 'auth/check-token',
  },
  USERS: {
    PROFILE: 'users/profile',
    ROOT: 'users',
    INVITE: 'users/invite',
    AVATAR: 'users/avatar',
  },
  FILES: {
    ROOT: 'files',
    UPLOAD: 'files/upload',
    UPLOAD_VIDEO: 'files/upload/video',
  },
  BOTS: {
    ROOT: 'bots',
    SET_WEBHOOK: 'bots/set-webhook',
  },
  CLIENTS: {
    ROOT: 'clients',
  },
  CHANNELS: {
    ROOT: 'channels',
    RESET_UNREAD_MESSAGES: 'channels/reset-unread-messages',
    CONNECT_USER_TO_CHANNEL: 'channels/connect-user-to-channel',
  },
  MESSAGES: {
    ROOT: 'messages',
  },
};
