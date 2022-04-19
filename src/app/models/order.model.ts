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

    constructor(order?: Order) {}
}

export interface PaymentMethodOrder {
    idProducer: string,
    name: string,
    paymentMethods: PaymentMethod[];
}
