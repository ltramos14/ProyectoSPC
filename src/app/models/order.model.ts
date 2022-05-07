import { Address } from "./address.model";
import { ProductOrder } from "./order-request.model";
import { PaymentMethod } from "./payment-method.model";

export class Order {
    idProducer: string;
    idConsumer: string;
    orderDate: Date;
    products: ProductOrder[];
    address: Address;
    total: number;
    chosenPayment: PaymentMethod;
    status: string;
    paymentLimitDate?: Date;
    idCarrier?: string;
    id?: string;

    constructor(order?: Order) {}

}