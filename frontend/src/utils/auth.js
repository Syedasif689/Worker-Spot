// src/utils/auth.js

export const saveAuth = (data, rememberMe = true) => {
  // Clear previous authentication
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  const storage = rememberMe
    ? localStorage
    : sessionStorage;

  storage.setItem("token", data.token);

  storage.setItem(
    "user",
    JSON.stringify({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    })
  );
};

export const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

export const getUser = () => {
  const user =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid stored user:", error);
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};