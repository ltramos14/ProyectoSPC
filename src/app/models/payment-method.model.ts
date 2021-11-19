export class PaymentMethod {   
    id?: string;
    name: string;
    identification: string;
    phone: string;
    image: string;

    constructor(paymentMethod?: PaymentMethod) {
    }
}