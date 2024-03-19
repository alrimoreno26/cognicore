import {FormGroup} from '@angular/forms';

export const BaseModalClassComponent = () => {
  // return (target: object | any, propertyKey: string, descriptor: PropertyDescriptor) => {
  return (target: object | any) => {
    Object.defineProperty(target.prototype, 'form', {value: FormGroup, writable: true, enumerable: false, configurable: true});

    /*checkRef: EffectRef = effect(() => {
      if (!this.service.dialog$()) {
        this.ref.close('Close');
      }
    });*/
    /* constructor(public ref: DynamicDialogRef,
       public config: DynamicDialogConfig,
       public service: BaseStoreServices<any>) {
     }*/

    /**
     * Save or Update method
     */
    /* save(): void {
     !this.config.data ?
       this.service.create(this.form.value) :
       this.service.update({id: this.config.data.id, ...this.form.value});
   }*/
  };
};
