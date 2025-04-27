import { searchOption } from "./search-option.model";

export function limit(value:number):searchOption{
    return {name:'limit',value:value}
}
export function offset(value:number):searchOption{
    return {name:'offset',value:value}
}
export function sortBy(value:any):searchOption{
    return {name:'sort_by',value:value}
}
export function sort_direction(value:any):searchOption{
    return {name:'sort_direction',value:value}
}
export function search(value:any):searchOption{
    return {name:'search',value:value}
}
export function client(value:any):searchOption{
    return {name:'client_id',value:value}
}
export function initiator(value:any):searchOption{
    return {name:'initiator_id',value:value}
}
export function account(value:any):searchOption{
    return {name:'account_id',value:value}
}
export function minAmount(value:any):searchOption{
    return {name:'min_amount',value:value}
}
export function maxAmount(value:any):searchOption{
    return {name:'search',value:value}
}
export function state(value:any):searchOption{
    return {name:'state',value:value}
}
export function startDate(value:any):searchOption{
    return {name:'start_date',value:value}
}
export function endDate(value:any):searchOption{
    return {name:'end_date',value:value}
}
export function orgId(value:any):searchOption{
    return {name:'org_id',value:value}
}
export function userSearchId(value:any):searchOption{
    return {name:'user_id',value:value}
}
export function zoneWifirSearchId(value:any):searchOption{
    return {name:'zone_wifi_id',value:value}
}
export function Empty(value:any):searchOption{
    return {name:'empty',value:value}
}