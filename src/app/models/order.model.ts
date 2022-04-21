import { Address } from './address.model';
import { PaymentMethod } from './payment-method.model';
interface ProductOrder {
    name: string,
    quantity: number,
    subtotal: number,
    image: string
}

export class Order {
    idProducer: string;
    names: string;
    lastnames: string;
    products: ProductOrder[];
    chosenPayment?: PaymentMethod;
    address?: Address;
    total?: number;

    constructor(order?: Order) {}
}

export interface PaymentMethodOrder {
    idProducer: string,
    name: string,
    paymentMethods: PaymentMethod[];
}
