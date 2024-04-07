export class OrderHistory {
    constructor(
        public id: string = '',
        public orderTrackingNumber: string = '',
        public totalQuantity: number = 0,
        public totalPrice: number = 0,
        public status: string = '',
        public createDate: Date = new Date
    ) {

    }
}
