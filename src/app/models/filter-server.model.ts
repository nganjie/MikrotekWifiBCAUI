export interface FilterServer {
    states: string[];
    filter_entity: filter_entity[];
  }
  interface filter_entity {
    key: string;
    values: ValueFilter[];
  }
export interface ValueFilter {
    id: string;
    display_name: string;
  }