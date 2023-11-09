const express = require('express')
const mongoose=require('mongoose')
const bootcampModel=require('../models/BootcampsModels')
const router = express.Router()

//traer todos ls bootcamps
router.get('/' , 
        async(request , response)=> { 

          try {
               //traer todos los bootcamps
               const bootcamps = 
               await bootcampModel.find()

               if(bootcamps.length === 0){
                    return response.
                         status(404).
                         json({
                              success: false,
                              msg: "no hay bootcamps disponible"
                         })
               }

               response
                   .status(200)
                   .json({
                        "success" : true,
                        "results":bootcamps
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


            
//traer bootcamp por id
router.get('/:id',
async(request,response)=>{
    try {
        const bootcampId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{
       
        const selected_bootcamp =
        await bootcampModel.findByIdAndUpdate(bootcampId)

        if (!selected_bootcamp){
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el bootcamp con id:${bootcampId} `
            })
       

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_bootcamp
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
             const bootcamp= await bootcampModel. 
             create(request.body)
             response
             .status(201)
             .json({
                "success": true,
                "data" : bootcamp
             })
         } catch (error) {
            response.status(500)
            .json({
                success: false,
                msg:error.message

            })
         }
        })
//actualizar bootcamp por id
router.put('/:id',
async (request,response)=>{
try{
    bootcampId = request.params.id
    const updBootcamp = 
    await bootcampModel.findByIdAndUpdate(
        bootcampId,
        request.body,
        {
            new: true
        }
    )
    if(!selected_bootcamp){
        response
        .status(404)
        .json({
            success: false,
            msg: `No se hallo el bootcamp con id: ${bootcampId}`
        
        })
        
    }else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_bootcamp
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

//eliminar bootcamp por id
router.delete('/:id',
async (request,response)=>{
    //seleccioar id del bootcamp
    //a eliminar
    bootcampId = request.params.id
    //eliminarlo
    await bootcampModel.
    findByIdAndDelete(bootcampId)
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results" : []
                    })
})

module.exports=router
