export interface User {
    id: string;
    first_name: string;
    last_name: string;
    country: string;
    number: string;
    city: string;
    is_admin: number;
    is_activate: number;
    email: string;
    email_verified_at?: any;
    profile?: any;
    state: string;
    created_at: string;
    updated_at: string;
  }