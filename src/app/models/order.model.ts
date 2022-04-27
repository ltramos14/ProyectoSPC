import { Address } from "./address.model";
import { ProductOrder } from "./order-request.model";
import { PaymentMethod } from "./payment-method.model";

export class Order {
    idProducer: string;
    idConsumer: string;
    products: ProductOrder[];
    address: Address;
    total: number;
    chosenPayment: PaymentMethod;
    isPaidOut: boolean;
    paymentLimitDate: Date;
    idCarrier?: string;
    id?: string;

    constructor(order?: Order) {}

}