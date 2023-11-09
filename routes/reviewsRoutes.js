const express = require('express')
const mongoose=require('mongoose')
const reviewsModels=require('../models/ReviewsModels')
const router = express.Router()

//traer todos los reviews
router.get('/' , 
        async(request , response)=> { 

          try {
               //traer todos los reviews
               const reviews = 
               await reviewsModels.find()

               if(reviews.length === 0){
                    return response.
                         status(404).
                         json({
                              success: false,
                              msg: "no hay reviews disponible"
                         })
               }

               response
                   .status(200)
                   .json({
                        "success" : true,
                        "results":reviews
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

//traer reviews por id
router.get('/:id',
async(request,response)=>{
    try {
        const reviewsId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewsId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{
       
        const selected_reviews =
        await reviewsModels.findByIdAndUpdate(reviewsId)

        if (!selected_reviews){
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el reviews con id:${reviewsId} `
            })
       

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_reviews
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

//crear reviews
router.post('/' , 
        async (request , response)=> {
         try{
             const reviews= await reviewsModels. 
             create(request.body)
             response
             .status(201)
             .json({
                "success": true,
                "data" : reviews
             })
         } catch (error) {
            response.status(500)
            .json({
                success: false,
                msg:error.message

            })
         }
        })

//actualizar reviews por id
router.put('/:id',
async (request,response)=>{
try{
    reviewsId = request.params.id
    const updBootcamp = 
    await reviewsModels.findByIdAndUpdate(
        reviewsId,
        request.body,
        {
            new: true
        }
    )
    if(!selected_reviews){
        response
        .status(404)
        .json({
            success: false,
            msg: `No se hallo el reviews con id: ${reviewsId}`
        
        })
        
    }else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_reviews
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

//eliminar reviews por id
router.delete('/:id',
async (request,response)=>{
    //seleccioar id del reviews
    //a eliminar
    reviewsId = request.params.id
    //eliminarlo
    await reviewsModels.
    findByIdAndDelete(reviewsId)
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results" : []
                    })
})

module.exports=router


