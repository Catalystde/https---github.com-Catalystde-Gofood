const express = require('express')
const router = express.Router()
const order = require('../models/order')


router.post("/orderData",async(req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date: req.body.order_date})

    let eid = await order.findOne({'email' : req.body.email})
     if(eid ===null){
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await order.create({
                email:req.body.email,
                order_data : [data]
            }).then(() => {
                res.json({ success: true })
            })
        }
              catch (error) {
                console.log(error.message)
               res.send("Server Error", error.message)  
        }
     }
     else {
        try {
            await order.findOneAndUpdate({email: req.body.email},
              {$push :{order_data : data}}).then(() => {
                res.json({ success: true })
            })
              
        } catch (error) {
           return  res.send("Server Error",error.message)
        }
     }
})

router.post("/myOrderData", async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

})

module.exports = router;