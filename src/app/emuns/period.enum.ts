export enum PeriodEnum {
    Today = 'Today',
    Yesterday = 'Yesterday',
    ThisWeek = 'ThisWeek',
    ThisMonth = 'ThisMonth',
    PreviousMonth = 'PreviousMonth',
    ThisTrimester = 'ThisTrimester',
    ThisSemester = 'ThisSemester',
    ThisYear = 'ThisYear',
    PreviousYear = 'PreviousYear',
    CustomPeriod = 'CustomPeriod',
    All = 'All',
  }
  export const PeriodData:PeriodEnum[]=Object.values(PeriodEnum)
