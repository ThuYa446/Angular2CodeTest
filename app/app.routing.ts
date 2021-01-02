import { ModuleWithProviders, Component }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer/customerList.component';
import { OrderComponent } from './order/order.component';
CustomerComponent
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },{
    path: 'customers',
    component: CustomerComponent
  },{
    path: 'customers/:cmd/:id',
    component: CustomerComponent
  },{
    path: 'customerslist',
    component: CustomerListComponent
  },{
    path: 'order',
    component: OrderComponent
  },{
    path: 'order/:cmd/:id',
    component: OrderComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);