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
                    <div class="form-group row col-md-8">
                        <button class="btn btn-primary" type="button" (click)="goBack()" >Go Back</button>
                    </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">PhoneNo</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let obj of _obj" class="table-hover" >
                            <td style="color:#0000ff;"><a  (click) = "readCustomerById(obj.id)"> {{obj.id}} </a></td>
                            <td>{{obj.name}}</td>
                            <td>{{obj.email}}</td>
                            <td>{{obj.phone}}</td>
                            <td>{{obj.address}}</td>
                        <tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
}
)
export class CustomerListComponent{
    _obj:any;
    constructor(private entity :EntityService,private http :HttpService,private router :Router){
        this.getCustomerData();
    }

    showloading(type) {
        if (type === true) {this.entity.sendBean({t1: 'custom-loading'}); }
        if (type === false) {this.entity.sendBean({t1: 'custom-loading-off'}); }
    }

    getCustomerData(){
        let url: string = this.entity.apiurl+"/customer";
        this.showloading(true);
        this.http.doGet(url).subscribe(
            (data) => {
                this.showloading(false);
                this._obj = data.json();
                console.log(data);
            },
            (error) =>{
                this.showloading(false);
                console.log(error);
            }
        )
    }
    readCustomerById(i){
        this.router.navigate(['/customers','read',i])
    }

    goBack(){
        this.router.navigate(['customers']);
    }

    ngOnint(){

    }
}