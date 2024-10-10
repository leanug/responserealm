// Define the ENV constant
export const ENV = {
  ENDPOINTS: {
    AUTH: {
      CHANGE_PASSWORD: 'auth/change-password',
      REGISTER: 'auth/local/register',
      LOGIN: 'auth/local',
    },
    BOARD: {
      CREATE: '/api/board/create',
      GET_BY_USER_ID: (userId: string) => `/api/board/get/user-id/${userId}`,
      GET_BY_SLUG: (slug: string) => `/api/board/get/slug/${slug}`,
      DELETE: (id: string) => `/api/board/delete/${id}`,
    },
    POST: {
      CREATE: '/api/post/create',
      GET_BY_BOARD_ID: (boardId: string) => `/api/post/get/board-id/${boardId}`,
      GET_BY_ID: (id: string) => `/api/post/get/id/${id}`,
      COMMENT: (id: string, action: string) => `/api/post/patch/comment-count/${id}/${action}`,
      LIKE: (id: string, action: string) => `/api/post/patch/like/${id}/${action}`,
      UPDATE_STATUS: (id: string, status: string) => `/api/post/patch/status/${id}/${status}`,
      DELETE: (id: string) => `/api/post/delete/${id}`,
    },
    COMMENT: {
      CREATE: '/api/comment/create',
      GET_BY_POST_ID: (postId: string) => `/api/comment/get/post-id/${postId}`,
      DELETE: (id: string) => `/api/comment/delete/${id}`,
    },
    LIKED_POST: {
      CREATE: '/api/liked-post/create',
      DELETE: (id: string) => `/api/liked-post/delete/${id}`,
      GET_BY_USER_ID: (userId: string) => `/api/liked-post/get/user-id/${userId}`,
    },
  },
  SIGNIN_URI: '/auth/login',
  TOKEN: 'token',
  IS_DEV: process.env.NODE_ENV === 'development',
}