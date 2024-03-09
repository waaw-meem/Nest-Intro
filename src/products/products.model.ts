import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    title:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true}
})


export interface Product extends mongoose.Document{
        id:string;
        name:string;
        price:number;
        description:string;
}

// export class Product{

//     // First Method (Previous Method)
//     // id:string
//     // name:string
//     // price:number
//     // description:string

//     // constructor(id:string, name:string,price:number,description:string){
//     //     this.id = id
//     //     this.name = name
//     //     this.price = price
//     //     this.description = description
//     // }


//     // Second Method

//     // constructor(
//     //     public id:string, 
//     //     public name:string,
//     //     public price:number,
//     //     public description:string
//     //     ){}
// }