"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var entity_service_1 = require('../framework/entity.service');
var http_service_1 = require('../framework/http.service');
core_2.enableProdMode();
var CustomerListComponent = (function () {
    function CustomerListComponent(entity, http, router) {
        this.entity = entity;
        this.http = http;
        this.router = router;
        this.getCustomerData();
    }
    CustomerListComponent.prototype.showloading = function (type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-loading' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-loading-off' });
        }
    };
    CustomerListComponent.prototype.getCustomerData = function () {
        var _this = this;
        var url = this.entity.apiurl + "/customer";
        this.showloading(true);
        this.http.doGet(url).subscribe(function (data) {
            _this.showloading(false);
            _this._obj = data.json();
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    CustomerListComponent.prototype.readCustomerById = function (i) {
        this.router.navigate(['/customers', 'read', i]);
    };
    CustomerListComponent.prototype.goBack = function () {
        this.router.navigate(['customers']);
    };
    CustomerListComponent.prototype.ngOnint = function () {
    };
    CustomerListComponent = __decorate([
        core_1.Component({
            selector: 'customer',
            template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                    <div class=\"form-group row col-md-8\">\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goBack()\" >Go Back</button>\n                    </div>\n                <table class=\"table table-striped table-hover\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Customer ID</th>\n                            <th scope=\"col\">Name</th>\n                            <th scope=\"col\">E-mail</th>\n                            <th scope=\"col\">PhoneNo</th>\n                            <th scope=\"col\">Address</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let obj of _obj\" class=\"table-hover\" >\n                            <td style=\"color:#0000ff;\"><a  (click) = \"readCustomerById(obj.id)\"> {{obj.id}} </a></td>\n                            <td>{{obj.name}}</td>\n                            <td>{{obj.email}}</td>\n                            <td>{{obj.phone}}</td>\n                            <td>{{obj.address}}</td>\n                        <tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, router_1.Router])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
exports.CustomerListComponent = CustomerListComponent;
//# sourceMappingURL=customerList.component.js.map