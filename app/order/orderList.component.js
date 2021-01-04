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
var OrderListComponent = (function () {
    function OrderListComponent(entity, http, router, route) {
        this.entity = entity;
        this.http = http;
        this.router = router;
        this.route = route;
        this.getOrderList();
    }
    OrderListComponent.prototype.showloading = function (type) {
        if (type === true) {
            this.entity.sendBean({ t1: 'custom-loading' });
        }
        if (type === false) {
            this.entity.sendBean({ t1: 'custom-loading-off' });
        }
    };
    OrderListComponent.prototype.getOrderList = function () {
        var _this = this;
        var url = this.entity.apiurl + '/order';
        this.showloading(true);
        this.http.doGet(url).subscribe(function (data) {
            _this.orderList = data.json();
            _this.showloading(false);
            console.log(data);
        }, function (error) {
            _this.showloading(false);
            console.log(error);
        });
    };
    OrderListComponent.prototype.readOrderById = function (id) {
        this.router.navigate(['/order', 'readId', id]);
    };
    OrderListComponent = __decorate([
        core_1.Component({
            selector: 'customer',
            template: "\n    <div class=\"container\">\n        <div class=\"row\" *ngFor=\"let obj of orderList\">\n            <div class=\"col-md-12\">\n                <div class=\"card\" style=\"margin-top:20px;\">\n                    <div class=\"card-header\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Order ID:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                    <a style=\"color:blue;\" (click) = \"readOrderById(obj.id)\"> {{obj.id}} </a>\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Order No:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        {{obj.orderno}}\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Order Date:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        {{obj.orderDate}}\n                                    </div>\n                                </div>\n                                <div class=\"row\" style=\"margin-bottom:20px;\">\n                                    <div class=\"col-md-2\">\n                                        Status:\n                                    </div>\n                                    <div class=\"col-md-4\">\n                                        {{obj.status}}\n                                    </div>\n                                </div>\n                            </div>\n                        <div>\n                    </div>\n                    <div class=\"card-body\">\n                    <table class=\"table table-striped table-hover\">\n                        <thead>\n                            <tr>\n                                <th scope=\"col\">Order Item ID</th>\n                                <th scope=\"col\">Quantity</th>\n                                <th scope=\"col\">Total</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let order of obj.orderitems, let i=index\" class=\"table-hover\" >\n                                <td> {{order.id}}</td>\n                                <td>{{order.quantity}}</td>\n                                <td>{{order.total}}</td>\n                            <tr>\n                        </tbody>\n                    </table>\n                    </div>\n                    <div class=\"card-footer\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n     "
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
    ], OrderListComponent);
    return OrderListComponent;
}());
exports.OrderListComponent = OrderListComponent;
//# sourceMappingURL=orderList.component.js.map