import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp || decoded.exp <= Date.now() / 1000) {
      sessionStorage.removeItem("accessToken");
      return false;
    }

    return true;
  } catch (error) {
    sessionStorage.removeItem("accessToken");
    return false;
  }

  //   try {
  //     const response = await fetch('/api/verify-token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (!response.ok) throw new Error('Invalid token');

  //     return true; // 유효한 경우 true 반환
  //   } catch (error) {
  //     console.error('Authentication failed:', error);
  //     return false; // 실패 시 false 반환
  //   }
};
