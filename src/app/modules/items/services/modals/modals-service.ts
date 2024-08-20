import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  private modals: { key: number, modal: HTMLIonModalElement }[]=[]
  constructor() {

  }
  getModalByKey(key: number){
    return this.modals.filter(m=>m.key==key)[0]
  }
  setModal(key: number, modal: HTMLIonModalElement) {
if (!this.getModalByKey(key)){
  this.modals.push({key, modal})
}
else{
  this.getModalByKey(key).modal=modal
}
  }
  dismissModal(key: number, data:any) {
    if(this.getModalByKey(key)){
this.getModalByKey(key).modal.dismiss(data)
    }
    else{
      throw new Error(`no modal present for key:${key}`)
    }
  }


}
