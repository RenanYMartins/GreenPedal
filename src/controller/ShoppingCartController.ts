import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { ErrorCode } from "../model/ErrorCode";
import { ShoppingCartItemDto } from "../model/dto/shoppingCartItem/ShoppingCartItemDto";
import { ShoppingCartItemEntity } from "../model/entity/ShoppingCartItemEntity";
import { updateShoppingCartItemService } from "../service/shoppingCart/UpdateShoppingCartItemService";
import { addItemToShoppingCartService } from "../service/shoppingCart/AddItemToShoppingCartService";
import { getShoppingCartByUserService } from "../service/shoppingCart/GetShoppingCartByUserService";
import { removeItemFromShoppingCartService } from "../service/shoppingCart/RemoveItemFromShoppingCartService";

@Route('shoppingCartItem')
@Tags('ShoppingCartItem')
export class ShoppingCartItemController extends Controller {

    @Post()
    public async addItemToShoppingCart(
        @Body() dto: ShoppingCartItemDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<ShoppingCartItemEntity>>
    ): Promise<void> {
        const response = await addItemToShoppingCartService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Item adicionado com sucesso!', response));
    }

    @Get('{userID}')
    public async getShoppingCartByUserID(
        @Path() userID: number,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<ShoppingCartItemEntity[]>>
    ): Promise<void> {
        const response = await getShoppingCartByUserService(userID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Carrinho de compras encontrado!', response));
    }

    @Put()
    public async updateShoppingCart(
        @Body() dto: ShoppingCartItemDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<ShoppingCartItemEntity>>
    ): Promise<void> {
        const response = await updateShoppingCartItemService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Carrinho de compras atualizado com sucesso!', response));
    }

    @Delete()
    public async deleteShoppingCartItem(
        @Query() userID: number,
        @Query() productID: number,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<number>>
    ): Promise<void> {
        const response = await removeItemFromShoppingCartService(userID, productID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Produto removido do carrinho com sucesso!', response));
    }
}