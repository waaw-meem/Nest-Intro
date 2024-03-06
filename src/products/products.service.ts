import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Product } from "./products.model";

@Injectable()
export class ProductService{
    private products: Product[] = []

    insertProduct(name:string,price:number,description:string){
        const prodId = new Date().toString()
        // const prodId = Math.random().toString()
        const newProduct = new Product(prodId,name,price,description)

        this.products.push(newProduct)
        return prodId
    }

    getProducts(){
        return [...this.products]
    }

    // getProduct(prodId:string){
    //     const product = this.products.find(prod => prod.id === prodId)

    //     if(!product){
    //         throw new NotFoundException('could not find product')
    //     }
    //     return {...product}
    // }
}