import { ProductDto } from "../../model/dto/product/ProductDto";
import { ProductEntity } from "../../model/entity/ProductEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";

export async function updateProductService(product: ProductDto): Promise<ProductEntity | ErrorCode> {
    const repository = ProductRepository.getInstance();

    return await repository.update(product);
}