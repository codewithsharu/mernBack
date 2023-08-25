const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51NdIEmSJLwKvVE9Ytpu3MQTynNYovujQcX9XiZ4XZE38Zu2dRaXPhii25gjJduatTBO9NNYscXhP9cDECj2fyWo200fD2w1EPh")
const {v4:uuidv4} = require("uuid");
const PlanSchema = require("../models/Subscription")
const fetchuser = require("../middleware/fetchuser");


router.post('/pay',(req,res)=>{
    
 
  
    const {token,amount} = req.body;
    const key = uuidv4();
    return stripe.customers.create({
        email:token.email,
        source:token
    }).then(customer=>{
        stripe.paymentIntents.create({
            amount:amount*100,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email,
            confirm:true,
        },{idempotencyKey:key})
    }).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
    })
})
router.post('/addplan',fetchuser,async (request,response)=>{
    try{
        let success = 0;
        let center = await PlanSchema.findOne({user:request.user.id});
        if(center){
            return response.status(400).json(success,{error:"User have already plan.Check current plan"});
        }
        await PlanSchema.create(
            {
                user:request.user.id,
                plantype:request.body.plantype,
                hardware:request.body.hardware,
                price:request.body.price,
                time:request.body.time,
                date:Date.now()
            }
        )
        success = 1;
        response.json(success,{msg:"Subscibed Successfully"})
    }
    catch(error){
        response.status(500).json(error);
    }
    
})
router.get('/fetchplan',fetchuser,async (req,res)=>{
    try {
        console.log(req.user.id);
        const notes = await PlanSchema.find({user:req.user.id});
        console.log(notes);
    res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
      }
    
    // res.json([])
  })

module.exports = router;