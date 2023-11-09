const mongoose = require('mongoose')

const cursesSchema = mongoose.Schema({
    title:{
        type:String,
        //unique:[true, "Mínimo 10 caracteres"],
        required:[true, "nombre de curses requerido"],
        maxlength:[30, "longitud de nombre menos a 30"]
    },
    description:{
        type:String,
        required:[true, "descripcion de curses requerido"],
        minlength:[10, "minim 10 caracteres para la descripcion"]
  
    },
    weeks:{
       type:Number,
        required:[true, "requerido weeks"],
        maxlength:[9, "El número máximo de semanas para un curso"],
        
    },


    enroll_cost:{
        type:Number,
        required:[true, "campo requerido"],

    },


    minimum_skill:{
        type: String,
        enum: [
            "Beginner",
           "Intermediate" ,
           "Advanced",
            "Expert",

        ]
    },

})

module.exports = mongoose.model('curses',
                                cursesSchema)