import { CreateProductDto } from "../../model/dto/product/CreateProductDto";
import { ProductEntity } from "../../model/entity/ProductEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";

export async function createProductService(product: CreateProductDto): Promise<ProductEntity | ErrorCode> {
    const repository = ProductRepository.getInstance();

    return await repository.create(product);
}