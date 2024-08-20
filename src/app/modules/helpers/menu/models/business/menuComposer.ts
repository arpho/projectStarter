import { canAdd } from "../canAddInterface";
import { MenuItem2BeAdded } from "../menuItem2BeAdded";
import { MenuItem } from "../MenuItemInterface";

export class menuComposer {

  private static evaluateClaims(claims: {}, orLogic = false,locked:boolean, checkList?: canAdd[]) {
    let out = !orLogic
    if (!orLogic) {
      if(checkList){
      checkList.forEach(check => {
        out = out && check.canAdd(claims)
      })}
      else{
        out = true
      }
    }
    else {
      checkList?.forEach(check => {
        out = out || check.canAdd(claims)
      })
    }
    return out
  }
  public static composeMenuByClaims(items: MenuItem2BeAdded[], claims: {},locked:boolean) {
    const menu: MenuItem[] = []
    items.forEach(item => {
      if (this.evaluateClaims(claims, item.orLogic,locked, item?.canAdd)) {
        menu.push(item.menuItem)
      }

    })
    return menu
  }
}