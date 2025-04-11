import { RolesEnum } from "../emuns/roles.enum";
import { RoutesEnum } from "../emuns/routes.enum";
import { MetaDataServer } from "./meta-data.enum";
import { PaginationDetail } from "./pagination-detail.model";
import { User } from "./user.model";

export interface DataServer<T=any> {
    data?: {data:T,meta:MetaDataServer};
    message?: any;
    success: boolean;
    error_code: number;
    error: string;
  }
  export interface ApiPaginatedResponse<T=any> {
    data?:PaginationDetail<T>;
    message?: any;
    success: boolean;
    error_code: number;
    error: string;
  }
  export interface ApiResponse<T=any>{
    data:T;
    message: any;
    success: boolean;
    error_code: number;
    error: string;
  }

  export function CurrentUser():User{
    var data =localStorage.getItem('currentUser');
    var stringData =JSON.stringify(data);
    var jsonDataPrimary =JSON.parse(stringData)
    var jsonData =JSON.parse(jsonDataPrimary)
    return jsonData as User;
  };
  export function LogOut(){
    localStorage.removeItem("appToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("roleUser")
  }
  /*function RoleString(code:string):RolesEnum{
    switch(code){
      case RolesEnum.BcaAdmin:return RolesEnum.BcaAdmin;
      case RolesEnum.OrganizationAdmin:return RolesEnum.OrganizationAdmin;
      case RolesEnum.OrganizationBranchManager:return RolesEnum.OrganizationBranchManager;
      case RolesEnum.OrganizationClient:return RolesEnum.OrganizationClient;
      case RolesEnum.OrganizationOperator:return RolesEnum.OrganizationOperator;
      case RolesEnum.OrganizationOperatorManager:return RolesEnum.OrganizationOperatorManager;
      default:return RolesEnum.NotFound;
    }
  }
  function RouteString(route:string):RoutesEnum{
    switch(route){
      case RoutesEnum.Organisations:return RoutesEnum.Organisations;
      case RoutesEnum.Employees:return RoutesEnum.Employees;
      case RoutesEnum.Transations:return RoutesEnum.Transations;
      case RoutesEnum.Branches:return RoutesEnum.Branches;
      case RoutesEnum.Users:return RoutesEnum.Users;
      case RoutesEnum.Roles:return RoutesEnum.Roles;
      case RoutesEnum.CreateBranche:return RoutesEnum.CreateBranche;
      case RoutesEnum.CreateEmployee:return RoutesEnum.CreateEmployee;
      case RoutesEnum.CreateUser:return RoutesEnum.CreateUser;
      case RoutesEnum.CreateOrganisation:return RoutesEnum.CreateOrganisation;
      case RoutesEnum.CreateOrganisation:return RoutesEnum.CreateOrganisation;
      default:return RoutesEnum.NotFound;
    }
  }*/
  export function permission(codes:RolesEnum[],action:RoutesEnum):boolean{
    let reponse=false;
    let i=codes.length;
    for(let t=0;t<i;t++){
      switch(action){
        case RoutesEnum.Organisations:reponse=organisationRole(codes[t]);break;
        case RoutesEnum.Employees:reponse= employeeRole(codes[t]);break;
        case RoutesEnum.Transations:reponse=transactionRole(codes[t]);break;
        case RoutesEnum.Branches:reponse= brancheRole(codes[t]);break;
        case RoutesEnum.Users:reponse= userRole(codes[t]);break;
        case RoutesEnum.Accounts:reponse= accountRoles(codes[t]);break;
        case RoutesEnum.Roles:reponse= roleRole(codes[t]);break;
        case RoutesEnum.CashTransactions:reponse= cashTransactionRoles(codes[t]);break;
        case RoutesEnum.Clients:reponse= clientsRoles(codes[t]);break;
        case RoutesEnum.CreateOrganisation:reponse= createOrganisation(codes[t]);break;
        case RoutesEnum.CreateUser:reponse= CreateUser(codes[t]);break;
        case RoutesEnum.CreateEmployee:reponse= CreateEmployee(codes[t]);break;
        case RoutesEnum.CreateBranche:reponse= CreateBranche(codes[t]);break;
        case RoutesEnum.ViewAllOrganisation:reponse= viewOrganisation(codes[t]);break;
        case RoutesEnum.MainRouteOrganisation:reponse= viewOrganisation(codes[t]);break;
        case RoutesEnum.Reports:reponse= clientsRoles(codes[t]);break;

      }
    }
    /*codes.forEach((code,i)=>{
      switch(action){
        case RoutesEnum.Organisations:reponse=organisationRole(code);break;
        case RoutesEnum.Employees:reponse= employeeRole(code);break;
        case RoutesEnum.Transations:reponse=transactionRole(code);break;
        case RoutesEnum.Branches:reponse= brancheRole(code);break;
        case RoutesEnum.Users:reponse= userRole(code);break;
        case RoutesEnum.Roles:reponse= roleRole(code);break;
        case RoutesEnum.Clients:reponse= clientsRoles(code);break;
        case RoutesEnum.CreateOrganisation:reponse= createOrganisation(code);break;
        case RoutesEnum.CreateUser:reponse= CreateUser(code);break;
        case RoutesEnum.CreateEmployee:reponse= CreateEmployee(code);break;
        case RoutesEnum.CreateBranche:reponse= CreateBranche(code);break;
        case RoutesEnum.ViewAllOrganisation:reponse= viewOrganisation(code);break;
        default:return false
      }
    })*/
    return reponse;
    
  }
  function cashTransactionRoles(code:RolesEnum):boolean{
    //console.log('code :',code)
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function accountRoles(code:RolesEnum):boolean{
    //console.log('code :',code)
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function clientsRoles(code:RolesEnum):boolean{
    //console.log('code :',code)
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function createOrganisation(code:RolesEnum):boolean{
    //console.log('code :',code)
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      default:return false;
    }
  }
  export function viewOrganisation(code:RolesEnum):boolean{
    //console.log('codes view  :',code)
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      default:return false;
    }
  }
  function CreateEmployee(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return true;
    }
  }
  function CreateUser(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function CreateBranche(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function organisationRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false
    }
  }
  function employeeRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return true;
    }
  }
  function userRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return true;
    }
  }
  function transactionRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return false;
    }
  }
  function brancheRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return false;
      case RolesEnum.OrganizationAdmin:return true;
      case RolesEnum.OrganizationBranchManager:return true;
      case RolesEnum.OrganizationClient:return true;
      case RolesEnum.OrganizationOperator:return true;
      case RolesEnum.OrganizationOperatorManager:return true;
      default:return true;
    }
  }
  function roleRole(code:RolesEnum):boolean{
    switch(code){
      case RolesEnum.BcaAdmin:return true;
      default:return true;
    }
  }