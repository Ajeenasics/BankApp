var mongoose = require("mongoose")

const MobileRechargeSchema = new mongoose.Schema({
    planamount:{
        type:String,
        required:true
    },
    plandata:{
        type:String,
        required:true
    },
    planvalidity:{
        type:String,
        required:true
    },
    operator:{
        type:String,
        required:true
    }
    
})

module.exports= mongoose.model("rechargeplans",MobileRechargeSchema)
