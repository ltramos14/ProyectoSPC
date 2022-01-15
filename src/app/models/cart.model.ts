import { Product } from "./product.model";

export class Cart {
    id?: string;
    product: Product;
    quantity: number;
    subtotal: number;

    constructor(cart?: Cart) {}
}