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
var ProductComponent = (function () {
    function ProductComponent(entity, http, router, route) {
        var _this = this;
        this.entity = entity;
        this.http = http;
        this.router = router;
        this.route = route;
        this.product = this.getDefaultObj();
        this.btn_save = false;
        this.btn_update = false;
        this.btn_new = false;
        this.btn_delete = false;
        this.subscription = this.route.params.subscribe(function (params) {
            var cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                var id = params['id'];
                _this.getProductById(id);
                _this.btn_save = true;
            }
        });
    }
    ProductComponent.prototype.getDefaultObj = function () {
        return { "id": 0, "name": "", "unitPrice": 0 };
    };
    ProductComponent.prototype.showCustomMsg = function (msg, type) {
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
    ProductComponent.prototype.showloading = function (type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-loading' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-loading-off' });
        }
    };
    ProductComponent.prototype.validation = function () {
        var flag = true;
        var message = "";
        if (this.product.name === '' || this.product.name === null || this.product.name === undefined) {
            message = "Please Enter Product Name";
        }
        else if (this.product.unitPrice === 0 || this.product.unitPrice === null || this.product.unitPrice === undefined) {
            message = "Please Enter Unit Price";
        }
        if (message != "") {
            this.showCustomMsg(message, undefined);
            flag = false;
        }
        return flag;
    };
    ProductComponent.prototype.getProductById = function (id) {
        var _this = this;
        var url = this.entity.apiurl + '/product/' + id;
        this.showloading(true);
        this.http.doGet(url).subscribe(function (data) {
            _this.product = data.json();
            _this.showloading(false);
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    ProductComponent.prototype.goSave = function () {
        var _this = this;
        if (this.validation()) {
            var url = this.entity.apiurl + "/product";
            this.showloading(true);
            this.http.doPost(url, this.product).subscribe(function (data) {
                _this.showloading(false);
                console.log(data);
            }, function (error) {
                _this.showloading(false);
                console.log(error);
            });
        }
    };
    ProductComponent.prototype.goUpdate = function () {
        var _this = this;
        if (this.validation()) {
            var url = this.entity.apiurl + "/product";
            this.showloading(true);
            this.http.doPut(url, this.product).subscribe(function (data) {
                _this.showloading(false);
                console.log(data);
            }, function (error) {
                _this.showloading(false);
                console.log(error);
            });
        }
    };
    ProductComponent.prototype.goDelete = function () {
        var _this = this;
        var url = this.entity.apiurl + '/product/' + this.product.id;
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
    ProductComponent.prototype.goList = function () {
        this.router.navigate(['/productList']);
    };
    ProductComponent.prototype.goNew = function () {
        this.product = this.getDefaultObj();
        this.btn_save = false;
        this.btn_update = true;
        this.btn_delete = true;
        this.router.navigate(['/product']);
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'product',
            template: " \n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <form class= \"form-horizontal\"> \n                  <legend>Product</legend> \n                    <div class=\"form-group row col-md-8\">\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goNew()\" [disabled]=\"btn_new\">Add New Product</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goSave()\" [disabled]=\"btn_save\">Save</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goUpdate()\" [disabled]=\"btn_update\">Update</button> \n                        <button class=\"btn btn-danger\" type=\"button\" (click)=\"goDelete()\" [disabled]=\"btn_delete\">Delete</button>\n                        <button class=\"btn btn-primary\" type=\"button\" (click)=\"goList()\">List</button>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           Product Name:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"product.name\" required [ngModelOptions]=\"{standalone: true}\">\n                        </div> \n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-md-4\" style=\"font-weight:bold; margin-top:2px\">\n                           Unit Price:\n                        </div>\n                    \n                        <div class=\"col-md-8\">\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"product.unitPrice\" required [ngModelOptions]=\"{standalone: true}\" >\n                        </div> \n                    </div>\n                  </form>\n                </div>\n            </div>\n        </div>\n     ",
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map