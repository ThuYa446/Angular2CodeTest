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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_2 = require('@angular/common');
var app_routing_1 = require('./app.routing');
var root_component_1 = require('./root.component');
var entity_service_1 = require('./framework/entity.service');
var http_service_1 = require('./framework/http.service');
var customer_component_1 = require('./customer/customer.component');
var customerList_component_1 = require('./customer/customerList.component');
var order_component_1 = require('./order/order.component');
var product_component_1 = require('./product/product.component');
var productList_component_1 = require('./product/productList.component');
customerList_component_1.CustomerListComponent;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                root_component_1.AppRootComponent,
                customer_component_1.CustomerComponent,
                customerList_component_1.CustomerListComponent,
                order_component_1.OrderComponent,
                product_component_1.ProductComponent,
                productList_component_1.ProductListComponent
            ],
            providers: [
                entity_service_1.EntityService,
                http_service_1.HttpService,
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                { provide: common_2.LocationStrategy, useClass: common_2.HashLocationStrategy }
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ],
            bootstrap: [root_component_1.AppRootComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map