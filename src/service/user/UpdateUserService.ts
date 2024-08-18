import { UserDto } from "../../model/dto/user/UserDto";
import { UserEntity } from "../../model/entity/UserEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function updateUserService(user: UserDto): Promise<UserEntity | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.update(user);
}