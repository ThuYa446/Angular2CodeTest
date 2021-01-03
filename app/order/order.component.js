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
var OrderComponent = (function () {
    function OrderComponent(entity, http, router, route) {
        var _this = this;
        this.entity = entity;
        this.http = http;
        this.router = router;
        this.route = route;
        this.order = this.getDefaultObj();
        this.obj = this.order.orderItems;
        this.subscription = this.route.params.subscribe(function (params) {
            var cmd = params['cmd'];
            if (cmd != null && cmd != "" && cmd == "read") {
                var id = params['id'];
                _this.order.customerId = id;
            }
        });
        this.getProductIdList();
    }
    OrderComponent.prototype.changeDate = function (date) {
        // window.alert(date);
    };
    OrderComponent.prototype.addNewOrder = function (obj) {
        this.order.orderItems.push({ "id": 0, "quantity": 0, "total": 0, "productId": 0 });
    };
    OrderComponent.prototype.removeOrder = function (i) {
        this.order.orderItems.splice(i, 1);
    };
    OrderComponent.prototype.showloading = function (type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-loading' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-loading-off' });
        }
    };
    OrderComponent.prototype.getProductIdList = function () {
        var _this = this;
        var url = this.entity.apiurl + '/product';
        this.showloading(true);
        this.http.doGet(url).subscribe(function (data) {
            _this.productList = data.json();
            _this.showloading(false);
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    OrderComponent.prototype.calculateTotalAmt = function (quantity, productId, index) {
        for (var i = 0; i < this.obj.length; i++) {
            if (i === index) {
                this.obj[i].total = quantity * this.getUnitPrice(productId);
            }
        }
    };
    OrderComponent.prototype.getUnitPrice = function (id) {
        var obj = this.productList.find(function (x) { return x.id == id; });
        return obj.unitPrice;
    };
    OrderComponent.prototype.getDefaultObj = function () {
        return {
            "id": 0,
            "orderno": 0,
            "orderDate": Date(),
            "status": "",
            "customerId": 0,
            "orderItems": [
                {
                    "id": 0,
                    "quantity": 0,
                    "total": 0,
                    "proudctId": 0
                }
            ]
        };
    };
    OrderComponent = __decorate([
        core_1.Component({
            selector: 'customer',
            template: " \n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"card\" style=\"margin-top:20px;\">\n                    <div class=\"card-header\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Customer ID:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        {{order.customerId}}\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Order No:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"order.orderno\" required [ngModelOptions]=\"{standalone: true}\">\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Order Date:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        <input class=\"form-control\" type=\"date\" [(ngModel)]=\"order.orderDate\" required [ngModelOptions]=\"{standalone: true}\" (ngModelChange)=\"changeDate(order.orderDate)\">\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Status:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"order.status\" required [ngModelOptions]=\"{standalone: true}\">\n                                    </div>\n                                </div>\n                                <button class=\"btn btn-primary\" type=\"button\" (click)=\"goSave()\">Save</button>\n                                <button class=\"btn btn-primary\" type=\"button\" (click)=\"goUpdate()\" >Update</button> \n                                <button class=\"btn btn-danger\" type=\"button\" (click)=\"goDelete()\">Delete</button>\n                                <button class=\"btn btn-primary\" type=\"button\" (click)=\"goList()\">List</button>\n                            </div>\n                        <div>\n                    </div>\n                    <div class=\"card-body\">\n                    <table class=\"table table-striped table-hover\">\n                        <thead>\n                            <tr>\n                                <th scope=\"col\"></th>\n                                <th scope=\"col\">Quantity</th>\n                                <th scope=\"col\">Total</th>\n                                <th scope=\"col\">Product ID</th>\n                                <th scope=\"col\"></th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let obj of obj, let i=index\" class=\"table-hover\" >\n                                <td> <button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"addNewOrder()\"><i class=\"fas fa-plus\" ></i></button></td>\n                                <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"obj.quantity\" [ngModelOptions]=\"{standalone: true}\"></td>\n                                <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"obj.total\" [ngModelOptions]=\"{standalone: true}\" readOnly=\"true\"></td>\n                                <td>\n                                    <select class=\"form-control\" [(ngModel)]=\"obj.proudctId\" [ngModelOptions]=\"{standalone: true}\" (ngModelChange)=\"calculateTotalAmt(obj.quantity,obj.proudctId,i)\">\n                                        <option *ngFor=\"let product of productList\" value=\"{{product.id}}\">{{product.name}}</option>\n                                    </select>\n                                </td>\n                                <td> <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"removeOrder(i)\"><i class=\"fas fa-minus\" ></i></button> </td>\n                            <tr>\n                        </tbody>\n                    </table>\n                    </div>\n                    <div class=\"card-footer\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- <input class=\"form-control\" type=\"text\" (ngModel)=\"order.proudctId\"  [ngModelOptions]=\"{standalone: true}\"> -->\n    ",
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map