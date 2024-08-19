import { ShoppingCartItemDto } from "../../model/dto/shoppingCartItem/ShoppingCartItemDto";
import { ShoppingCartItemEntity } from "../../model/entity/ShoppingCartItemEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { ProductRepository } from "../../repository/ProductRepository";
import { ShoppingCartRepository } from "../../repository/ShoppingCartRepository";
import { UserRepository } from "../../repository/UserRepository";

export async function updateShoppingCartItemService(item: ShoppingCartItemDto): Promise<ShoppingCartItemEntity | ErrorCode> {
    const repository = ShoppingCartRepository.getInstance();
    const productRepository = ProductRepository.getInstance();
    const userRepository = UserRepository.getInstance();

    const checkProduct = await productRepository.getByID(item.productID);
    if(checkProduct instanceof ErrorCode)
        return new ErrorCode(400, 'Produto inválido');

    const checkUser = await userRepository.getByID(item.userID);
    if(checkUser instanceof ErrorCode)
        return new ErrorCode(400, 'Usuário inválido');
    
    return await repository.update(item);
}