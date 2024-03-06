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
    addProduct(
        @Body('name') prodTitle:string,
        @Body('price') prodNumber:number,
        @Body('description') prodDescription:string
    ): any{
        const generatedId = this.productService.insertProduct(prodTitle,prodNumber,prodDescription)
        return {id:generatedId}
    }

   // GET Req
    @Get()
    getAllProducts(){
        return this.productService.getProducts()
    }

    // GET Req with params
    @Get(':id')
    getSingleProduct(
        @Param('id') prodId:string
    ){
        return this.productService.getProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId:string,
        @Body('name') prodTitle:string,
        @Body('price') prodNumber:number,
        @Body('description') prodDescription:string
    ){
        this.productService.getUpdateProduct(prodId,prodTitle,prodNumber,prodDescription)
    }

    @Delete(':id')
    deleteProduct(
        @Param('id') prodId:string,
    ){
        this.productService.removeProduct(prodId)
    }

}