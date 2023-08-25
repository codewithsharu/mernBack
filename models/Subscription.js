const mongoose = require('mongoose');
const PlanSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        plantype:{
            type:String,
            required:true
        },
        hardware:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        }

    }
)
module.exports = mongoose.model('plan',PlanSchema);