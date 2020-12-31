"use strict";
var router_1 = require('@angular/router');
var customer_component_1 = require('./customer/customer.component');
var customerList_component_1 = require('./customer/customerList.component');
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map