const MobileRecharge = require("../Models/MobilePlanSchema")
const multer = require("multer")

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage:storage}).single("file")

const saverechargePlan =async(req,res)=>{
    console.log(req.body)
    const newPlan = new MobileRecharge({
        planamount : req.body.planamount,
        plandata : req.body.plandata,
        planvalidity : req.body.planvalidity,
        operator : req.body.operator
    })

    await newPlan.save()
    .then((result)=>{
        res.status(200).json({msg:"saved successfully",status:200,data:result})
    })
    .catch((error)=>{
        res.status(500).json({msg:"failed to save",status:500,data:error})
    })
}


const findmobileplans=(req,res)=>{
  MobileRecharge.find({}).then((result)=>{
    res.status(200).json({
      data:result
    })
  })
  .catch((err)=>{
    res.status(500).json({
      data:err
    })
  })

}

module.exports = {saverechargePlan,findmobileplans}