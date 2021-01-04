import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EntityService} from './framework/entity.service';
import {HttpService} from './framework/http.service';
import { isContext } from 'vm';

declare var jQuery: any; 
enableProdMode();
@Component({
    selector : 'app-root',
    template : `
    <div class='modal' [hidden]='mflag' id="loading">
        <div class="loader"></div>
    </div> 

    <!-- Tab Start -->
  <div class="container mt-3">
    <ul class="nav nav-pills mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link" [class.active]="linkCustomer"(click)="customerRole()">Customer</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" [class.active]="linkProduct" (click)="productRole()">Product</a>
      </li>
    </ul>
  </div>
<!-- Tab End -->
    <router-outlet></router-outlet>
    <div id="customMsgPopup" class="modal fade clearfix" role="dialog"  aria-labelledby="exampleModalLabel"
    aria-hidden="true" tabindex="-1">
      <div id="customMsgPopupSize" class="modal-dialog modal-lg" style="width:30%;" role="document">  
        <div class="modal-content">
          <div class="modal-header" [class.info-color]='_snack.type=="Information"' 
                                    [class.danger-color]='_snack.type=="Error"'  
                                    [class.warning-color]='_snack.type=="Warning"'
                                    [class.success-color]='_snack.type=="Success"'>
            
            <h4 class="modal-title w-100 font-weight-bold white-text">{{_snack.type}}</h4>
            <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="rootpopupbodytest" class="modal-body" >
            <strong style="font-size:20px; font-family:sans-serif;">{{_snack.msg}}</strong>
          </div>
          <div class="modal-footer" >
            <button type="button" class="btn btn-primary waves-effect" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
})
export class AppRootComponent implements OnInit{
   _mflag:boolean = false;
   linkCustomer = false;
   linkProduct = false;
    _snack = { 'flag': true, 'msg': '', type: '' };
        constructor(private entity :EntityService,private http :HttpService,private title :Title,private router :Router){
            entity.rpbean$.subscribe(
              x =>{
                if (x.t1 != null && x.t1 === 'custom-loading-off') {
                  this._mflag = true;
                  jQuery('#loading').modal('hide');
                }else
                if (x.t1 != null && x.t1 === 'custom-loading') {
                  this._mflag = false;
                  jQuery('#loading').modal({backdrop: 'static'});
                }else if(x.t1 != null && x.t1 == 'custom-msg'){
                  this._snack = {'flag':false ,'msg':x.t2 ,'type':x.t3};
                  jQuery('#customMsgPopupSize').attr('class','modal-dialog modal-lg');
                  jQuery('#customMsgPopup').modal();
                }else if(x.t1 != null && x.t1 == 'custom-msg-off'){
                  this._snack = {'flag':true ,'msg': '' ,'type':''};
                  jQuery('#customMsgPopup').modal('hide');
                }
              }
            );
            this.init();
        }

    init(){
        this.http.doGet('json/config.json').subscribe(
            data => {
                let json = data.json();
                this.entity.appname = json.appname;
                this.entity.title = json.title;
                this.title.setTitle(this.entity.title);
                this.entity.apiurl = json.apiurl;
            },
            (error)=>{window.alert(error.type)}
        );   
    }

    ngOnInit(){
      this.router.navigate(['/customers']);
    }

    customerRole(){
      this.router.navigate(['/customers']);
      this.linkCustomer = true;
      this.linkProduct = false;
    }

    productRole(){
      this.router.navigate(['/product']);
      this.linkProduct = true;
      this.linkCustomer = false;
    }

    // goClick(){
    //   this.entity.sendBean({t1:'custom-loading'});
    //   this.entity.sendBean({t1:"custom-msg",t2:"Hello World!",t3:"Success"})
    // }
}