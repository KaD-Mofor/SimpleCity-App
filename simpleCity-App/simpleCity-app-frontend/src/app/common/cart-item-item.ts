
export class CartItemItem {

//     imageUrl: string;
//     quantity: number;
//     unitPrice: number;
//     productId: string; 

//     constructor(imageUrl: string, quantity: number, unitPrice: number, productId: string) {
//         this.imageUrl = imageUrl;
//         this.quantity = quantity;
//         this.unitPrice = unitPrice;
//         this.productId = productId;
//    }

    constructor(
        public imageUrl: string = '',
        public unitPrice: number = 0,
        public quantity: number = 0,
        public productId: string = '') { }
}
