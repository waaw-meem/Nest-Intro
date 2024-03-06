import { Controller,Post } from "@nestjs/common";
import { Body, Get, Param } from "@nestjs/common/decorators";
import { ProductService } from "./products.service";


@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductService){}

    @Post()
    addProduct(
        @Body('name') prodTitle:string,
        @Body('price') prodNumber:number,
        @Body('description') prodDescription:string
    ): any{
        const generatedId = this.productService.insertProduct(prodTitle,prodNumber,prodDescription)
        return {id:generatedId}
    }

    @Get()
    getAllProducts(){
        return this.productService.getProducts()
    }

    // @Get(':id')
    // getSingleProduct(
    //     @Param('id') prodId:string
    // ){
    //     return this.productService.getProduct(prodId)
    // }

}