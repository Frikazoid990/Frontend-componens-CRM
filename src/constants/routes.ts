import type { UUID } from 'crypto';

export const apiRoute = '/api/cars';

export const carApiRoutes = {
  allCar: '/car/getallcar',
};

export const authApiRoutes = {
  signIn: '/auth/signin',
  registration: '/auth/registration',
};

export const dealApiRoutes = {
  addDeal: '/deal/add-deal',

  updateDealWithEmployee: (dealId: string) => `/deal/update-deal-with-employee/${dealId}`,

  updateDealWithStatus: (dealId: string) => `/deal/update-deal-with-status/${dealId}`,

  updateDealWithIsCanceled: (dealId: string) => `/dea/update-deal-with-is-canceled/${dealId}`,

  getDeals: '/deal/get-all-deals',

  getDealForClient: '/deal/get-deal-for-client',
};

export const testDriveApiRoutes = {
  getTestDrives: '/test-drive/get-test-drives',

  updateTestDriveWithEmployee: (testDriveId: string) => `/test-drive/test-drive-update-employee/${testDriveId}`,

  updateTestDriveWithStatus: (testDriveId: string) => `/test-drive/test-drive-update-status/${testDriveId}`,

  availableDays: `/test-drive/available-days`,

  availableSlots: `/test-drive/available-slots`,

  addTestDrive: `/test-drive/add-test-drive`,

  getTestDrivesForClient: (clientId: UUID) => `/test-drive/get-test-drives-for-client/${clientId}`,
};

export const statusApiRoutes = {
  getStatusTestDrives: `/statuses/get-statuses-test-drive`,

  getStatusDeals: `/statuses/get-statuses-deals`,
};

export const messageApiRoutes = {
  addMessage: `/message/add-message`,

  getMessages: (chatId: number) => `/message/get-message-for-chat/${chatId}`,
};

export const managerApiRoutes = {
  getStaff: `/manager/get-staff`,
};
