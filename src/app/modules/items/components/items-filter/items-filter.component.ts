
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FilterPopupPage } from '../../pages/filter-popup/filter-popup.page';
import { QuestionBase } from '../../../dynamic-form/models/question-base';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { MyPopoverComponent } from '../my-popover/my-popover.component';
import {filterSummary} from "../../models/filterSummary"
//import { access } from 'fs';
// tslint:disable:semicolon
@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() filterFields: Array<QuestionBase<any>>
  @Output() filterSet: EventEmitter<{}> = new EventEmitter()
  @Output() filterFunction: EventEmitter<(item: ItemModelInterface) => boolean> = new EventEmitter()

  constructor(public modal: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    console.log("filterFields",this.filterFields)
  }
  async showPopup(ev) {
    console.log("ev",ev)
    const modal = await this.modal.create({ component: FilterPopupPage, componentProps: { filterFields: this.filterFields } })
    modal.onDidDismiss().then(data => {
      this.filterSet.emit(data.data)
      this.filterFunction.emit(this.filterFactory(data.data, this.filterFields,ev))
    })
    return await modal.present()
  }
  filterQuestionByKey(key:string, fields:QuestionBase<any>[]){
    return fields.filter(q=>q.key==key)[0]
  }
  fetchValue(field:any):string{
    return  (typeof field==='object' && field['title'])? field['title']: field
  

  }

  async openPopup(event, data: {}){
    const summary :filterSummary[]=[]
    Object.keys(data).forEach(k=>{
      const q = this.filterQuestionByKey(k,this.filterFields)
      summary.push({label:q.label4filterSummary??q.label,value:this.fetchValue(data[k])})
    })
    console.log("fields", this.filterFields,"settings", data)
    console.log("summary", summary)
    const popover = await this.popoverController.create({
      component: MyPopoverComponent,
      componentProps: {summary,onclick:()=> popover.dismiss()},
      event: event,
      translucent: true,
      //backdropDismiss:false
  } )
  popover.onDidDismiss().then((data)=>{
    console.log("popover dismissed", data)
    if(typeof data.data ==='function'){
    this.filterFunction.emit(data.data)
    }
  })
  await popover.present()
 
  }
  filterFactory =  (filterSettings: {}, fields: Array<QuestionBase<any>>,ev) => {
    const questionMapper = (question: QuestionBase<any>) => question.filterFactory(filterSettings)
    const filterFunctionReducer = (acc: (item: ItemModelInterface) => boolean, currentFunction: (item: ItemModelInterface) => boolean) =>
      (item: ItemModelInterface) => acc(item) && currentFunction(item)
       if(filterSettings){
       this.openPopup(ev,filterSettings)
       }
    return fields.map(questionMapper).reduce(filterFunctionReducer, (item: ItemModelInterface) => true)
  }



}
