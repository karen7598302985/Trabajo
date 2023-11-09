const mongoose = require('mongoose')
const reviewsSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, "campo requerido"],
        maxlength:[10, "caracteres hasta 10"]
    },
    text:{
        type:String,
        required:[true, "campo requerido"],
        maxlength: [10, "caracteres hasta 10 "]
    },
    rating:{
        type: Number,
        required:[true, "campo requerido"],
        max:[10, "Una calificación puede ir de 1 a 10 únicamente"],
        min:[1, "Una calificación puede ir de 1 a 10 únicamente"]

    },
    bootcamp_id:{
        type:Number,
        required:[true, "campo requerido"],

    },
    user_id:{
        type:Number,
        required:[true, "campo requerido"],

    },
    averageRating: Number,
    createdAt:Date
})

module.exports = mongoose.model('reviews',
reviewsSchema)