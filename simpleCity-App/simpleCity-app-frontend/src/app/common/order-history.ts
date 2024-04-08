export class OrderHistory {
    constructor(
        public id: number = 0,
        public orderTrackingNumber: string = '',
        public totalQuantity: number = 0,
        public totalPrice: number = 0,
        public status: string = '',
        public createDate: Date = new Date()
    ) {

    }
}

