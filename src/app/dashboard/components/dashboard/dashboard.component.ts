import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables
} from 'chart.js';
//import { ChartType, NgChartsConfiguration } from 'ng2-charts';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { PeriodData, PeriodEnum } from '../../../emuns/period.enum';
import { PaginateData } from '../../../models/paginate-data.model';
import { dataStatusEnum, StatusEnum } from '../../../models/status.enum';
import { PakageWifiDetail } from '../../../pakage-wifi/models/pakage-wifi-detail.model';
import { PakageWifiService } from '../../../pakage-wifi/services/pakage-wifi.service';
import { LanguageService } from '../../../services/language/language.service';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { WifiZoneDetail } from '../../../wifi-zones/models/wifi-zone-detail.model';
import { WifiZoneService } from '../../../wifi-zones/services/wifi-zone.service';
import { DashboardStatDetail } from '../../models/dashboard-stat-detail.model';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../../models/user.model';
import { userSearchId } from '../../../models/search-element.model';
import { UserService } from '../../../users/services/user.service';
import { dataGroupByEnum } from '../../../emuns/group-by.enum';


Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  @ViewChild('wifiChart') wifiChartRef!: ElementRef<HTMLCanvasElement>;
  @Input()ticketWifiId?:string
  @Input()pakageWifiId?:string
  @Input()zoneWifiId?:string
  @Input()user_id!:string
  url!:string;
  barChartData!: ChartConfiguration<'bar'>['data']
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    }
  };
  dashboard$!:Observable<DashboardStatDetail>;
      loading$!:Observable<boolean>;
      itemsPerPage: number = 2;
      paginateData$!:Observable<PaginateData>;
      paginateData!:PaginateData;
      totaElement=0;
      pageEvent!: PageEvent;
      pageArray:number[]=[]
      dataPeriod=PeriodData;
      isCustomPeriod=false;
      statForm!:FormGroup;
      wifiZones$!:Observable<WifiZoneDetail[]>;
      pakageWifis$!:Observable<PakageWifiDetail[]>;
      users$!:Observable<User[]>;
      userCtrl!:FormControl
      zoneWifiCtrl!:FormControl;
      pakageWifiCtrl!:FormControl;
      dataStatus=dataStatusEnum
      dataGroupBy=dataGroupByEnum
      periodCtrl!:FormControl;
      groupByCtrl!:FormControl;
      startCtrl!:FormControl;
      statusCtrl!:FormControl;
      endCtrl!:FormControl;
      statusEnumd=StatusEnum
      isAdmin=false;
      chart: any = [];
      itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
      page$ =new BehaviorSubject<number>(1);
      constructor(private languageService:LanguageService,private dashboardService:DashboardService,private modalService:NgbModal,private formBuilder:FormBuilder,private wifiZoneService:WifiZoneService,private pakageWifiService:PakageWifiService,private userService:UserService){}
      ngOnInit(): void {
        this.loading$=this.dashboardService.loading$;
        this.paginateData$=this.dashboardService.paginateData$
        this.paginateData$.subscribe(
          data=>{
            this.paginateData=data;
            this.totaElement=data.total??0
            this.changeChoiceItemPage()
            //this.itemsPerPage=data.per_page;
    
          }
        );

        console.log('ticket wifi ,')
        this.isAdmin=this.wifiZoneService.currentUser.is_admin==1;
        if(this.wifiZoneService.currentUser.is_admin){
          this.users$=this.userService.users$
          this.userService.getUsersFullFormServer();
        }
        this.wifiZones$=this.wifiZoneService.wifiZones$;
        this.pakageWifis$=this.pakageWifiService.pakageWifis$;
        this.wifiZoneService.getWifiZonesFullFormServer()

        this.dashboard$=this.dashboardService.dashboardStat$;
        
        this.periodCtrl=this.formBuilder.control('');
        this.groupByCtrl=this.formBuilder.control('');
        this.userCtrl=this.formBuilder.control(this.dashboardService.currentUser.id);
        this.startCtrl=this.formBuilder.control('');
        this.endCtrl=this.formBuilder.control('');
        this.zoneWifiCtrl=this.formBuilder.control('');
        this.pakageWifiCtrl=this.formBuilder.control('');
        this.statusCtrl=this.formBuilder.control('');
        this.user_id=this.dashboardService.currentUser.id;
        this.statForm=this.formBuilder.group({
          user_id:[this.user_id,Validators.required],
          zone_wifi:[this.zoneWifiId],
          pakage_wifi:[this.pakageWifiId],
          period:[null],
          group_by:[null],
          start_date:this.startCtrl,
          end_date:this.endCtrl,
        });
        this.dashboardService.getDashboardStatFormServer(this.statForm.value);
        this.initFilter()
        this.setStatistique();
      }
      setStatistique(){
        this.dashboard$.subscribe(
          stats=>{
            if(this.chart.length==undefined)
              this.chart.destroy()
          const labels = stats.stats.map(item => item.name);
  
          const ctx = this.wifiChartRef.nativeElement.getContext('2d');

    if (ctx) {
     this.chart= new Chart(ctx, {
        type: 'bar' as ChartType,
        data: {
          labels: stats.stats.map(s => s.name),
          datasets: [
            {
              label: 'success',
              data: stats.stats.map(s => +s.success),
              backgroundColor: '#35CE36'
            },
            {
              label: 'failed',
              data: stats.stats.map(s => +s.failed),
              backgroundColor: '#F25961'
            },
            {
              label: 'pending',
              data: stats.stats.map(s => +s.pending),
              backgroundColor: '#FFAD46'
            },
            {
              label: 'collected',
              data: stats.stats.map(s => +s.collected),
              backgroundColor: '#48ABF7'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true }
          }
        }
      });
    }
      })
    }
      getIconColor(status:StatusEnum):string{
        switch(status){
          case StatusEnum.SUCCESS:return 'icon-success'
          case StatusEnum.FAILED: return 'icon-danger'
          case StatusEnum.PENDING: return 'icon-warning'
          case StatusEnum.COLLECTED: return 'icon-info'
          default: return 'icon-secondary'
        }
      }
      initFilter(){
        this.periodCtrl.valueChanges.pipe(
          map(value => {
            if (this.periodCtrl.value && value == 'null') {
              console.log('test fermeture')
              this.periodCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.period = value
            if (this.periodCtrl.value && value) {
              if (value == PeriodEnum.CustomPeriod) {
                this.isCustomPeriod = true
              } else {
                this.isCustomPeriod = false;
                console.log(this.statForm.value)
                this.dashboardService.getDashboardStatFormServer(val,);
              }
    
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val,);
            }
          })
        ).subscribe()
        this.zoneWifiCtrl.valueChanges.pipe(
          map(value => {
            if (this.zoneWifiCtrl.value && value == 'null') {
              this.zoneWifiCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.zone_wifi = value
            if (this.zoneWifiCtrl.value && value) {
              this.dashboardService.getDashboardStatFormServer(val);
              this.pakageWifis$=this.wifiZoneService.getPakageWifisFormServer(value);
              this.pakageWifis$.subscribe();
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
        this.pakageWifiCtrl.valueChanges.pipe(
          map(value => {
            if (this.pakageWifiCtrl.value && value == 'null') {
              this.pakageWifiCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.pakage_wifi = value
            if (this.pakageWifiCtrl.value && value) {
              this.dashboardService.getDashboardStatFormServer(val);
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
        this.userCtrl.valueChanges.pipe(
          map(value => {
            if (this.userCtrl.value && value == 'null') {
              this.userCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.user_id = value
            if (this.userCtrl.value && value) {
              
              this.wifiZoneService.getWifiZonesFullFormServer([userSearchId(this.userCtrl.value)]);
              this.dashboardService.getDashboardStatFormServer(val);
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
        this.groupByCtrl.valueChanges.pipe(
          map(value => {
            if (this.groupByCtrl.value && value == 'null') {
              this.groupByCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.group_by = value
            if (this.groupByCtrl.value && value) {
              this.dashboardService.getDashboardStatFormServer(val);
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
        this.statusCtrl.valueChanges.pipe(
          map(value => {
            if (this.statusCtrl.value && value == 'null') {
              this.statusCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.status = value
            if (this.statusCtrl.value && value) {
              this.dashboardService.getDashboardStatFormServer(val);
            } else if (value == null) {
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
        this.startCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
    
            if (value && this.endCtrl.value) {
              const val = this.statForm.value
              val.start = value
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
    
        this.endCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
            if (value && this.startCtrl.value) {
              const val = this.statForm.value
              val.end = value
              this.dashboardService.getDashboardStatFormServer(val);
    
            }
          })
        ).subscribe()
      }

      pageChange(event:PageEvent):PageEvent {
        //if(event.pageSize!=this.itemsPerPage){}
        //this.itemsPerPage=event.pageSize;
        //this.itemsPerPage$.next(this.itemsPerPage)
        this.paginateData.current_page=event.pageIndex+1
        this.paginateData.per_page=event.pageSize;
        this.dashboardService.getDashboardStatFormServer(this.statForm.value)
        console.log(this.paginateData)
        return event;
      }
      initPaginator(){
        this.page$.subscribe(
          (pages)=>{
            
          }
        )
        this.itemsPerPage$.subscribe(
          (items)=>{
    
          }
        )
      }
      changeChoiceItemPage(){
        let arr:number[]=[];
        console.log(this.pageArray)
        if(this.totaElement<=2)
        {
          console.log('total',this.totaElement)
          arr.push(this.totaElement)
      
        }else{
          for(let i=1;i<this.totaElement/2;i++)
            {
              arr.push(i*2)
            }
            if(this.totaElement%2>0){
              arr.push(this.totaElement)
            }
        }
        console.log(arr);
        this.pageArray=arr;
      }
    
}
