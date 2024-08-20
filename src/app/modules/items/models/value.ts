/**@deprecated */
export class Value {
  label: string;
  value: string | Number | Boolean;

  constructor(args: { value: string | Number | Boolean; label: string }={label:'',value:''}) {
    this.label = args.label;
    this.value = args.value;
  }
}
