import { Controller,Post } from "@nestjs/common";
import { Body, Delete, Get, Param,Patch } from "@nestjs/common/decorators";
import { ProductService } from "./products.service";

// Controller is used to req and send response
@Controller('products')

export class ProductController{
    // Injecting other functionalities
    constructor(private readonly productService:ProductService){}

    // POST Req and importing as well
    @Post()
    async addProduct(
        @Body('name') prodTitle:string,
        @Body('price') prodNumber:number,
        @Body('description') prodDescription:string
    ): Promise<any> {
        const generatedId = await this.productService
        .insertProduct(prodTitle,prodNumber,prodDescription)
        return {id:generatedId}
    }

   // GET Req
    @Get()
    async getAllProducts(){
        const products = await this.productService.getProducts()
        return products
    }

    // GET Req with params
    @Get(':id')
    getSingleProduct(
        @Param('id') prodId:string
    ){
        return this.productService.getProduct(prodId)
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId:string,
        @Body('name') prodTitle:string,
        @Body('price') prodNumber:number,
        @Body('description') prodDescription:string
    ){
        await this.productService
        .getUpdateProduct(prodId,prodTitle,prodNumber,prodDescription)
        return null
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id') prodId:string,
    ){
       await  this.productService.removeProduct(prodId)
       return null
    }

}