import { ProductEntity } from "../../model/entity/ProductEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";

export async function getProductByIDService(productID: number): Promise<ProductEntity | ErrorCode> {
    const repository = ProductRepository.getInstance();

    return await repository.getByID(productID);
}