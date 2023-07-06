import mongoose from "mongoose";
 
const Products = mongoose.Schema({
    nama:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
},{
    versionKey: false 
})

export default mongoose.model('Products', Products);