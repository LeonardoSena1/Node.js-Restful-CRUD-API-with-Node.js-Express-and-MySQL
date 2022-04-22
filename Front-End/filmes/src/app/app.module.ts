import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppFilmeComponent } from './Filmes/Filme/app-filme/app-filme.component';

import { HttpClientModule } from '@angular/common/http';

import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppFilmeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    ScrollPanelModule,
    DialogModule,
    ToastModule,
    InputTextModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppFilmeComponent]
})
export class AppModule { }
