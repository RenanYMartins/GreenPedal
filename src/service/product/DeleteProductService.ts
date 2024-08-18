import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";

export async function deleteProductService(productID: number): Promise<number | ErrorCode> {
    const repository = ProductRepository.getInstance();

    return await repository.delete(productID);
}