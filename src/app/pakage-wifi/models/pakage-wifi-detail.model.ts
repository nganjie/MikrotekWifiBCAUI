import { WifiZoneDetail } from "../../wifi-zones/models/wifi-zone-detail.model";

export interface PakageWifiDetail {
    id: string;
    zone_wifi_id: string;
    designation: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    zone_wifis: WifiZoneDetail;
  }