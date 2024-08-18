import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { ErrorCode } from "../model/ErrorCode";
import { ProductEntity } from "../model/entity/ProductEntity";
import { CreateProductDto } from "../model/dto/product/CreateProductDto";
import { ProductDto } from "../model/dto/product/ProductDto";
import { createProductService } from "../service/product/CreateProductService";
import { deleteProductService } from "../service/product/DeleteProductService";
import { getProductByIDService } from "../service/product/GetProductByIDService";
import { getProductsService } from "../service/product/GetProductsService";
import { updateProductService } from "../service/product/UpdateProductService";

@Route('product')
@Tags('Product')
export class ProductController extends Controller {

    @Post()
    public async registerProduct(
        @Body() dto: CreateProductDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<ProductEntity>>
    ): Promise<void> {
        const response = await createProductService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Produto registrado com sucesso!', response));
    }

    @Get('{ProductID}')
    public async getProductByID(
        @Path() ProductID: number,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<ProductEntity>>
    ): Promise<void> {
        const response = await getProductByIDService(ProductID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Produto encontrado!', response));
    }

    @Get()
    public async getProducts(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<ProductEntity[]>>
    ): Promise<void> {
        const response = await getProductsService();

        if (response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Produtos!', response));
    }

    @Put()
    public async updateProduct(
        @Body() dto: ProductDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<ProductEntity>>
    ): Promise<void> {
        const response = await updateProductService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Produto atualizado com sucesso!', response));
    }

    @Delete('{ProductID}')
    public async deleteProduct(
        @Path() ProductID: number,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<number>>
    ): Promise<void> {
        const response = await deleteProductService(ProductID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Produto deletado com sucesso!', response));
    }
}