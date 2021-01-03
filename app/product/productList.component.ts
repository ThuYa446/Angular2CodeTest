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
        <div class="row">
            <div class="col-md-12">
                    <div class="form-group row col-md-8">
                        <button class="btn btn-primary" type="button" (click)="goBack()" >Go Back</button>
                    </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let obj of productList" class="table-hover" >
                            <td style="color:#0000ff;"><a  (click) = "readProductById(obj.id)"> {{obj.id}} </a></td>
                            <td>{{obj.name}}</td>
                            <td>{{obj.unitPrice}}</td>
                        <tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
})
export class ProductListComponent{
    productList:any;

    constructor(private entity :EntityService,private http :HttpService,private router :Router){
        this.getProductDataList();
    }

    showloading(type) {
        if (type === true) {this.entity.sendBean({t1: 'custom-loading'}); }
        if (type === false) {this.entity.sendBean({t1: 'custom-loading-off'}); }
    }

    readProductById(id){
        this.router.navigate(['/product','read',id])
    }

    goBack(){
        this.router.navigate(['/product']);
    }

    getProductDataList(){
        let url: string = this.entity.apiurl+"/product";
        this.showloading(true);
        this.http.doGet(url).subscribe(
            (data) => {
                this.showloading(false);
                this.productList = data.json();
                console.log(data);
            },
            (error) =>{
                this.showloading(false);
                console.log(error);
            }
        )
    }
}