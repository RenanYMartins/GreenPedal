import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function deleteUserService(userID: number): Promise<number | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.delete(userID);
}