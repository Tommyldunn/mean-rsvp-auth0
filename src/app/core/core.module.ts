import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';
import { FilterSortService } from './filter-sort.service';
import { SubmittingComponent } from './forms/submitting.component';
import { LoadingComponent } from './loading.component';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SubmittingComponent
  ],
  providers: [
    DatePipe,
    ApiService,
    UtilsService,
    FilterSortService
  ],
  exports: [
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SubmittingComponent
  ]
})
export class CoreModule { }
