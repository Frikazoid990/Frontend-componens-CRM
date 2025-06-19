import type { UUID } from 'crypto';
import { useMemo } from 'react';

// {
//   "Id": "0df23a6d-bba2-4ef3-828d-8e4288b72d7a",
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "Admin",
//   "PhoneNumber": "+79509260444",
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "ADMIN",
//   "exp": 1750400340,
//   "iss": "AutoCRM",
//   "aud": "http://localhost:5321/"
// }
export interface SessionType {
  id: UUID;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  phoneNumber: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iss: string;
  aud: string;
}

export const useSession = () => {
  const user: SessionType | null = useMemo(() => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      if (!token) {
        return null;
      }

      const decodedToken = atob(token);

      return decodedToken ? JSON.parse(decodedToken) : null;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  }, []);

  return user;
};
