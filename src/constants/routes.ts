import type { UUID } from 'crypto';

export const apiRoute = '/api/cars';

export const carApiRoutes = {
  allCar: '/car/getallcar',
};

export const authApiRoutes = {
  signIn: '/auth/signin',
  registration: '/auth/registration',
  LogOut: '/auth/logout',
};

export const dealApiRoutes = {
  addDeal: '/deal/add-deal',

  updateDealWithEmployee: (dealId: string) => `/deal/update-deal-with-employee/${dealId}`,

  updateDealWithStatus: (dealId: string) => `/deal/update-deal-with-status/${dealId}`,

  updateDealWithIsCanceled: (dealId: string) => `/deal/update-deal-with-is-canceled/${dealId}`,

  updateCurrentDealPrice: (dealId: string) => `/deal/update-current-deal-price/${dealId}`,

  getDeals: '/deal/get-all-deals',

  getDealForClient: (clientId: UUID) => `/deal/get-deal-for-client/${clientId}`,
  getDealForManager: (managerId: UUID) => `/deal/get-deals-for-manager/${managerId}`,
  getCurrentDeal: (dealId: string) => `/deal/get-current-deal/${dealId}`,
};

export const testDriveApiRoutes = {
  getTestDrives: '/test-drive/get-test-drives',

  updateTestDriveWithEmployee: (testDriveId: string) => `/test-drive/test-drive-update-employee/${testDriveId}`,

  updateTestDriveWithStatus: (testDriveId: string) => `/test-drive/test-drive-update-status/${testDriveId}`,

  availableDays: `/test-drive/available-days`,

  availableSlots: `/test-drive/available-slots`,

  addTestDrive: `/test-drive/add-test-drive`,

  getTestDrivesForClient: (clientId: UUID) => `/test-drive/get-test-drives-for-client/${clientId}`,

  getTestDrive: (testDriveId: string) => `/test-drive/get-test-drive/${testDriveId}`,
};

export const statusApiRoutes = {
  getStatusTestDrives: `/statuses/get-statuses-test-drives`,

  getStatusDeals: `/statuses/get-statuses-deals`,
};

export const messageApiRoutes = {
  addMessage: `/message/add-message`,

  getMessages: (chatId: number) => `/message/get-message-for-chat/${chatId}`,
};

export const managerApiRoutes = {
  getStaff: `/manager/get-staff`,
  getStatsForCurrentManager: (managerId: string) => `/manager/get-stats/${managerId}`,
};
