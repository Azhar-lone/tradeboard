export const routes = {
  forgotPassword: "/forget-password",
  login: "/login",
  dashboard: "/dashboard",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const backendRoutes = {
  login: `${backendUrl}/user/login`,
  logout: `${backendUrl}/user/logout`,
};
