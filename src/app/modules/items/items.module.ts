import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { SorterItemsPipe } from './pipes/sorter-items.pipe';



@NgModule({
  declarations: [
    FilterItemsPipe,
    SorterItemsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterItemsPipe,
    SorterItemsPipe
  ]
})
export class ItemsModule { }
