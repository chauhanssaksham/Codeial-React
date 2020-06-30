const API_ROOT = "http://codeial.com:8000/api/v2";

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    editProfile: () => `${API_ROOT}/users/edit`,
    fetchPosts: (page: number = 1, limit: number = 5) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    fetchProfile: (user_id: string) => `${API_ROOT}/users/${user_id}`,
    userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
};