import { configs } from "../../../../../../configs/configs";
import { canAdd } from "../../canAddInterface";

export class CheckEnabled implements canAdd {
  canAdd = (claims: any,locked?:boolean) => locked ? claims['enabled'] ? claims['enabled'] : false : true
  // if not locked always true

}
