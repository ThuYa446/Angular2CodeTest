"use strict";
var router_1 = require('@angular/router');
var customer_component_1 = require('./customer/customer.component');
var customerList_component_1 = require('./customer/customerList.component');
var order_component_1 = require('./order/order.component');
var product_component_1 = require('./product/product.component');
var productList_component_1 = require('./product/productList.component');
customer_component_1.CustomerComponent;
var appRoutes = [
    {
        path: '',
        redirectTo: '/customers',
        pathMatch: 'full'
    }, {
        path: 'customers',
        component: customer_component_1.CustomerComponent
    }, {
        path: 'customers/:cmd/:id',
        component: customer_component_1.CustomerComponent
    }, {
        path: 'customerslist',
        component: customerList_component_1.CustomerListComponent
    }, {
        path: 'order',
        component: order_component_1.OrderComponent
    }, {
        path: 'order/:cmd/:id',
        component: order_component_1.OrderComponent
    }, {
        path: 'product',
        component: product_component_1.ProductComponent
    }, {
        path: 'product/:cmd/:id',
        component: product_component_1.ProductComponent
    }, {
        path: 'productList',
        component: productList_component_1.ProductListComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map