import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routing } from './app.routing';

import {AppRootComponent} from './root.component';
import {EntityService} from './framework/entity.service';
import {HttpService} from './framework/http.service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer/customerList.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/productList.component';
CustomerListComponent
@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      routing,
      HttpModule
    ],
    declarations: [
      AppRootComponent,
      CustomerComponent,
      CustomerListComponent,
      OrderComponent,
      ProductComponent,
      ProductListComponent
    ],
    providers: [
      EntityService,
      HttpService,
      { provide: APP_BASE_HREF, useValue : '/' },
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    schemas:[
      CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppRootComponent]
  })
  export class AppModule {
  }