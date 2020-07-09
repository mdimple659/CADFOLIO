import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceDemoComponent } from './service-demo/service-demo.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    ServiceDemoComponent
  ],
  imports: [
    BrowserModule,FormsModule, HttpClientModule,
    AppRoutingModule, TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
