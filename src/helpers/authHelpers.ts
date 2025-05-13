const AUTH_CODE = import.meta.env.VITE_AUTH_CODE;

export const checkAuthCode = () => {
  const authCode = localStorage.getItem('authCode');
  return authCode === AUTH_CODE;
};

export const trySetAuthCode = (input: string): boolean => {
  if (input === AUTH_CODE) {
    localStorage.setItem('authCode', AUTH_CODE);
    return true;
  }
  return false;
};
