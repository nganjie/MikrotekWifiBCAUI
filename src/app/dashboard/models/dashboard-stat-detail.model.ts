import { StatusEnum } from "../../models/status.enum";

export interface DashboardStatDetail {
    totalAmount: TotalAmount[];
    stats: Stat[];
  }
  interface Stat {
    success: string;
    failed: string;
    pending: string;
    collected: string;
    name: string;
  }
  interface TotalAmount {
    status: StatusEnum;
    total_amount: string;
  }