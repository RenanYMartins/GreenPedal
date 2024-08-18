import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";

export async function getProductsService(): Promise<any[] | ErrorCode> {
    const repository = ProductRepository.getInstance();

    return await repository.getAll();
}