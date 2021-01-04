import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EntityService} from '../framework/entity.service';
import {HttpService} from '../framework/http.service';

declare var jQuery: any; 
enableProdMode();
@Component({
    selector : 'customer',
    template : `
    <div class="container">
        <div class="row" *ngFor="let obj of orderList">
            <div class="col-md-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Order ID:
                                    </div>
                                    <div class="col-md-4">
                                    <a style="color:blue;" (click) = "readOrderById(obj.id)"> {{obj.id}} </a>
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Order No:
                                    </div>
                                    <div class="col-md-4">
                                        {{obj.orderno}}
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Order Date:
                                    </div>
                                    <div class="col-md-4">
                                        {{obj.orderDate}}
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-2">
                                        Status:
                                    </div>
                                    <div class="col-md-4">
                                        {{obj.status}}
                                    </div>
                                </div>
                            </div>
                        <div>
                    </div>
                    <div class="card-body">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order Item ID</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let order of obj.orderitems, let i=index" class="table-hover" >
                                <td> {{order.id}}</td>
                                <td>{{order.quantity}}</td>
                                <td>{{order.total}}</td>
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
     `
})
export class OrderListComponent{
    orderList: any;

    constructor(private entity :EntityService,private http :HttpService,private router :Router,private route: ActivatedRoute){
        this.getOrderList();
    }

    showloading(type) {
        if (type === true) {this.entity.sendBean({t1: 'custom-loading'}); }
        if (type === false) {this.entity.sendBean({t1: 'custom-loading-off'}); }
    }

    getOrderList(){
        let url: string = this.entity.apiurl+'/order';
        this.showloading(true);
        this.http.doGet(url).subscribe(
            (data) => {
                this.orderList  = data.json();
                this.showloading(false);
                console.log(data);
            },
            (error) =>{
                this.showloading(false);
                console.log(error);
            }
        )
    }

    readOrderById(id){
        this.router.navigate(['/order','readId',id]);
    }

}