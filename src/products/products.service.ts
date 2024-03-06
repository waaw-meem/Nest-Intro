import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Product } from "./products.model";
import { title } from "process";

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
        return [...this.products] // Copying array and adding array element
    }

    getProduct(prodId:string){
        // const product = this.products.find(prod => prod.id === prodId)

        // if(!product){
        //     throw new NotFoundException('could not find product')
        // }
        // return {...product}// Copying object and adding array element
        const product = this.findProduct(prodId)[0]
        
    }

    getUpdateProduct(prodId:string,name:string,price:number,description:string){
        // const product = this.findProduct(prodId)
        const [product,index] = this.findProduct(prodId)
        const updatedProduct = {...product}
        if(name){
            updatedProduct.name = name
        }
        if(price){
            updatedProduct.price = price
        }
        if(description){
            updatedProduct.description = description
        }
        this.products[index] = updatedProduct
    }

    removeProduct(prodId:string){
        const index = this.findProduct(prodId)[1]
        this.products.splice(index,1)
    }

    private findProduct(id:string):[Product,number]{
        // FindIndex actually give the index number of product in array
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('could not find product')
        }
        return [product,productIndex]
    }

}