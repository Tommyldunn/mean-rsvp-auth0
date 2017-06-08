import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';
import { FilterSortService } from './filter-sort.service';
import { SubmittingComponent } from './forms/submitting.component';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
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
    LoadingComponent,
    SubmittingComponent
  ]
})
export class CoreModule { }
