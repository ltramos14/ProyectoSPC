import { AbstractControl } from "@angular/forms";

/**
 * Clase donde se incorporan las validaciones personalizadas usadas en SPC
 */
export class OwnValidations {

    static validAge(control: AbstractControl) {

        let age: number;

        if (control.value != '') {
            let date: Date = new Date(control.value);
            let dateNow = new Date();

            age = dateNow.getFullYear() - date.getFullYear();

            if (dateNow.getMonth <= date.getMonth && dateNow.getDate() < date.getDate() + 1) {
                age = age - 1;
            }

            if (age < 15) {
                return { validAge: true }
            }
        }

        return null;

    }

    static futureDate(control: AbstractControl) {

        if (control.value != '') {

            let date: Date = new Date(control.value);
            let dateNow = new Date();

            if (date.getTime() < dateNow.getTime()) {
                return { futureDate: true }
            }
        }
        return null;

    }

}