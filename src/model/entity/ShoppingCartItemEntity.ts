export class ShoppingCartItemEntity {
    public readonly userID: number;
    public readonly productID: number;
    public quantity: number;

    constructor(userID: number, productID: number, quantity: number) {
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
    }
}