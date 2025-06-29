export interface ISalesFunnelReportItem {
  id: string;
  stage: string;
  count: number;
  percentage: number;
  color: HexColor;
}
type HexColor = `#${string}`;

export interface ICarSalesReport {
  id: string;
  modelBrand: string;
  unitsSold: number;
  avgPrice: number;
  totalRevenue: number;
  margin: string;
}

export interface IManagerPerformanceReport {
  id: string;
  managerFullName: string;
  testDrives: number;
  dealsRegistered: number;
  dealsCompleted: number;
  conversionRate: string;
  revenue: number;
}

export type TSalesFunnelReport = ISalesFunnelReportItem[];
export type TCarSalesReport = ICarSalesReport[];
export type TManagerPerformanceReport = IManagerPerformanceReport[];
