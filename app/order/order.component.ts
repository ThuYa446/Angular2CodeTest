import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EntityService} from '../framework/entity.service';
import {HttpService} from '../framework/http.service';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';

declare var jQuery: any; 
enableProdMode();
@Component({
    selector : 'customer',
    template : ` 
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row" style="margin-bottom:20px;" *ngIf="showSave">
                                    <div class="col-md-2">
                                        Customer ID:
                                    </div>
                                    <div class="col-md-4">
                                        {{order.customerId}}
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;" *ngIf="showSave">
                                    <div class="col-md-2">
                                        Customer Name:
                                    </div>
                                    <div class="col-md-4">
                                        {{order.customer.name}}
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;" *ngIf="showRead">
                                    <div class="col-md-2">
                                        Order ID:
                                    </div>
                                    <div class="col-md-4">
                                        {{order.id}}
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Order No:
                                    </div>
                                    <div class="col-md-4">
                                        <input class="form-control" type="text" [(ngModel)]="order.orderno" required [ngModelOptions]="{standalone: true}">
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Order Date:
                                    </div>
                                    <div class="col-md-4">
                                        <input class="form-control" type="date" [(ngModel)]="order.orderDate" required [ngModelOptions]="{standalone: true}">
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Status:
                                    </div>
                                    <div class="col-md-4">
                                        <input class="form-control" type="text" [(ngModel)]="order.status" required [ngModelOptions]="{standalone: true}">
                                    </div>
                                </div>
                                <button class="btn btn-primary" type="button" (click)="goSave()">Save</button>
                                <button class="btn btn-primary" type="button" (click)="goUpdate()" >Update</button> 
                                <button class="btn btn-danger" type="button" (click)="goDelete()">Delete</button>
                                <button class="btn btn-primary" type="button" (click)="goList()">List</button>
                            </div>
                        <div>
                    </div>
                    <div class="card-body">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Product ID</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let obj of obj, let i=index" class="table-hover" >
                                <td> <button type="button" class="btn btn-success btn-sm" (click)="addNewOrder()"><i class="fas fa-plus" ></i></button></td>
                                <td><input class="form-control" type="text" [(ngModel)]="obj.quantity" [ngModelOptions]="{standalone: true}"></td>
                                <td><input class="form-control" type="text" [(ngModel)]="obj.total" [ngModelOptions]="{standalone: true}" readOnly="true"></td>
                                <td>
                                    <select class="form-control" [(ngModel)]="obj.proudctId" [ngModelOptions]="{standalone: true}" (ngModelChange)="calculateTotalAmt(obj.quantity,obj.proudctId,i)">
                                        <option *ngFor="let product of productList" value="{{product.id}}">{{product.name}}</option>
                                    </select>
                                </td>
                                <td> <button type="button" class="btn btn-danger btn-sm" (click)="removeOrder(i)" [disabled]="i==0"><i class="fas fa-minus" ></i></button> </td>
                            <tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="card-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <input class="form-control" type="text" (ngModel)="order.proudctId"  [ngModelOptions]="{standalone: true}"> -->
    `,


})
export class OrderComponent{
    subscription: Subscription;
    order: any = this.getDefaultObj();
    obj: any = this.order.orderItems;
    customerName = "";
    productList: any;
    showSave: boolean = true;
    showRead: boolean = false;
    pipe = new DatePipe('en-US');
    constructor(private entity :EntityService,private http :HttpService,private router :Router,private route: ActivatedRoute){
        this.getProductIdList();
        this.subscription = this.route.params.subscribe(params => {
            let cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                let id = params['id'];
                this.order.customerId = id;
                this.getCustomerNameById(id);
            }
            if(cmd != null && cmd != "" && cmd == "readId") {
                let id = params['id'];
                this.order.id = id;
                this.readOrderById(id);
            }
        })
    }

    addNewOrder(obj){
        this.order.orderItems.push({"id": 0,"quantity": 0,"total": 0,"productId": 0});
    }

    removeOrder(i){
        this.order.orderItems.splice(i,1);
    }

    showloading(type) {
        if (type === true) {this.entity.sendBean({t1: 'custom-loading'}); }
        if (type === false) {this.entity.sendBean({t1: 'custom-loading-off'}); }
    }

    getProductIdList(){
        let url: string = this.entity.apiurl+'/product';
            this.showloading(true);
            this.http.doGet(url).subscribe(
                (data) => {
                    this.productList  = data.json();
                    this.showloading(false);
                    console.log(data);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
            )
    }
    calculateTotalAmt(quantity,productId,index){
      for(let i=0;i<this.obj.length;i++){
          if(i=== index){
              this.obj[i].total = quantity * this.getUnitPrice(productId);
          }
      }
    }

    getUnitPrice(id){
        var obj = this.productList.find(x => x.id == id);
        return obj.unitPrice;
    }

    getCustomerNameById(id){
        let url: string = this.entity.apiurl+'/customer/'+id;
            this.showloading(true);
            this.http.doGet(url).subscribe(
                (data) => {
                    let customerObj  = data.json();
                    this.order.customer = customerObj;
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
        let url: string = this.entity.apiurl+'/order';
        this.showloading(true);
        this.http.doPost(url,this.order).subscribe(
            (data) => {
                this.showloading(false);
            },
            (error) => {
                this.showloading(false);
            }
        )
    }

    goList(){
        this.router.navigate(['/orderList'])
    }

    readOrderById(id){
        let url: string = this.entity.apiurl+'/order/'+id;
            this.showloading(true);
            this.order = this.getDefaultObj();
            this.http.doGet(url).subscribe(
                (data) => {
                    this.order = data.json();
                    this.order.orderDate = this.pipe.transform(this.order.orderDate, 'MM/dd/yyyy');
                    this.obj = this.order.orderitems;
                    this.showSave = false;
                    this.showRead = true;
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
        let url: string = this.entity.apiurl+'/order';
        this.showloading(true);
        this.http.doPut(url,this.order).subscribe(
            (data) => {
                this.showloading(false);
            },
            (error) => {
                this.showloading(false);
                console.log(error);
            }
        )
    }

    goDelete(){
        let url: string = this.entity.apiurl+'/order/'+this.order.id;
            this.showloading(true);
            this.order = this.getDefaultObj();
            this.http.doDelete(url).subscribe(
                (data) => {
                    this.showloading(false);
                    this.router.navigate(['/orderList']);
                },
                (error) =>{
                    this.showloading(false);
                    console.log(error);
                }
        )
    }

    ngOnInit(){
        
    }

    getDefaultObj(){
        return {
            "id": 0,
            "orderno": 0,
            "orderDate": Date(),
            "status": "",
            "customer": {
                "id": 0,
                "name": "",
                "email": "",
                "phone": "",
                "address": ""
            },
            "orderItems": [
                {
                "id": 0,
                "quantity": 0,
                "total": 0,
                "proudctId": 0
                }
            ]
        };
    }
}