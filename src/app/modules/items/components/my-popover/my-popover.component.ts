import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { filterSummary } from '../../models/filterSummary';
import { ItemModelInterface } from '../../models/itemModelInterface';

@Component({
  selector: 'app-my-popover',
  templateUrl: './my-popover.component.html',
  styleUrls: ['./my-popover.component.scss'],
})
export class MyPopoverComponent implements OnInit {
 summary:filterSummary[]=[]
  constructor(private navParams:NavParams,
    private modaCtrl:PopoverController
  ) { }

  close(){
    console.log("close")
  }
  reset(){
    console.log("reset")
    this.modaCtrl.dismiss((item:ItemModelInterface)=>true)
  }

  ngOnInit() {
    const data = this.navParams.get('summary')
    console.log("data",data)
    this.summary = data
  }

}
