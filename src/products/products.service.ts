import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Product } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductService{
    // private products: Product[] = []

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}


    // We use async and await which work exactly like then()
    async insertProduct(name:string,price:number,description:string){
        // const prodId = new Date().toString()
        const prodId = Math.random().toString()
        const newProduct = new this.productModel({
            name:name,
            price:price,
            description:description
        })

        // First Method to push new element in an array
        // this.products.push(newProduct)

        const result = await newProduct.save()
        return result.id as string
    }

    async getProducts(){
        const products = await this.productModel.find().exec()
        return products.map((prod) => ({
            id:prod.id, 
            name:prod.name, 
            price:prod.price,
            description:prod.description
        }))
        // return [...this.products] // Copying array and adding array element
    }

    async getProduct(prodId:string){
        // const product = this.products.find(prod => prod.id === prodId)

        // if(!product){
        //     throw new NotFoundException('could not find product')
        // }
        // return {...product}// Copying object and adding array element

        // const product = this.findProduct(prodId)[0]
        // return {...product}

        const product = await this.findProduct(prodId)
        return {
            id:product.id,
            name:product.name,
            price:product.price,
            description:product.description,
        }

    }

    async getUpdateProduct(prodId:string,name:string,price:number,description:string){
        // const product = this.findProduct(prodId)
        const updatedProduct = await this.findProduct(prodId)
        if(name){
            updatedProduct.name = name
        }
        if(price){
            updatedProduct.price = price
        }
        if(description){
            updatedProduct.description = description
        }
        updatedProduct.save()
    }

    async removeProduct(prodId:string){
        // const index = await this.findProduct(prodId)
        // this.products.splice(index,1)

        // With the help of mongoose
       const result = await this.productModel.deleteOne({_id:prodId}).exec()
    //    if(result.n === 0){
    //     throw new NotFoundException('could not find product')
    //    }
    }

    private async findProduct(id:string):Promise<Product>{
        // FindIndex actually give the index number of product in array
        // const productIndex = this.products.findIndex(prod => prod.id === id)
        // It assign the single product by getting products list and 
        // const product = this.products[productIndex]

        // Working with Mongoose different scenerio
        let product;
        try{
            product = await this.productModel.findById(id)
        }catch(error){
            throw new NotFoundException('could not find product')
        }
        if(!product){
            throw new NotFoundException('could not find product')
        }
        return product
    }

}