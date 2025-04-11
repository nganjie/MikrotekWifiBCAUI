import { PakageDetail } from "./pakage-detail.model";

export interface PakageUserDetail {
    id: string;
    user_id: string;
    pakage_id: string;
    status: number;
    state: string;
    is_send_message:boolean;
    created_at: string;
    updated_at: string;
    pakage: PakageDetail;
  }
