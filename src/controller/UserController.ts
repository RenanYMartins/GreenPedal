import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { ErrorCode } from "../model/ErrorCode";
import { CreateUserDto } from "../model/dto/user/CreateUserDto";
import { UserEntity } from "../model/entity/UserEntity";
import { createUserService } from "../service/user/CreateUserService";
import { getUserByIDService } from "../service/user/GetUserByIDService";
import { getUsersService } from "../service/user/GetUsersService";
import { UserDto } from "../model/dto/user/UserDto";
import { updateUserService } from "../service/user/UpdateUserService";
import { deleteUserService } from "../service/user/DeleteUserService";

@Route('user')
@Tags('User')
export class UserController extends Controller {

    @Post()
    public async registerUser(
        @Body() dto: CreateUserDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<UserEntity>>
    ): Promise<void> {
        const response = await createUserService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Usuário registrado com sucesso!', response));
    }

    @Get('{userID}')
    public async getUserByID(
        @Path() userID: number,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<UserEntity>>
    ): Promise<void> {
        const response = await getUserByIDService(userID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Usuário encontrado!', response));
    }

    @Get()
    public async getUsers(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<UserEntity[]>>
    ): Promise<void> {
        const response = await getUsersService();

        if (response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Usuários!', response));
    }

    @Put()
    public async updateUser(
        @Body() dto: UserDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<UserEntity>>
    ): Promise<void> {
        const response = await updateUserService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Usuário atualizado com sucesso!', response));
    }

    @Delete('{userID}')
    public async deleteUser(
        @Path() userID: number,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<number>>
    ): Promise<void> {
        const response = await deleteUserService(userID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Usuário deletado com sucesso!', response));
    }
}