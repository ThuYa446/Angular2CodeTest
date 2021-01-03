import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EntityService} from '../framework/entity.service';
import {HttpService} from '../framework/http.service';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery: any; 
enableProdMode();
@Component({
    selector : 'product',
    template : ` 
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <form class= "form-horizontal"> 
                  <legend>Product</legend> 
                    <div class="form-group row col-md-8">
                        <button class="btn btn-primary" type="button" (click)="goNew()" [disabled]="btn_new">Add New Product</button>
                        <button class="btn btn-primary" type="button" (click)="goSave()" [disabled]="btn_save">Save</button>
                        <button class="btn btn-primary" type="button" (click)="goUpdate()" [disabled]="btn_update">Update</button> 
                        <button class="btn btn-danger" type="button" (click)="goDelete()" [disabled]="btn_delete">Delete</button>
                        <button class="btn btn-primary" type="button" (click)="goList()">List</button>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           Product Name:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="product.name" required [ngModelOptions]="{standalone: true}">
                        </div> 
                    </div>

                    <div class="form-group">
                        <div class="col-md-4" style="font-weight:bold; margin-top:2px">
                           Unit Price:
                        </div>
                    
                        <div class="col-md-8">
                            <input class="form-control" type="text" [(ngModel)]="product.unitPrice" required [ngModelOptions]="{standalone: true}" >
                        </div> 
                    </div>
                  </form>
                </div>
            </div>
        </div>
     `,
})
export class ProductComponent{

    subscription: Subscription;
    product: any = this.getDefaultObj();

    btn_save:boolean = false;
    btn_update:boolean = false;
    btn_new:boolean = false;
    btn_delete:boolean = false;
    constructor(private entity :EntityService,private http :HttpService,private router :Router,private route: ActivatedRoute){
        this.subscription = this.route.params.subscribe(params => {
            let cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                let id = params['id'];
                this.getProductById(id);
                this.btn_save = true;
            }
        })
    }

    getDefaultObj(){
        return {"id":0,"name":"","unitPrice":0}
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
        if(this.product.name === '' || this.product.name === null || this.product.name === undefined ){
            message = "Please Enter Product Name";
        }else
        if(this.product.unitPrice === 0 || this.product.unitPrice === null || this.product.unitPrice === undefined ){
            message = "Please Enter Unit Price";
        }
        if(message != "" ){
            this.showCustomMsg(message,undefined);
            flag = false;
        }
       return flag;
    }

    getProductById(id){
        let url: string = this.entity.apiurl+'/product/'+id;
            this.showloading(true);
            this.http.doGet(url).subscribe(
                (data) => {
                    this.product  = data.json();
                    this.showloading(false);
                    console.log(data);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
            )
    }

    goSave(){
        if(this.validation()){
            let url: string = this.entity.apiurl+"/product";
            this.showloading(true);
            this.http.doPost(url,this.product).subscribe(
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

    goUpdate(){
        if(this.validation()){
            let url: string = this.entity.apiurl+"/product";
            this.showloading(true);
            this.http.doPut(url,this.product).subscribe(
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
        let url: string = this.entity.apiurl+'/product/'+this.product.id;
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
        this.router.navigate(['/productList']);
    }

    goNew(){
        this.product = this.getDefaultObj();
        this.btn_save = false;
        this.btn_update = true;
        this.btn_delete = true;
        this.router.navigate(['/product'])
    }
}