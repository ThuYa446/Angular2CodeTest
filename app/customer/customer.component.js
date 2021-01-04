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
var CustomerComponent = (function () {
    function CustomerComponent(entity, http, router, route) {
        var _this = this;
        this.entity = entity;
        this.http = http;
        this.router = router;
        this.route = route;
        this._obj = this.customerObj();
        this.btn_save = false;
        this.btn_update = false;
        this.btn_new = false;
        this.btn_delete = false;
        this.subscription = this.route.params.subscribe(function (params) {
            var cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                var id = params['id'];
                _this.getCustomerById(id);
                _this.btn_save = true;
            }
        });
    }
    CustomerComponent.prototype.customerObj = function () {
        return { "id": 0, "name": "", "email": "", "phone": "", "address": "" };
    };
    CustomerComponent.prototype.showCustomMsg = function (msg, type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Information' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Error' });
        }
        if (type === undefined) {
            this.entity.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Warning' });
        }
        if (type === null) {
            this.entity.sendBean({ t1: 'custom-msg', t2: msg, t3: 'Success' });
        }
    };
    CustomerComponent.prototype.showloading = function (type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-loading' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-loading-off' });
        }
    };
    CustomerComponent.prototype.validation = function () {
        var flag = true;
        var message = "";
        if (this._obj.name === '' || this._obj.name === null || this._obj.name === undefined) {
            message = "Please Enter Your Name";
        }
        else if (this._obj.email === '' || this._obj.email === null || this._obj.email === undefined) {
            message = "Please Enter Your E-mail";
        }
        else if (this._obj.phone === '' || this._obj.phone === null || this._obj.phone === undefined) {
            message = "Please Enter Your Phone";
        }
        else if (this._obj.address === '' || this._obj.address === null || this._obj.address === undefined) {
            message = "Please Enter Your Address";
        }
        if (message != "") {
            this.showCustomMsg(message, undefined);
            flag = false;
        }
        return flag;
    };
    CustomerComponent.prototype.goSave = function () {
        var _this = this;
        if (this.validation()) {
            var url = this.entity.apiurl + "/customer";
            this.showloading(true);
            this.http.doPost(url, this._obj).subscribe(function (data) {
                _this.showloading(false);
                console.log(data);
            }, function (error) {
                _this.showloading(false);
                console.log(error);
            });
        }
    };
    CustomerComponent.prototype.getCustomerById = function (id) {
        var _this = this;
        var url = this.entity.apiurl + '/customer/' + id;
        this.showloading(true);
        this.http.doGet(url).subscribe(function (data) {
            _this._obj = data.json();
            _this.showloading(false);
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    CustomerComponent.prototype.goUpdate = function () {
        var _this = this;
        if (this.validation()) {
            var url = this.entity.apiurl + "/customer";
            this.showloading(true);
            this.http.doPut(url, this._obj).subscribe(function (data) {
                _this.showloading(false);
                console.log(data);
            }, function (error) {
                _this.showloading(false);
                console.log(error);
            });
        }
    };
    CustomerComponent.prototype.goDelete = function () {
        var _this = this;
        var url = this.entity.apiurl + '/customer/' + this._obj.id;
        this.showloading(true);
        this.http.doDelete(url).subscribe(function (data) {
            _this.showloading(false);
            _this.goNew();
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    CustomerComponent.prototype.goList = function () {
        this.router.navigate(['/customerslist']);
    };
    CustomerComponent.prototype.goNew = function () {
        this._obj = this.customerObj();
        this.btn_save = false;
        this.btn_update = true;
        this.btn_delete = true;
        this.router.navigate(['/customers']);
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'customer',
            template: "\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <form class= \"form-horizontal\"> \n                  <legend>Customer</legend> \n                    <div class=\"form-group row col-md-8\">\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goNew()\" [disabled]=\"btn_new\">Add New Customer</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goSave()\" [disabled]=\"btn_save\">Save</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goUpdate()\" [disabled]=\"btn_update\">Update</button> \n                        <button class=\"btn btn-danger\" type=\"button\" (click)=\"goDelete()\" [disabled]=\"btn_delete\">Delete</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goList()\">List</button>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           Customer Name:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"_obj.name\" required [ngModelOptions]=\"{standalone: true}\">\n                        </div> \n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           E-mail:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"_obj.email\" required [ngModelOptions]=\"{standalone: true}\" >\n                        </div> \n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           Phone:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"_obj.phone\" required [ngModelOptions]=\"{standalone: true}\">\n                        </div> \n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           Address:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"_obj.address\" required [ngModelOptions]=\"{standalone: true}\" >\n                        </div> \n                    </div>\n                  </form>\n                </div>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map