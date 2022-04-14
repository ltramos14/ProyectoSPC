interface ProductOrder {
    name: string,
    quantity: number,
    subtotal: number,
    image: string
}

export class Order {
    names: string;
    lastnames: string;
    products: ProductOrder[];

    constructor(order?: Order) {}
    
}
