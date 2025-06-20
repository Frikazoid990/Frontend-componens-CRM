/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as MainRouteImport } from './routes/_main'
import { Route as AuthRouteImport } from './routes/_auth'
import { Route as MainIndexRouteImport } from './routes/_main/index'
import { Route as MainPersonal_officeIndexRouteImport } from './routes/_main/personal_office/index'
import { Route as MainPersonal_officeTest_drivesIndexRouteImport } from './routes/_main/personal_office/test_drives/index'
import { Route as MainPersonal_officeDealIndexRouteImport } from './routes/_main/personal_office/deal/index'
import { Route as MainManagerTest_drivesIndexRouteImport } from './routes/_main/manager/test_drives/index'
import { Route as MainManagerReportingIndexRouteImport } from './routes/_main/manager/reporting/index'
import { Route as MainManagerDealsIndexRouteImport } from './routes/_main/manager/deals/index'
import { Route as MainManagerDashboardIndexRouteImport } from './routes/_main/manager/dashboard/index'
import { Route as AuthAuthRegisterIndexRouteImport } from './routes/_auth/auth/register/index'
import { Route as AuthAuthLoginIndexRouteImport } from './routes/_auth/auth/login/index'
import { Route as AuthAuthErrorIndexRouteImport } from './routes/_auth/auth/error/index'
import { Route as MainPersonal_officeTest_drivesIdRouteImport } from './routes/_main/personal_office/test_drives/$id'
import { Route as MainManagerTest_drivesIdRouteImport } from './routes/_main/manager/test_drives/$id'
import { Route as MainManagerDealsIdRouteImport } from './routes/_main/manager/deals/$id'

const MainRoute = MainRouteImport.update({
  id: '/_main',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRouteImport,
} as any)
const MainIndexRoute = MainIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainRoute,
} as any)
const MainPersonal_officeIndexRoute =
  MainPersonal_officeIndexRouteImport.update({
    id: '/personal_office/',
    path: '/personal_office/',
    getParentRoute: () => MainRoute,
  } as any)
const MainPersonal_officeTest_drivesIndexRoute =
  MainPersonal_officeTest_drivesIndexRouteImport.update({
    id: '/personal_office/test_drives/',
    path: '/personal_office/test_drives/',
    getParentRoute: () => MainRoute,
  } as any)
const MainPersonal_officeDealIndexRoute =
  MainPersonal_officeDealIndexRouteImport.update({
    id: '/personal_office/deal/',
    path: '/personal_office/deal/',
    getParentRoute: () => MainRoute,
  } as any)
const MainManagerTest_drivesIndexRoute =
  MainManagerTest_drivesIndexRouteImport.update({
    id: '/manager/test_drives/',
    path: '/manager/test_drives/',
    getParentRoute: () => MainRoute,
  } as any)
const MainManagerReportingIndexRoute =
  MainManagerReportingIndexRouteImport.update({
    id: '/manager/reporting/',
    path: '/manager/reporting/',
    getParentRoute: () => MainRoute,
  } as any)
const MainManagerDealsIndexRoute = MainManagerDealsIndexRouteImport.update({
  id: '/manager/deals/',
  path: '/manager/deals/',
  getParentRoute: () => MainRoute,
} as any)
const MainManagerDashboardIndexRoute =
  MainManagerDashboardIndexRouteImport.update({
    id: '/manager/dashboard/',
    path: '/manager/dashboard/',
    getParentRoute: () => MainRoute,
  } as any)
const AuthAuthRegisterIndexRoute = AuthAuthRegisterIndexRouteImport.update({
  id: '/auth/register/',
  path: '/auth/register/',
  getParentRoute: () => AuthRoute,
} as any)
const AuthAuthLoginIndexRoute = AuthAuthLoginIndexRouteImport.update({
  id: '/auth/login/',
  path: '/auth/login/',
  getParentRoute: () => AuthRoute,
} as any)
const AuthAuthErrorIndexRoute = AuthAuthErrorIndexRouteImport.update({
  id: '/auth/error/',
  path: '/auth/error/',
  getParentRoute: () => AuthRoute,
} as any)
const MainPersonal_officeTest_drivesIdRoute =
  MainPersonal_officeTest_drivesIdRouteImport.update({
    id: '/personal_office/test_drives/$id',
    path: '/personal_office/test_drives/$id',
    getParentRoute: () => MainRoute,
  } as any)
const MainManagerTest_drivesIdRoute =
  MainManagerTest_drivesIdRouteImport.update({
    id: '/manager/test_drives/$id',
    path: '/manager/test_drives/$id',
    getParentRoute: () => MainRoute,
  } as any)
const MainManagerDealsIdRoute = MainManagerDealsIdRouteImport.update({
  id: '/manager/deals/$id',
  path: '/manager/deals/$id',
  getParentRoute: () => MainRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof MainIndexRoute
  '/personal_office': typeof MainPersonal_officeIndexRoute
  '/manager/deals/$id': typeof MainManagerDealsIdRoute
  '/manager/test_drives/$id': typeof MainManagerTest_drivesIdRoute
  '/personal_office/test_drives/$id': typeof MainPersonal_officeTest_drivesIdRoute
  '/auth/error': typeof AuthAuthErrorIndexRoute
  '/auth/login': typeof AuthAuthLoginIndexRoute
  '/auth/register': typeof AuthAuthRegisterIndexRoute
  '/manager/dashboard': typeof MainManagerDashboardIndexRoute
  '/manager/deals': typeof MainManagerDealsIndexRoute
  '/manager/reporting': typeof MainManagerReportingIndexRoute
  '/manager/test_drives': typeof MainManagerTest_drivesIndexRoute
  '/personal_office/deal': typeof MainPersonal_officeDealIndexRoute
  '/personal_office/test_drives': typeof MainPersonal_officeTest_drivesIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof MainIndexRoute
  '/personal_office': typeof MainPersonal_officeIndexRoute
  '/manager/deals/$id': typeof MainManagerDealsIdRoute
  '/manager/test_drives/$id': typeof MainManagerTest_drivesIdRoute
  '/personal_office/test_drives/$id': typeof MainPersonal_officeTest_drivesIdRoute
  '/auth/error': typeof AuthAuthErrorIndexRoute
  '/auth/login': typeof AuthAuthLoginIndexRoute
  '/auth/register': typeof AuthAuthRegisterIndexRoute
  '/manager/dashboard': typeof MainManagerDashboardIndexRoute
  '/manager/deals': typeof MainManagerDealsIndexRoute
  '/manager/reporting': typeof MainManagerReportingIndexRoute
  '/manager/test_drives': typeof MainManagerTest_drivesIndexRoute
  '/personal_office/deal': typeof MainPersonal_officeDealIndexRoute
  '/personal_office/test_drives': typeof MainPersonal_officeTest_drivesIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_auth': typeof AuthRouteWithChildren
  '/_main': typeof MainRouteWithChildren
  '/_main/': typeof MainIndexRoute
  '/_main/personal_office/': typeof MainPersonal_officeIndexRoute
  '/_main/manager/deals/$id': typeof MainManagerDealsIdRoute
  '/_main/manager/test_drives/$id': typeof MainManagerTest_drivesIdRoute
  '/_main/personal_office/test_drives/$id': typeof MainPersonal_officeTest_drivesIdRoute
  '/_auth/auth/error/': typeof AuthAuthErrorIndexRoute
  '/_auth/auth/login/': typeof AuthAuthLoginIndexRoute
  '/_auth/auth/register/': typeof AuthAuthRegisterIndexRoute
  '/_main/manager/dashboard/': typeof MainManagerDashboardIndexRoute
  '/_main/manager/deals/': typeof MainManagerDealsIndexRoute
  '/_main/manager/reporting/': typeof MainManagerReportingIndexRoute
  '/_main/manager/test_drives/': typeof MainManagerTest_drivesIndexRoute
  '/_main/personal_office/deal/': typeof MainPersonal_officeDealIndexRoute
  '/_main/personal_office/test_drives/': typeof MainPersonal_officeTest_drivesIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/personal_office'
    | '/manager/deals/$id'
    | '/manager/test_drives/$id'
    | '/personal_office/test_drives/$id'
    | '/auth/error'
    | '/auth/login'
    | '/auth/register'
    | '/manager/dashboard'
    | '/manager/deals'
    | '/manager/reporting'
    | '/manager/test_drives'
    | '/personal_office/deal'
    | '/personal_office/test_drives'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/personal_office'
    | '/manager/deals/$id'
    | '/manager/test_drives/$id'
    | '/personal_office/test_drives/$id'
    | '/auth/error'
    | '/auth/login'
    | '/auth/register'
    | '/manager/dashboard'
    | '/manager/deals'
    | '/manager/reporting'
    | '/manager/test_drives'
    | '/personal_office/deal'
    | '/personal_office/test_drives'
  id:
    | '__root__'
    | '/_auth'
    | '/_main'
    | '/_main/'
    | '/_main/personal_office/'
    | '/_main/manager/deals/$id'
    | '/_main/manager/test_drives/$id'
    | '/_main/personal_office/test_drives/$id'
    | '/_auth/auth/error/'
    | '/_auth/auth/login/'
    | '/_auth/auth/register/'
    | '/_main/manager/dashboard/'
    | '/_main/manager/deals/'
    | '/_main/manager/reporting/'
    | '/_main/manager/test_drives/'
    | '/_main/personal_office/deal/'
    | '/_main/personal_office/test_drives/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  MainRoute: typeof MainRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_main/': {
      id: '/_main/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/personal_office/': {
      id: '/_main/personal_office/'
      path: '/personal_office'
      fullPath: '/personal_office'
      preLoaderRoute: typeof MainPersonal_officeIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/personal_office/test_drives/': {
      id: '/_main/personal_office/test_drives/'
      path: '/personal_office/test_drives'
      fullPath: '/personal_office/test_drives'
      preLoaderRoute: typeof MainPersonal_officeTest_drivesIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/personal_office/deal/': {
      id: '/_main/personal_office/deal/'
      path: '/personal_office/deal'
      fullPath: '/personal_office/deal'
      preLoaderRoute: typeof MainPersonal_officeDealIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/test_drives/': {
      id: '/_main/manager/test_drives/'
      path: '/manager/test_drives'
      fullPath: '/manager/test_drives'
      preLoaderRoute: typeof MainManagerTest_drivesIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/reporting/': {
      id: '/_main/manager/reporting/'
      path: '/manager/reporting'
      fullPath: '/manager/reporting'
      preLoaderRoute: typeof MainManagerReportingIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/deals/': {
      id: '/_main/manager/deals/'
      path: '/manager/deals'
      fullPath: '/manager/deals'
      preLoaderRoute: typeof MainManagerDealsIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/dashboard/': {
      id: '/_main/manager/dashboard/'
      path: '/manager/dashboard'
      fullPath: '/manager/dashboard'
      preLoaderRoute: typeof MainManagerDashboardIndexRouteImport
      parentRoute: typeof MainRoute
    }
    '/_auth/auth/register/': {
      id: '/_auth/auth/register/'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterIndexRouteImport
      parentRoute: typeof AuthRoute
    }
    '/_auth/auth/login/': {
      id: '/_auth/auth/login/'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginIndexRouteImport
      parentRoute: typeof AuthRoute
    }
    '/_auth/auth/error/': {
      id: '/_auth/auth/error/'
      path: '/auth/error'
      fullPath: '/auth/error'
      preLoaderRoute: typeof AuthAuthErrorIndexRouteImport
      parentRoute: typeof AuthRoute
    }
    '/_main/personal_office/test_drives/$id': {
      id: '/_main/personal_office/test_drives/$id'
      path: '/personal_office/test_drives/$id'
      fullPath: '/personal_office/test_drives/$id'
      preLoaderRoute: typeof MainPersonal_officeTest_drivesIdRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/test_drives/$id': {
      id: '/_main/manager/test_drives/$id'
      path: '/manager/test_drives/$id'
      fullPath: '/manager/test_drives/$id'
      preLoaderRoute: typeof MainManagerTest_drivesIdRouteImport
      parentRoute: typeof MainRoute
    }
    '/_main/manager/deals/$id': {
      id: '/_main/manager/deals/$id'
      path: '/manager/deals/$id'
      fullPath: '/manager/deals/$id'
      preLoaderRoute: typeof MainManagerDealsIdRouteImport
      parentRoute: typeof MainRoute
    }
  }
}

interface AuthRouteChildren {
  AuthAuthErrorIndexRoute: typeof AuthAuthErrorIndexRoute
  AuthAuthLoginIndexRoute: typeof AuthAuthLoginIndexRoute
  AuthAuthRegisterIndexRoute: typeof AuthAuthRegisterIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthErrorIndexRoute: AuthAuthErrorIndexRoute,
  AuthAuthLoginIndexRoute: AuthAuthLoginIndexRoute,
  AuthAuthRegisterIndexRoute: AuthAuthRegisterIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface MainRouteChildren {
  MainIndexRoute: typeof MainIndexRoute
  MainPersonal_officeIndexRoute: typeof MainPersonal_officeIndexRoute
  MainManagerDealsIdRoute: typeof MainManagerDealsIdRoute
  MainManagerTest_drivesIdRoute: typeof MainManagerTest_drivesIdRoute
  MainPersonal_officeTest_drivesIdRoute: typeof MainPersonal_officeTest_drivesIdRoute
  MainManagerDashboardIndexRoute: typeof MainManagerDashboardIndexRoute
  MainManagerDealsIndexRoute: typeof MainManagerDealsIndexRoute
  MainManagerReportingIndexRoute: typeof MainManagerReportingIndexRoute
  MainManagerTest_drivesIndexRoute: typeof MainManagerTest_drivesIndexRoute
  MainPersonal_officeDealIndexRoute: typeof MainPersonal_officeDealIndexRoute
  MainPersonal_officeTest_drivesIndexRoute: typeof MainPersonal_officeTest_drivesIndexRoute
}

const MainRouteChildren: MainRouteChildren = {
  MainIndexRoute: MainIndexRoute,
  MainPersonal_officeIndexRoute: MainPersonal_officeIndexRoute,
  MainManagerDealsIdRoute: MainManagerDealsIdRoute,
  MainManagerTest_drivesIdRoute: MainManagerTest_drivesIdRoute,
  MainPersonal_officeTest_drivesIdRoute: MainPersonal_officeTest_drivesIdRoute,
  MainManagerDashboardIndexRoute: MainManagerDashboardIndexRoute,
  MainManagerDealsIndexRoute: MainManagerDealsIndexRoute,
  MainManagerReportingIndexRoute: MainManagerReportingIndexRoute,
  MainManagerTest_drivesIndexRoute: MainManagerTest_drivesIndexRoute,
  MainPersonal_officeDealIndexRoute: MainPersonal_officeDealIndexRoute,
  MainPersonal_officeTest_drivesIndexRoute:
    MainPersonal_officeTest_drivesIndexRoute,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  MainRoute: MainRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
