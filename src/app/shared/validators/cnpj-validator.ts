import { AbstractControl } from "@angular/forms";

export class CnpjValidator {

    static validate(control: AbstractControl): {[key: string]: boolean} {

        if (this.cnpjValidador(control.value)) {
            return {'cnpj' : false };
        }
        
        return { 'cnpj': true };

    }
    static cnpjValidador(value: any) {
       
        return true;

    }

}