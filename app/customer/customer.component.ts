import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EntityService} from '../framework/entity.service';
import {HttpService} from '../framework/http.service';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery: any; 
enableProdMode();
@Component({
    selector : 'customer',
    template : `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <form class= "form-horizontal"> 
                  <legend>Customer</legend> 
                    <div class="form-group row col-md-8">
                        <button class="btn btn-primary" type="button" (click)="goNew()" [disabled]="btn_new">Add New Customer</button>
                        <button class="btn btn-primary" type="button" (click)="goSave()" [disabled]="btn_save">Save</button>
                        <button class="btn btn-primary" type="button" (click)="goUpdate()" [disabled]="btn_update">Update</button> 
                        <button class="btn btn-danger" type="button" (click)="goDelete()" [disabled]="btn_delete">Delete</button>
                        <button class="btn btn-primary" type="button" (click)="goList()">List</button>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           Customer Name:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="_obj.name" required [ngModelOptions]="{standalone: true}">
                        </div> 
                    </div>

                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           E-mail:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="_obj.email" required [ngModelOptions]="{standalone: true}" >
                        </div> 
                    </div>

                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           Phone:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="_obj.phone" required [ngModelOptions]="{standalone: true}">
                        </div> 
                    </div>
                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           Address:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="_obj.address" required [ngModelOptions]="{standalone: true}" >
                        </div> 
                    </div>
                  </form>
                </div>
            </div>
        </div>
    `
}
)
export class CustomerComponent{
    subscription: Subscription;
    _obj:any = this.customerObj();
    btn_save:boolean = false;
    btn_update:boolean = false;
    btn_new:boolean = false;
    btn_delete:boolean = false;
    constructor(private entity :EntityService,private http :HttpService,private router :Router,private route: ActivatedRoute){
        this.subscription = this.route.params.subscribe(params => {
            let cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                let id = params['id'];
                this.getCustomerById(id);
                this.btn_save = true;
            }
        })
    }

    customerObj(){
        return {"id":0,"name":"","email":"","phone":"","address":""}
    }

    showCustomMsg(msg, type) {
        if ( type === true) {this.entity.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
        if ( type === false) {this.entity.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
        if ( type === undefined) {this.entity.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
        if ( type === null) {this.entity.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
    }

    showloading(type) {
        if (type === true) {this.entity.sendBean({t1: 'custom-loading'}); }
        if (type === false) {this.entity.sendBean({t1: 'custom-loading-off'}); }
    }

    validation(){
        let flag:boolean = true;
        let message: string = "";
        if(this._obj.name === '' || this._obj.name === null || this._obj.name === undefined ){
            message = "Please Enter Your Name";
        }else
        if(this._obj.email === '' || this._obj.email === null || this._obj.email === undefined ){
            message = "Please Enter Your E-mail";
        }else
        if(this._obj.phone === '' || this._obj.phone === null || this._obj.phone === undefined ){
            message = "Please Enter Your Phone";
        }else
        if(this._obj.address === '' || this._obj.address === null || this._obj.address === undefined ){
            message = "Please Enter Your Address";
        }
        if(message != "" ){
            this.showCustomMsg(message,undefined);
            flag = false;
        }
       return flag;
    }

    goSave(){
        if(this.validation()){
            let url: string = this.entity.apiurl+"/customer";
            this.showloading(true);
            this.http.doPost(url,this._obj).subscribe(
                (data) => {
                    this.showloading(false);
                    console.log(data);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
            )
        }
    }
    getCustomerById(id){
        let url: string = this.entity.apiurl+'/customer/'+id;
            this.showloading(true);
            this.http.doGet(url).subscribe(
                (data) => {
                    this._obj  = data.json();
                    this.showloading(false);
                    console.log(data);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
            )
    }

    goUpdate(){
        if(this.validation()){
            let url: string = this.entity.apiurl+"/customer";
            this.showloading(true);
            this.http.doPut(url,this._obj).subscribe(
                (data) => {
                    this.showloading(false);
                    console.log(data);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
            )
        }
    }

    goDelete(){
        let url: string = this.entity.apiurl+'/customer/'+this._obj.id;
        this.showloading(true);
        this.http.doDelete(url).subscribe(
            (data) => {
                this.showloading(false);
                this.goNew();
                console.log(data);
            },
            (error) =>{
                this.showloading(false);
                console.log(error);
            }
        )
    }

    goList(){
        this.router.navigate(['/customerslist']);
    }

    goNew(){
        this._obj = this.customerObj();
        this.btn_save = false;
        this.btn_update = true;
        this.btn_delete = true;
        this.router.navigate(['/customers'])
    }
}