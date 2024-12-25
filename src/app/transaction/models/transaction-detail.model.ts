export interface TransactionDetail {
    id: string;
    ticket_wifi_id: string;
    money_withdrawal_id?: string;
    type: string;
    status: string;
    receiver_number?: any;
    price: string;
    charge?: any;
    sms_charge?: any;
    net_price?: any;
    vendor_reference?: any;
    operation_reference?: any;
    is_collected: number;
    created_at: string;
    updated_at: string;
    ticket_wifi: Ticketwifi;
    money_withdrawal?: moneyWithdrawal;
  }
  interface moneyWithdrawal{
    id:string
    user_id:string,
    status:string,
    pakage_type:string,
    receiver_number:string,
    amount:number,
  }
  interface Ticketwifi {
    id: string;
    pakage_wifi_id: string;
    username: string;
    password: string;
    profile: string;
    time_limit: string;
    data_limit: string;
    comment: string;
    state: string;
    created_at: string;
    updated_at: string;
    pakage_wifi: Pakagewifi;
  }
  interface Pakagewifi {
    id: string;
    zone_wifi_id: string;
    designation: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    zone_wifis: Zonewifis;
  }
  interface Zonewifis {
    id: string;
    user_id: string;
    name: string;
    captive_gate: string;
    description: string;
    image: string;
    city: string;
    message: string;
    is_active_sms: number;
    wallet: number;
    state: string;
    created_at: string;
    updated_at: string;
  }