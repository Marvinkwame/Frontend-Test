import { api } from '@/lib/axios';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    firstName: string;
    lastName: string;
    department: {
      name: string;
    };
    rank: {
      name: string;
    };
  };
}

interface UserProfile {
  fullName: string;
  departmentName: string;
  rankName: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    console.log(response.data.data)
    return response.data.data;
  },

  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/users/profile/me');
    const user = response.data.data;
    return {
      fullName: `${user.firstName} ${user.lastName}`,
      departmentName: user.department.name,
      rankName: user.rank.name
    };
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};