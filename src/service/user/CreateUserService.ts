import { CreateUserDto } from "../../model/dto/user/CreateUserDto";
import { UserEntity } from "../../model/entity/UserEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function createUserService(user: CreateUserDto): Promise<UserEntity | ErrorCode> {
    const repository = UserRepository.getInstance();

    const checkUserEmail = await repository.getByEmail(user.email);

    if(checkUserEmail instanceof UserEntity)
        return new ErrorCode(400, `O email ${user.email} já está sendo utilizado`);

    return await repository.create(user);
}