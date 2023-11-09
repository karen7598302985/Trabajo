const express = require('express')
const mongoose=require('mongoose')
const cursesModels=require('../models/CursesModels')
const router = express.Router()

///traer todos curses
router.get('/' , 
async(request , response)=> { 

  try {
       //traer todos los curses
       const curses = 
       await cursesModels.find()

       if(curses.length === 0){
            return response.
                 status(404).
                 json({
                      success: false,
                      msg: "no hay curses disponible"
                 })
       }

       response
           .status(200)
           .json({
                "success" : true,
                "results":curses
           })

  } catch (error) {
       response
          .status(500)
          .json({
            success: false,
            msg: "Error interno de servidor"
          })
  }
 
 
   
})
//traer curses por id
router.get('/:id',
async(request,response)=>{
    try {
        const cursesId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(cursesId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{
       
        const selected_curses =
        await cursesModels.findByIdAndUpdate(cursesId)

        if (!selected_curses){
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el curses con id:${cursesId} `
            })
       

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_curses
                    })
        }
    }
    } catch (error) {
        response.status(500)
        .json({
           
            success: false,
            msg:error.message
        })
    }    
})

//crear bootcamps
router.post('/' , 
        async (request , response)=> {
         try{
             const curses= await cursesModels. 
             create(request.body)
             response
             .status(201)
             .json({
                "success": true,
                "data" : curses
             })
         } catch (error) {
            response.status(500)
            .json({
                success: false,
                msg:error.message

            })
         }
        })
//actualizar curses por id
router.put('/:id',
async (request,response)=>{
try{
    cursesId = request.params.id
    const updCurses = 
    await cursesModels.findByIdAndUpdate(
        cursesId,
        request.body,
        {
            new: true
        }
    )
    if(!selected_curses){
        response
        .status(404)
        .json({
            success: false,
            msg: `No se hallo el bootcamp con id: ${cursesId}`
        
        })
        
    }else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_curses
                    })
        }
    }catch (error){
        response
        .status(500)
            .json({
                success: false,
                msg:error.message

        })
    }

})
//eliminar curses por id
router.delete('/:id',
async (request,response)=>{
    //seleccioar id del curses
    //a eliminar
    cursesId = request.params.id
    //eliminarlo
    await cursesModels.
    findByIdAndDelete(cursesId)
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results" : []
                    })
})


module.exports=router