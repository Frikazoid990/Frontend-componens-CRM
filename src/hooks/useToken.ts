export const useToken = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='))
    ?.split('=')[1];

  if (!token) {
    return null;
  }
  return token;
};
