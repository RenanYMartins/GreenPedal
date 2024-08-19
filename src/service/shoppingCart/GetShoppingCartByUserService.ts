import { ErrorCode } from "../../model/ErrorCode";
import { ShoppingCartRepository } from "../../repository/ShoppingCartRepository";
import { UserRepository } from "../../repository/UserRepository";

export async function getShoppingCartByUserService(userID: number): Promise<any[] | ErrorCode> {
    const repository = ShoppingCartRepository.getInstance();
    const userRepository = UserRepository.getInstance();

    const checkUser = await userRepository.getByID(userID);
    if(checkUser instanceof ErrorCode)
        return new ErrorCode(400, 'Usuário inválido');

    return await repository.getItemsByUserID(userID);
}