import { Address } from './address.model';
import { PaymentMethod } from './payment-method.model';
export interface ProductOrder {
    name: string,
    quantity: number,
    subtotal: number,
    image: string
}

export class OrderRequest {
    idProducer: string;
    names: string;
    lastnames: string;
    products: ProductOrder[];
    chosenPayment?: PaymentMethod;
    address?: Address;
    total?: number;

    constructor(order?: OrderRequest) {}
}

 export interface PaymentMethodOrder {
    idProducer: string,
    name: string,
    paymentMethods: PaymentMethod[];
}
