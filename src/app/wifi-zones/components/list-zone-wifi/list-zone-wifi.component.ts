import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WifiZoneDetail } from '../../models/wifi-zone-detail.model';
import { WifiZoneService } from '../../services/wifi-zone.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginateData } from '../../../models/paginate-data.model';
import { CreateWifiZoneComponent } from '../create-wifi-zone/create-wifi-zone.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../../../services/language/language.service';
import { environment } from '../../../../environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-zone-wifi',
  templateUrl: './list-zone-wifi.component.html',
  styleUrl: './list-zone-wifi.component.css'
})
export class ListZoneWifiComponent implements OnInit{
  wifiZones$!:Observable<WifiZoneDetail[]>;
  loading$!:Observable<boolean>;
  itemsPerPage: number = 2;
  paginateData$!:Observable<PaginateData>;
  paginateData!:PaginateData;
  totaElement=0;
  pageEvent!: PageEvent;
  pageArray:number[]=[]
  itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
  page$ =new BehaviorSubject<number>(1);
  constructor(private languageService:LanguageService,private wifiZoneService:WifiZoneService,private modalService:NgbModal,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.loading$=this.wifiZoneService.loading$;
    this.paginateData$=this.wifiZoneService.paginateData$
    this.paginateData$.subscribe(
      data=>{
        this.paginateData=data;
        this.totaElement=data.total??0
        this.changeChoiceItemPage()
        //this.itemsPerPage=data.per_page;

      }
    );
    this.wifiZones$=this.wifiZoneService.wifiZones$;
    this.wifiZoneService.getWifiZonesFormServer({current_page:1,per_page:this.itemsPerPage});
  }
  createWifiZone() {
    const modalRef =this.modalService.open(CreateWifiZoneComponent,{
      centered:true,
      backdrop:'static',
    });
    var reloadPgae:Observable<boolean>;
    reloadPgae=modalRef.componentInstance.realod;
    reloadPgae.subscribe(
      (b)=>{
        if(b){
          this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
        }
      }
    )
  }
  uploadWifiTarif(wifiZone:WifiZoneDetail){
    let pakages=this.wifiZoneService.getPakageWifisFormServer(wifiZone.id)
    pakages.subscribe(
      data=>{
        
        console.log(data)
        let trs='';
        if(data.length>0){
          data.forEach((pak)=>{
            trs+=` <tr>
            <td data-label="Forfait">${pak.designation}</td>
            <td data-label="Prix">${pak.price}</td>
            <td data-label="Action"><button class="btn-pay" id="https://ad47-154-72-170-161.ngrok-free.app/api/payement-gateway/${pak.id}/init-buy-ticket">Payer</button></td>
          </tr>`
          });
          console.log(trs);
          let dataDownload=`<style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .open-btn {
      margin: 100px auto;
      display: block;
      padding: 10px 20px;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    .modal {
      display: none; /* cachée par défaut */
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
    }

    .modal.active {
      display: flex;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      position: relative;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .modal-content h2 {
      margin-bottom: 1rem;
    }

    .modal-content input[type="tel"] {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      margin-bottom: 1rem;
    }

    .modal-content button {
      width: 100%;
      padding: 10px;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 1px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }
    /**/

    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.8rem;
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
    }

    th, td {
      text-align: center;
      padding: 15px;
      border: 1px solid #ddd;
    }

    th {
      background-color: #007bff;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    .btn-pay {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-pay:hover {
      background-color: #218838;
    }

    /* Styles responsives pour les petits écrans */
    @media (max-width: 600px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead tr {
        display: none;
      }

      tbody tr {
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
      }

      td {
        text-align: right;
        padding-left: 50%;
        position: relative;
      }

      td::before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        font-weight: bold;
        text-align: left;
      }

      .btn-pay {
        padding: 8px 15px;
        font-size: 0.9rem;
      }

      h1 {
        font-size: 1.5rem;
      }
    }
      .loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  display: none; /* cacher par défaut */
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  <div class="modal" id="modal">
    <div class="modal-content">
      <button class="close-btn" id="closeModal">&times;</button>
      <div id="loader" class="loader"></div>
      <h2>Numéro de téléphone</h2>
      <form id="phoneForm">
        <input name="id_url" hidden>
        <input type="tel" name="phone" placeholder="Ex: +237 6XX XXX XXX" required>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
  <div class="container">
    
    <h1>Nos Forfaits</h1>
    <table>
      <thead>
        <tr>
          <th>Forfait</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      ${trs}
      </tbody>
    </table>
    <script>
       //  const modal = document.getElementById('modal');
       const params = new URLSearchParams(window.location.search);

// Extraire les variables
const tusername = params.get('username');
const tpassword = params.get('password');
if(tusername&&tpassword){
  document.sendin.username.value =tusername;
		document.sendin.password.value = hexMD5('$(chap-id)'+tpassword +'$(chap-challenge)');
		document.sendin.submit();
}

console.log("Nom d'utilisateur :", tusername);
console.log("Mot de passe :", tpassword);
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    const phoneForm=document.getElementById('phoneForm');
   let urlt= document.getElementsByName('id_url')[0];
   console.log('urlt : ',urlt)
   //urlt.value='un monde de merde';
   //.log('urlt : ',urlt.value)
   /* openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });*/

    closeBtn.addEventListener('click', () => {
    document.getElementById("loader").style.display = "none";
      modal.classList.remove('active');
    });

    // Optionnel : fermer en cliquant à l'extérieur de la boîte
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Exemple de traitement du formulaire
    document.getElementById('phoneForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const phone = this.phone.value;
      console.log('urlt : ',urlt.value)
      fetch(urlt.value,{
                method:"POST",
                body: JSON.stringify({ numero: phone }),
                headers: myHeaders,
               })
               .then(response => response.json())
               .then((data)=>{
                console.log(data)
                //payement_link
                if(data.success){
                console.log(data.success)
                  window.location.href = data.data['payement_link']
                }else{
                alert(data.message)
              }
               }).catch(err =>{
                alert(err.message)
                })
      
      console.log("Numéro soumis :", phone);
      //modal.classList.remove('active');
      //alert("Numéro envoyé : " + phone);
    });
        const btns=document.querySelectorAll(".btn-pay");
        //let formData=
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
        btns.forEach((elt)=>{
            //console.log(elt)
            elt.addEventListener('click',(e)=>{
                modal.classList.add('active');
                urlt.value=elt.id
                console.log(elt.id)
            
            })
        })
    </script>
  </div>`;
  const blob = new Blob([dataDownload], { type: 'text/plain' });

            // Création d'un lien de téléchargement
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'mon_fichier.txt'; // Nom du fichier

            // Simulation d'un clic pour télécharger
            link.click();

            // Libération de l'URL du blob
            URL.revokeObjectURL(link.href);
        }else{
          let config = new MatSnackBarConfig();
                config.duration=9000;
                config.panelClass=['red-snackbar']
                this.snackBar.open(
                  "La zone wifi ne posede pas de tarifs ayant des tickets Wifi actifs",
                  "Close",
                  config
                );
        }
        
      }
    )
  }
  updateWifiZone(wifiZone:WifiZoneDetail) {
    const modalRef =this.modalService.open(CreateWifiZoneComponent,{
      centered:true,
      backdrop:'static',
    });
    var reloadPgae:Observable<boolean>;
    reloadPgae=modalRef.componentInstance.realod;
    modalRef.componentInstance.typeOperation='update'
    modalRef.componentInstance.wifi_zone_id=wifiZone.id;
    reloadPgae.subscribe(
      (b)=>{
        if(b){
          this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
        }
      }
    )
  }
  deleteWifiZone(wifiZone:WifiZoneDetail){
    this.wifiZoneService.deleteWifiZone(wifiZone.id);
  }
  pageChange(event:PageEvent):PageEvent {
    //if(event.pageSize!=this.itemsPerPage){}
    //this.itemsPerPage=event.pageSize;
    //this.itemsPerPage$.next(this.itemsPerPage)
    this.paginateData.current_page=event.pageIndex+1
    this.paginateData.per_page=event.pageSize;
    this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
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
