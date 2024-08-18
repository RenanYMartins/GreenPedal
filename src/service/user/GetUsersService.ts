import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function getUsersService(): Promise<any[] | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.getAll();
}