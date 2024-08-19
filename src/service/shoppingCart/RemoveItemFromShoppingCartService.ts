import { ErrorCode } from "../../model/ErrorCode";
import { ShoppingCartRepository } from "../../repository/ShoppingCartRepository";

export async function removeItemFromShoppingCartService(userID: number, productID: number): Promise<number | ErrorCode> {
    const repository = ShoppingCartRepository.getInstance();

    return await repository.remove(userID, productID);
}